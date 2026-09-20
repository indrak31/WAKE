# AGENTS.md — Life, in Receipts

## Project
A frontend-only interactive experience turning a fictional dataset of digital-life fragments (music, movies, places, purchases, photos, messages, searches, events, notes) into a connected, discoverable story. No backend, no database — Next.js + shadcn + Tailwind + TypeScript only.

## File structure conventions
- All UI components live in `/components/ui/`
- All dataset and narrative content lives in `/lib/lifeData.ts`
- Shared filter/search state lives in a single parent page component and is passed down as props — never duplicated into separate local state per component

## Hard rules — do not violate

1. **`/lib/lifeData.ts` narrative content is fixed, not a draft.** The chapter titles, arc lines, and `linkReason` strings for the four authored "reveal" connections are hand-written and final. Do not paraphrase, rewrite, "improve," shorten, or regenerate any of this text under any circumstances, even if asked to refactor the file. If the file needs a structural change (new field, new type), preserve every existing string value exactly as written.

2. **The four reveal connections are the emotional core of the app.** Do not add additional "reveal" connections, do not remove any of the four, and do not change which receipts they link.

3. **`filteredReceipts` state must be single-sourced.** The search bar, type filters, chapter filter, Connection Explorer, and Timeline must all read from one shared filtered-receipts array. If a component needs its own view of the data, derive it from that shared array — never fetch or filter `lifeData.ts` independently inside a component.

4. **No generic placeholder content.** Every card, caption, and label must read like it belongs to a real (fictional) person's digital life. If additional filler receipts are needed to fill out a grid, match the tone and mood of that receipt's chapter — no dev-tool or SaaS-style placeholder text, no Lorem Ipsum.

5. **Mixed receipt types, not photo-only.** Any grid or scattered-card layout of receipts must visually mix types (song, message, purchase, place, photo, search, event, note) — never render a section using only one receipt type unless the user's filter has explicitly narrowed it to that type.

## Tech stack
- Next.js, TypeScript, Tailwind CSS, shadcn/ui structure
- framer-motion for scroll-linked and reveal animations
- lucide-react for all icons

## Before finishing any task
Re-read `/lib/lifeData.ts` and confirm no narrative strings were altered from their original authored version before considering the task complete.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
