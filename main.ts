// Fortune in a Pot — a kind, funny fortune for the houseplant on the windowsill.
// Writes one line (118 characters) to /output/entry.txt, deterministically.
// Write the fortune with no trailing newline, then read it back and
// confirm the file on disk is byte-identical to the string above.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const FORTUNE =
  "Soon your leaves will catch the morning sun, and a passerby will stop to admire you; the window was always your stage.";

// Gate guard: the entry must be one line of 1–120 UTF-8 characters.
if ([...FORTUNE].length < 1 || [...FORTUNE].length > 120 || FORTUNE.includes("\n")) {
  throw new Error("fortune breaks the 1-120 character, single-line gate");
}

const outDir = process.argv[2] ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, FORTUNE, "utf8");
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
if (written !== FORTUNE) {
  throw new Error("read-back mismatch: entry.txt differs from the fortune");
}
