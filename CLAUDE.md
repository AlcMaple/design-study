# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based design portfolio website featuring animated text over video backgrounds. The application showcases modern web design elements with GSAP animations and Lottie loading animations.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (use with caution)
npm run eject
```

## Tech Stack & Architecture

- **Framework**: React 19.1.1 with Create React App
- **Styling**: Tailwind CSS 3.4.17 with PostCSS and Autoprefixer
- **Animation**: GSAP 3.13.0 (including ScrollTrigger and SplitText plugins)
- **Loading Animation**: Lottie Web 5.13.0
- **Testing**: React Testing Library with Jest

## Key Components

### App.js (`src/App.js`)
Main application component that handles:
- Video background with autoplay/loop
- Text carousel rotation every 5 seconds
- Loading state management 
- Video loading detection via `onCanPlayThrough`
- Click handler to open video in new window

### SplitText (`src/components/SplitText.js`)
Advanced text animation component using GSAP SplitText:
- Configurable split types: chars, words, lines
- ScrollTrigger integration for viewport-based animations
- Customizable animation properties (duration, ease, delay)
- Automatic cleanup of GSAP instances and event listeners

### Loading (`src/components/Loading.js`) 
Lottie-based loading screen:
- External JSON animation from CDN
- SVG renderer for crisp animations
- Proper cleanup of animation instances

## File Structure

```
src/
├── App.js              # Main application component
├── components/
│   ├── SplitText.js    # GSAP text animation component
│   └── Loading.js      # Lottie loading animation
├── App.css             # Application styles
└── index.css           # Global styles with Tailwind imports

public/
└── Zypsy.mp4          # Background video asset
```

## Animation Implementation Notes

- Text animations use GSAP's SplitText plugin for character-level control
- ScrollTrigger is configured with proper cleanup to prevent memory leaks
- Video loading is handled asynchronously with proper state management
- All animations include force3D for GPU acceleration
- Component unmounting properly destroys GSAP timelines and instances

## Styling Conventions

- Uses Tailwind utility classes for responsive design
- Viewport-based font sizing (`text-[10vw]`) for responsive typography
- Fixed positioning for overlay elements with z-index layering
- CSS custom properties in Tailwind config for theme extensions