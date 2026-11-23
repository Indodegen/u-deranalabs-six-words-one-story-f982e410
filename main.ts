import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");
const line = text.trimEnd();
if (line.includes("\n")) {
  console.error("entry.txt must be a single line");
  process.exit(1);
}
const words = line.split(/\s+/).filter(Boolean);
if (line.length < 1 || line.length > 60 || words.length !== 6) {
  console.error(
    `entry.txt must hold exactly 6 words and 1-60 characters, got ${words.length} words and ${line.length} characters`
  );
  process.exit(1);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text);
console.log("entry.txt written to " + join(outDir, "entry.txt"));
