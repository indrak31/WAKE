# Changelog

All notable changes to **WAKE** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-09-20

### Added
- **Digital Life Analytics**: Interactive SVG pie and donut charts for Financial Tracing (categorized expenses) and Activity Footprint distributions.
- **The 2 AM Insomnia Shift**: Temporal tracking meter comparing late-night Spotify loops against daytime routines.
- **Sticky Tracing Ribbon**: Live `$ spent` and playback counters in navbar with smooth-scroll jumps to `#analytics`.
- **Next.js App Router Architecture**: Added dedicated `app/loading.tsx`, `app/error.tsx`, and `app/not-found.tsx` boundaries.
- **Custom Hooks**: Created `hooks/use-filtered-receipts.ts` and `hooks/use-soundtrack.ts`.
- **Domain Types Layer**: Extracted domain models to `types/index.ts`.
- **Data Integrity Tests**: Unit test suite in `tests/data-integrity.test.mjs` verifying dataset structures and invariants.

### Changed
- Refactored all CSS classes to strictly comply with Tailwind CSS v4 syntax (`bg-linear-to-*`, `bg-size-*`).
- Ingested real Spotify streaming archives and daily household expense logs, replacing mock entries while preserving authored reveal hinges.
- Enhanced responsive typography, touch targets, and accessibility ARIA labels across all tactile cards.

## [1.1.0] - 2026-09-19

### Added
- **Soundtrack Dock**: Persistent audio player with real-time Web Audio API frequency canvas visualizer.
- **Connection Explorer**: Clustered constellation view with animated SVG bezier curved paths.
- **Tactile Receipt Cards**: Thermal receipts, vinyl audio sleeves, legal pads, iMessage bubbles, and polaroid photos.

## [1.0.0] - 2026-09-18

### Added
- Initial release of WAKE digital life reconstruction experience.
