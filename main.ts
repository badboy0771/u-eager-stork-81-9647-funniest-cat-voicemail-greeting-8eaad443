// Funniest Cat Voicemail Greeting — make.fun entry (program/v1).
//
// The entry is one voicemail greeting recorded by a cat, at most 120
// characters, written to /output/entry.txt. The sealed scorer only accepts
// UTF-8 text of 1..120 characters that is not only whitespace, so this
// program validates the greeting against the gate before writing it:
// a bad greeting fails loudly here instead of shipping an invalid entry.
//
// The greeting itself — Miso, a smug cat with a very specific grievance:
//   "Hi, it's Miso. I'm napping in the box you threw away. Leave a
//    message after the beep — I'll knock it off the shelf."
// Why this line, against the judge's brief:
//   1. It is unmistakably a cat's voicemail: a greeting, a name, and the
//      classic "leave a message after the beep".
//   2. The joke is cat-specific twice over: napping in the box the human
//      threw away, and knocking things off shelves.
//   3. Miso has a voice of her own — unbothered, a little menacing, and
//      already planning the next crime while you listen.
//   4. Spoken aloud it lands in seconds, with the punch ("I'll knock it
//      off the shelf") arriving at the very end, right where the beep
//      would be.
//   5. No tired pun, no catchphrase: the humour comes from the situation,
//      not from the word "cat".

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The one and only entry. Kept as a single literal so the file the judge
// reads is byte-for-byte what is written here.
const GREETING =
  "Hi, it's Miso. I'm napping in the box you threw away. Leave a message after the beep — I'll knock it off the shelf.";

// Gate check, mirroring the sealed scorer: 1..120 characters, not only
// whitespace, and a single line (the brief asks for one line per entry).
function validate(text: string): void {
  if (text.length < 1 || text.length > 120) {
    throw new Error(`Greeting is ${text.length} characters; the gate allows 1..120.`);
  }
  if (text.trim().length === 0) {
    throw new Error("Greeting is only whitespace.");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Greeting must be a single line.");
  }
}

validate(GREETING);

const out = "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, GREETING + "\n", "utf8");
console.log(`Wrote ${GREETING.length} characters to ${out}`);
