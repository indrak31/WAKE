import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// Read and parse lib/lifeData.ts for static architectural invariant testing
const lifeDataPath = path.resolve(process.cwd(), "lib", "lifeData.ts");
const lifeDataRaw = fs.readFileSync(lifeDataPath, "utf-8");

test("Architectural Invariant: Exactly 4 authored reveal connections exist", () => {
  assert.ok(lifeDataRaw.includes("reveal1:"), "Reveal 1 must exist");
  assert.ok(lifeDataRaw.includes("reveal2:"), "Reveal 2 must exist");
  assert.ok(lifeDataRaw.includes("reveal3:"), "Reveal 3 must exist");
  assert.ok(lifeDataRaw.includes("reveal4:"), "Reveal 4 must exist");
  assert.ok(lifeDataRaw.includes("getLinkReason"), "getLinkReason helper must be exported");
});

test("Architectural Invariant: Chapters array contains all 6 chapters", () => {
  assert.ok(lifeDataRaw.includes('id: "chapter-1"'), "Chapter 1 must exist");
  assert.ok(lifeDataRaw.includes('id: "chapter-2"'), "Chapter 2 must exist");
  assert.ok(lifeDataRaw.includes('id: "chapter-3"'), "Chapter 3 must exist");
  assert.ok(lifeDataRaw.includes('id: "chapter-4"'), "Chapter 4 must exist");
  assert.ok(lifeDataRaw.includes('id: "chapter-5"'), "Chapter 5 must exist");
  assert.ok(lifeDataRaw.includes('id: "chapter-6"'), "Chapter 6 must exist");
});

test("Architectural Invariant: Extracted archive datasets exist in public/data", () => {
  const spotifyData = path.resolve(process.cwd(), "public", "data", "archive_extracted_spotify.json");
  const txData = path.resolve(process.cwd(), "public", "data", "archive_extracted_transactions.json");
  
  assert.ok(fs.existsSync(spotifyData), "Extracted Spotify dataset must exist");
  assert.ok(fs.existsSync(txData), "Extracted Transactions dataset must exist");
});

test("Architectural Invariant: Core components and hooks exist", () => {
  assert.ok(fs.existsSync(path.resolve(process.cwd(), "hooks", "use-filtered-receipts.ts")), "Hook must exist");
  assert.ok(fs.existsSync(path.resolve(process.cwd(), "types", "index.ts")), "Types must exist");
  assert.ok(fs.existsSync(path.resolve(process.cwd(), "app", "loading.tsx")), "loading.tsx must exist");
  assert.ok(fs.existsSync(path.resolve(process.cwd(), "app", "error.tsx")), "error.tsx must exist");
  assert.ok(fs.existsSync(path.resolve(process.cwd(), "app", "not-found.tsx")), "not-found.tsx must exist");
});
