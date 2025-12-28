# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the Application
- `npm run dev` - Start Vite development server on http://localhost:5173
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Testing
- `npm test` - Run all Playwright tests
- `npm run test:ui` - Run Playwright tests with UI mode
- `npm run test:headed` - Run Playwright tests in headed mode (browser visible)
- `npm run test:debug` - Run Playwright tests in debug mode

## Project Architecture

### Technology Stack
- **Framework**: Vue 3 with `<script setup>` composition API syntax
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3.4
- **Testing**: Playwright for E2E tests, with some legacy Cypress tests in `src/cypress/`

### Project Structure
- `src/` - Application source code
  - `App.vue` - Root component that renders LoginPage
  - `main.js` - Application entry point, imports Tailwind via `index.css`
  - `components/` - Vue components
    - `LoginPage.vue` - Main login component with snow animation effects
  - `style.css` - Vite default styles
  - `index.css` - Tailwind CSS imports
- `tests/` - Playwright E2E tests
  - `seed.spec.ts` - Base fixtures for tests
  - Test files follow pattern `[feature].spec.ts`
- `specs/` - Test plan documentation in markdown format
- `playwright.config.ts` - Playwright configuration (baseURL: http://localhost:5173)
- `tailwind.config.js` - Tailwind configuration with dark mode class strategy
- `vite.config.js` - Vite build configuration

### Key Architecture Patterns

**Vue Components**: All Vue components use the `<script setup>` syntax with Composition API. Components are single-file components (SFCs) with template, script, and scoped styles.

**Styling Approach**: The project uses a hybrid approach:
- Tailwind CSS utilities imported via `src/index.css`
- Component-specific styles in `<style scoped>` blocks (see LoginPage.vue)
- Global resets and base styles in `App.vue`

**Testing Architecture**:
- Tests are written in TypeScript using Playwright
- Test plans are documented in `specs/*.md` files with detailed scenarios
- Each test suite references its test plan via comments: `// spec: specs/login-test-plan.md`
- Seed files provide shared fixtures: `// seed: tests/seed.spec.ts`
- Tests assume dev server is running (auto-started by Playwright config)

### Current Application State

The application currently displays a login page (`LoginPage.vue`) with:
- Night sky gradient background with 50 animated snowflakes
- Semi-transparent login form card with glass morphism effect
- Form fields: username, password, remember me checkbox
- Hardcoded authentication: username `admin`, password `password`
- Success/error message displays
- Responsive design with mobile-first breakpoints

### Test Credentials
- Username: `admin`
- Password: `password`

## Working with Tests

Playwright tests run against the dev server on port 5173. The Playwright config automatically starts the dev server before tests run.

Test files in `tests/` directory should reference their corresponding test plan in `specs/` via a comment header. This links automated tests to documented test scenarios.

The project uses Chinese (Traditional) for UI text and test descriptions in existing components. Maintain consistency with existing language choices when modifying tests or UI text.
