// main.ts — deliver entry.png to the grader's output directory.
//
// The image is copied byte-for-byte, but the copy is treated as guilty
// until proven innocent: the source must exist and carry a genuine PNG
// signature before anything is written, and afterwards the SHA-256
// digest of the copy is compared against the source so a truncated or
// corrupted delivery fails loudly instead of passing silently.

import { createHash } from "node:crypto";
import { createReadStream, createWriteStream } from "node:fs";
import { access, mkdir, open, stat } from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

// The fixed eight-byte signature that opens every PNG file.
const PNG_SIGNATURE: readonly number[] = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const IMAGE_NAME = "entry.png";
const FALLBACK_OUTPUT_DIR = "output";

// Error type for every expected, explainable delivery failure.
class DeliveryError extends Error {}

// The entry root is the directory this file lives in; the image sits
// next to it no matter where the process is launched from.
function entryRootDir(): string {
  return path.dirname(fileURLToPath(import.meta.url));
}

// Honour MAKEFUN_OUTPUT_DIR when set, otherwise fall back to ./output.
function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  const chosen =
    fromEnv !== undefined && fromEnv.trim() !== "" ? fromEnv : FALLBACK_OUTPUT_DIR;
  return path.resolve(chosen);
}

// Make sure the source exists, is a regular file, and is at least long
// enough to hold a PNG signature. Returns the file size in bytes.
async function requireSourceFile(filePath: string): Promise<number> {
  try {
    await access(filePath);
  } catch {
    throw new DeliveryError(`source image is missing: ${filePath}`);
  }
  const info = await stat(filePath);
  if (!info.isFile()) {
    throw new DeliveryError(`source path is not a regular file: ${filePath}`);
  }
  if (info.size < PNG_SIGNATURE.length) {
    throw new DeliveryError(
      `source image is only ${info.size} bytes — too small to be a PNG`,
    );
  }
  return info.size;
}

// Read just the header bytes and compare them with the PNG signature.
async function assertPngSignature(filePath: string): Promise<void> {
  const handle = await open(filePath, "r");
  try {
    const header = Buffer.alloc(PNG_SIGNATURE.length);
    const { bytesRead } = await handle.read(header, 0, PNG_SIGNATURE.length, 0);
    if (bytesRead !== PNG_SIGNATURE.length) {
      throw new DeliveryError(`could not read a full PNG signature from ${filePath}`);
    }
    for (let i = 0; i < PNG_SIGNATURE.length; i += 1) {
      if (header[i] !== PNG_SIGNATURE[i]) {
        throw new DeliveryError(`${filePath} does not start with a PNG signature`);
      }
    }
  } finally {
    await handle.close();
  }
}

// Stream the file through SHA-256 without loading it into memory.
async function sha256Of(filePath: string): Promise<string> {
  const digest = createHash("sha256");
  await pipeline(createReadStream(filePath), digest);
  return digest.digest("hex");
}

// Copy with streams so the file never sits in memory as one big buffer.
async function copyFile(source: string, destination: string): Promise<void> {
  await pipeline(createReadStream(source), createWriteStream(destination));
}

// A `--check` flag on the command line asks for a dry run: validate the
// source and report what would be delivered, but write nothing anywhere.
function checkModeRequested(): boolean {
  return process.argv.slice(2).includes("--check");
}

async function run(): Promise<void> {
  const source = path.join(entryRootDir(), IMAGE_NAME);
  const outputDir = resolveOutputDir();
  const destination = path.join(outputDir, IMAGE_NAME);

  const size = await requireSourceFile(source);
  await assertPngSignature(source);

  if (checkModeRequested()) {
    console.log(
      `check passed: ${IMAGE_NAME} (${size} bytes) is a valid PNG; ` +
        `a real run would deliver it to ${destination}`,
    );
    return;
  }

  await mkdir(outputDir, { recursive: true });
  await copyFile(source, destination);

  const sourceHash = await sha256Of(source);
  const copyHash = await sha256Of(destination);
  if (sourceHash !== copyHash) {
    throw new DeliveryError(
      `integrity check failed: source sha256 ${sourceHash} but copy is ${copyHash}`,
    );
  }

  console.log(`delivered ${IMAGE_NAME} (${size} bytes) -> ${destination}`);
  console.log(`sha256 ${sourceHash.slice(0, 16)}... verified: copy is byte-identical`);
}

run().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`delivery failed: ${message}`);
  process.exitCode = 1;
});
