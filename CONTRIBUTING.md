# Contributing to WAKE

Thank you for your interest in contributing to **WAKE**! We welcome contributions that align with our narrative and architectural integrity.

## Code of Conduct
We are committed to providing a welcoming, inclusive, and harassment-free experience for everyone.

## Architectural Guidelines
1. **Single-Source State**: All filtering and search state must be unified in `app/page.tsx` and passed down as props. Do not create independent local copies of receipt arrays.
2. **Immutable Narrative Content**: The chapter titles, arc lines, and the four authored reveal connections in `lib/lifeData.ts` are hand-crafted and final. Preserve these string values verbatim.
3. **Tailwind CSS v4 Standards**: Use `bg-linear-to-*` rather than deprecated `bg-gradient-to-*` utilities. Ensure hardware acceleration on transitions and maintain responsive fluid spacing.
4. **TypeScript Strictness**: All components, hooks, and utilities must maintain 100% strict TypeScript typing without `any` bypasses.

## Development Workflow
```bash
# 1. Clone repository
git clone https://github.com/indrak31/WAKE.git
cd WAKE

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Run tests
npm test

# 5. Build verification
npm run build
```

## Pull Request Guidelines
- Ensure `npm run build` succeeds with zero errors or warnings.
- Verify tests pass with `npm test`.
- Provide a clear description of the problem solved and any visual UI changes.
