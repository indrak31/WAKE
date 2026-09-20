# WAKE ✦ A Story in Digital Fragments

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-ff0055?style=for-the-badge&logo=framer&logoColor=white)
![Turbopack](https://img.shields.io/badge/Turbopack-Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)

<p align="center">
  <strong>Reconstructing a human life from the quiet exhaust of daily transactions, streaming logs, and late-night digital footprints.</strong>
</p>

<p align="center">
  <a href="#-the-concept">Concept</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#-analytics--tracing">Life Analytics</a> •
  <a href="#-architecture--rules">Architecture</a> •
  <a href="#-running-locally">Quickstart</a> •
  <a href="#-tech-stack">Tech Stack</a>
</p>

</div>

---

## 🌌 The Concept

What remains of a person when you don’t look at their polished social media profiles, but at the raw, unedited debris of their digital existence?

**WAKE** is an interactive, cinematic web application that transforms a dataset of real-world digital fragments—extracted from **Spotify streaming archives**, **daily household expense logs**, late-night search queries, transit passes, polaroids, and encrypted notes—into a discovered narrative spanning 10 months.

Rather than presenting a static feed or flat list, **WAKE** allows the viewer to pull apart the constellation of fragments, trace financial habits and insomnia patterns, uncover hidden hinges, and witness an emotional arc moving from isolated night-shift routines to a shared life.

---

## ✨ Key Features

### 1. 🎞️ Cinematic Hero: Chaos to Resolve
- **Scroll-Linked Transition**: Dynamic storytelling showcase that shifts palettes, background atmospheres, and floating receipt mockups across six narrative chapters.
- **Atmospheric Living Backdrop**: Multi-layered SVG ambient aurora glow and twinkling starfields rendered at 60 FPS without layout shifts.

### 2. ⚡ Command Center & Live Tracing Ribbon
- **Sub-200ms Debounced Global Search**: Instantly filters receipts by merchant, song, artist, search terms, or personal notes.
- **Single-Source State Engine**: Unified filtering that simultaneously updates the Constellation Graph, Narrative Timeline, and Life Analytics in real-time.
- **Live Tracing Ribbon**: Sticky telemetry pill bar tracking total money spent, music tracks logged, cumulative plays, and active fragments with quick-jump shortcuts.

### 3. 🕸️ Connection Explorer: The Constellation Graph
- **Non-Linear Discovery**: Physics-free clustered scatter constellation where fragments float in organic groupings.
- **Animated SVG Bezier Connectors**: Selecting any card dynamically renders glowing SVG curved paths connecting linked memories, dimming unrelated fragments to focus attention.
- **Authored Reveal Hinges**: Surfacing four critical emotional hinges that tie together seemingly disconnected receipts.

### 4. 📜 Multi-Format Narrative Timeline
- **Sensory-Rich Physical Artifacts**: Every receipt type is uniquely designed to feel tangible:
  - 🧾 **Thermal Receipts**: Serrated paper edges, monospace line items, tax calculations, and merchant stamps.
  - 🎵 **Vinyl Audio Sleeves**: Record grooves, BPM/key telemetry, replay counts, and audio timestamps.
  - 💬 **iMessage Bubbles**: Dynamic chat threads with delivery statuses and read receipts.
  - 📝 **Legal Pad Notes**: Ruled paper lines, handwritten-style typography, and tear-off margins.
  - 📍 **Transit & Maps**: Route coordinates, metro stops, and timestamped boarding passes.
  - 📷 **Polaroid Photos**: Analog photo borders, handwritten dates, and subtle vignettes.
- **Deep Inspection Modal**: Fullscreen detail view with keyboard navigation (`Esc`), high-resolution artwork, and linked fragment jumping.

### 5. 📊 Digital Life Analytics & Pie Graphs
Positioned immediately after the Timeline, this analytical dashboard provides quantitative introspection:
- **🪙 Financial Tracing (Donut Chart)**:
  - Categorizes spending into **Dining & Cafes**, **Groceries & Bakery**, **Transit & Commute**, **Digital & Subscriptions**, and **Living & Essentials**.
  - Interactive SVG slices with glowing hover expansions, interactive legends, and dynamic center readouts.
- **⚡ Activity Footprint (Donut Chart)**:
  - Quantifies the balance between music listening, purchases, physical locations, messaging, notes, photos, and searches.
- **🌙 The 2 AM Insomnia Shift**:
  - Dual-gradient meter tracking the frequency of late-night streams (1:00 AM – 4:59 AM) vs daytime activity, charting the subject's shift toward recovery after June 14.

### 6. 📻 Persistent Soundtrack Dock & Audio Visualizer
- **Ambient Synth Score**: Continuous background music with synth melodies and tracks inspired by late-night listening habits (The Weeknd, synthwave).
- **Web Audio Canvas Visualizer**: Real-time frequency spectrum visualizer rendered directly to HTML5 canvas.
- **Floating Controls**: Play/pause, track skip, volume slider, and track telemetry docked smoothly in the bottom-right corner.

### 7. 🎭 The Story Reveal (Chapter 6 Payoff)
- The climactic interactive closing experience linking the four authored story hinges, culminating in the central reflection:
  > *"Every small thing adds up to somebody. This time, it was you."*

---

## 🏗️ Architecture & Data Integrity

WAKE is built following strict architectural principles:

```
├── app/
│   ├── layout.tsx                # Metadata, fonts (Geist, Space Grotesk, JetBrains Mono)
│   ├── page.tsx                  # Single-source state orchestrator & section assembler
│   └── globals.css               # Tailwind CSS v4 design tokens & keyframes
├── components/ui/
│   ├── animated-background.tsx   # Ambient aurora blobs & star canvas
│   ├── connection-explorer.tsx   # Constellation graph & bezier link lines
│   ├── interactive-scrolling-story-component.tsx # Hero scroll showcase
│   ├── life-analytics.tsx        # Donut/pie charts & insomnia curve
│   ├── receipt-cards.tsx         # Tactile physical cards for all 8 fragment types
│   ├── receipt-detail-modal.tsx  # Deep modal inspection & connected jump links
│   ├── receipt-search-filter.tsx # Sticky command bar & live tracing ribbon
│   ├── soundtrack-dock.tsx       # Synth soundtrack player & canvas visualizer
│   ├── story-reveal.tsx          # Chapter 6 emotional payoff
│   ├── story-walkthrough.tsx     # Guided hackathon tour overlay
│   ├── timeline.tsx              # Chronological narrative stream
│   └── wake-logo.tsx             # Responsive SVG brand logo
├── lib/
│   ├── lifeData.ts               # Authored narrative & dataset integration
│   └── utils.ts                  # Class merge utilities (clsx + twMerge)
└── public/
    └── data/                     # Raw extracted Spotify & transaction logs
```

### Core Invariants:
1. **Single-Sourced Filter State**: The search query, type selections, and chapter filters live exclusively in `app/page.tsx`. All components (Timeline, Constellation, Analytics, Command Bar) consume the exact same `filteredReceipts` array.
2. **Fixed Narrative Strings**: All chapter titles, arc lines, and the four authored reveal reasons in `lib/lifeData.ts` are hand-crafted and immutable.
3. **Tailwind CSS v4 Standard**: Zero deprecated utility classes (`bg-linear-to-*`, modern spacing, hardware-accelerated transforms).

---

## 🚀 Running Locally

### Prerequisites
- Node.js 18.17+ or 20+
- npm, pnpm, or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/indrak31/WAKE.git
cd WAKE

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
# Build optimized production bundle
npm run build

# Start production server
npm run start
```

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16.3.5](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | [TypeScript 5.0](https://www.typescriptlang.org/) (Strict Mode) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Animation** | [Framer Motion 12](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Visualizer** | HTML5 Canvas + Web Audio API |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🏆 Submission Checklist

- [x] **Explore Life Receipts**: Tangible physical receipt cards across 8 digital life types with modal inspection.
- [x] **Search & Multi-Filter**: Debounced global text search, 9 type toggles, chapter dropdown, and reset actions.
- [x] **Relationship & Pattern Discovery**: Interactive constellation explorer with animated SVG bezier connections and authored reveal banners.
- [x] **Interactive Storytelling**: Scroll-driven hero chapter showcase transitioning into Chapter 6's reflective payoff.
- [x] **Chronological Digital Journey**: Scroll-linked gradient timeline with live progress tracking.
- [x] **Life Analytics**: Interactive SVG pie/donut charts for money spent, activity distribution, and late-night insomnia curves.
- [x] **Audio & Atmosphere**: Integrated synth soundtrack dock with real-time audio visualizer.
- [x] **Responsive**: Fully optimized for mobile (375px), tablet (768px), and high-resolution desktop displays.

---

<div align="center">
  <sub>Built with care for Web Rush 2026. Designed & engineered by <a href="https://github.com/indrak31">indrak31</a>.</sub>
</div>
