/**
 * Convert images to WebP using sharp.
 *
 * Usage:
 * 1. Install sharp: npm install sharp --save
 * 2. Run: npm run webp -- <dir> [<dir> ...] [--exclude=a.png,b.jpg] [--quality=85] [--recursive|-r]
 *
 * Example:
 * npm run webp -- docs/public/images/frontend/css --exclude hero_section.png,hero_section.webp --quality 85
 */
const fs = require("fs").promises;
const path = require("path");
let sharp;
try {
  sharp = require("sharp");
} catch (e) {
  console.error(
    "The 'sharp' package is not installed. Please run: npm install sharp --save"
  );
  process.exit(1);
}

const DEFAULT_QUALITY = 85;
const EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);

/**
 * Parse CLI arguments.
 * Supported options:
 * - positional directories: one or more directory paths
 * - --exclude: comma-separated file names to exclude (e.g., "a.png,b.jpg")
 * - --quality: integer 1-100, defaults to 85
 * - --recursive|-r: include files from subdirectories
 * - --overwrite: overwrite existing .webp outputs
 * - --help|-h: print usage help
 * Returns an object: { directories: string[], options: {...} }.
 */
function parseArgs(argv) {
  const args = argv.slice(2);
  const directories = [];
  const options = {
    excludes: new Set(),
    quality: DEFAULT_QUALITY,
    recursive: false,
    overwrite: false,
    help: false,
  };

  let i = 0;
  while (i < args.length) {
    const token = args[i];
    if (token === "--help" || token === "-h") {
      options.help = true;
      i += 1;
      continue;
    }
    if (token === "--recursive" || token === "-r") {
      options.recursive = true;
      i += 1;
      continue;
    }
    if (token === "--overwrite") {
      options.overwrite = true;
      i += 1;
      continue;
    }
    if (token.startsWith("--quality")) {
      const value = token.includes("=") ? token.split("=")[1] : args[++i];
      options.quality = Math.max(
        1,
        Math.min(100, parseInt(value, 10) || DEFAULT_QUALITY)
      );
      i += 1;
      continue;
    }
    if (token.startsWith("--exclude")) {
      const value = token.includes("=") ? token.split("=")[1] : args[++i];
      if (value) {
        for (const name of value.split(",")) {
          const trimmed = name.trim();
          if (trimmed) options.excludes.add(trimmed);
        }
      }
      i += 1;
      continue;
    }
    // keep only simple options; positional directories are supported
    if (token.startsWith("--")) {
      console.warn("Unknown option:", token);
      i += 1;
      continue;
    }
    // Positional directory
    directories.push(token);
    i += 1;
  }

  return { directories, options };
}

/**
 * Check whether a file exists.
 * Returns true if accessible; otherwise false.
 */
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Walk a directory tree using an explicit stack (DFS) and yield entries.
 * Yields objects of the form: { entry: Dirent, fullPath: string }.
 * Caller decides how to filter files vs directories.
 */
async function* walkDirectory(rootDir) {
  const stack = [rootDir];
  while (stack.length > 0) {
    const currentDir = stack.pop();
    let entries;
    try {
      entries = await fs.readdir(currentDir, { withFileTypes: true });
    } catch (error) {
      console.error("Cannot read directory:", currentDir, "-", error.message);
      continue;
    }
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      yield { entry, fullPath };
      if (entry.isDirectory()) stack.push(fullPath);
    }
  }
}

/**
 * Determine whether a file should be considered for conversion.
 * Applies extension whitelist and exclusion list checks.
 */
function isCandidateFile(fileName, extensions, excludes) {
  if (excludes.has(fileName)) return false;
  const ext = path.extname(fileName).toLowerCase();
  return extensions.has(ext);
}

/**
 * Convert a single image to WebP using sharp.
 * Preserves metadata and sets encoder quality/effort.
 * Throws on failure.
 */
async function convertWithSharp(inputFilePath, destinationFilePath, quality) {
  await sharp(inputFilePath)
    .withMetadata()
    .webp({ quality: quality, effort: 4 })
    .toFile(destinationFilePath);
}

/**
 * Convert all candidate files in a directory according to options.
 * - Skips existing .webp files unless overwrite is enabled (default: skip).
 * - Supports optional recursive traversal.
 * Returns a summary with totals and counts.
 */
async function processDirectory(targetDirectory, options) {
  const absDir = path.resolve(process.cwd(), targetDirectory);
  let entries;
  try {
    entries = await fs.readdir(absDir, { withFileTypes: true });
  } catch (error) {
    console.error("Target directory not found:", absDir);
    return { dir: absDir, converted: 0, skipped: 0, failed: 0, total: 0 };
  }

  const candidates = [];
  if (options.recursive) {
    for await (const { entry, fullPath } of walkDirectory(absDir)) {
      if (entry.isDirectory()) continue;
      const fileName = path.basename(fullPath);
      if (!isCandidateFile(fileName, EXTENSIONS, options.excludes)) continue;
      candidates.push(fullPath);
    }
  } else {
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      const fileName = entry.name;
      if (!isCandidateFile(fileName, EXTENSIONS, options.excludes)) continue;
      candidates.push(path.join(absDir, fileName));
    }
  }

  let converted = 0;
  let skipped = 0;
  let failed = 0;

  for (const filePath of candidates) {
    const directoryPath = path.dirname(filePath);
    const baseName = path.basename(filePath, path.extname(filePath));
    const destinationPath = path.join(directoryPath, baseName + ".webp");
    if (!options.overwrite && (await fileExists(destinationPath))) {
      skipped += 1;
      continue;
    }
    try {
      await convertWithSharp(filePath, destinationPath, options.quality);
      converted += 1;
    } catch (error) {
      failed += 1;
      console.warn(
        "Failed:",
        filePath,
        "=>",
        error?.message || "Unknown error"
      );
    }
  }

  console.log("Directory:", absDir);
  console.log("  Total candidates:", candidates.length);
  console.log("  Converted:", converted);
  console.log("  Skipped (exists):", skipped);
  console.log("  Failed:", failed);

  return { dir: absDir, converted, skipped, failed, total: candidates.length };
}

/**
 * Print a concise CLI usage message.
 */
function printUsage() {
  console.log(
    "Usage: node scripts/convert-to-webp.js <dir> [<dir> ...] [--exclude=a.png,b.jpg] [--quality=85] [--recursive|-r]"
  );
}

/**
 * Entry point: parse arguments, process each directory, and print totals.
 */
async function run() {
  const { directories, options } = parseArgs(process.argv);
  if (options.help || directories.length === 0) {
    printUsage();
    if (directories.length === 0)
      console.log(
        "Example: npm run webp -- docs/public/images/frontend/css --exclude hero_section.png,hero_section.webp --quality 85"
      );
    process.exit(directories.length === 0 ? 1 : 0);
  }

  let totalConverted = 0;
  let totalSkipped = 0;
  let totalFailed = 0;
  let totalCandidates = 0;

  for (const dir of directories) {
    const summary = await processDirectory(dir, options);
    totalConverted += summary.converted;
    totalSkipped += summary.skipped;
    totalFailed += summary.failed;
    totalCandidates += summary.total;
  }

  console.log("WebP conversion completed");
  console.log("All directories candidates:", totalCandidates);
  console.log("All converted:", totalConverted);
  console.log("All skipped (exists):", totalSkipped);
  console.log("All failed:", totalFailed);
}

run();
