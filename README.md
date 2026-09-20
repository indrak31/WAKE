# Life, in Receipts

A frontend-only interactive experience that turns a fictional dataset of digital-life fragments into a connected, discoverable story — not a timeline, a story you can pull apart and reassemble yourself.

## Run locally
```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Requirements checklist
- [x] Explore the life receipts — *[`/components/ui/timeline.tsx` & `/components/ui/receipt-cards.tsx`]*: Full multi-type receipt cards (thermal paper receipt with serrated tear, vinyl audio sleeve, iMessage bubble, legal pad notes, location map pins, photo polaroids, search pills, and ticket stubs) with modal deep-inspection (`/components/ui/receipt-detail-modal.tsx`).
- [x] Filtering, searching, navigation — *[`/components/ui/receipt-search-filter.tsx`]*: Sticky search bar with 200ms debounced text search across titles, merchants, notes, and songs; 9 multi-select type toggle pills with Lucide icons; chapter dropdown; and live moment counter ("Showing X of Y moments").
- [x] Mechanism for discovering relationships/patterns — *[`/components/ui/connection-explorer.tsx`]*: Physics-free organic clustered scatter constellation, interactive click selection, animated SVG curved connecting lines (`<path>`), automatic dimming of unrelated cards to 25%, and floating caption banners surfacing the exact authored reveal reasons from `lib/lifeData.ts`.
- [x] Interactive storytelling experience — *[`/components/ui/interactive-scrolling-story-component.tsx` & `/components/ui/story-reveal.tsx`]*: Hero section with chaos-to-resolve scroll transition across chapters with dynamic palette shifts and receipt mockups; culminating in Chapter 6's quiet reflective payoff displaying the pre-connected four reveal hinges and the closing reflection: *"Every small thing adds up to somebody. This time, it was you."*
- [x] Clear visual representation of the digital journey — *[`/components/ui/timeline.tsx`]*: Scroll-linked framer-motion gradient progress line with glowing chapter markers, verbatim narrative arc lines, and in-chapter linked moment hover highlights.
- [x] Responsive design — *[Breakpoints tested: Mobile 375px, Tablet 768px, Desktop 1280px/1440px]*: Horizontal scroll pill bar on mobile, flexible grid cards, touch-friendly nodes, and responsive cluster pagination.
