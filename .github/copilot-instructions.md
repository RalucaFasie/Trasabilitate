# Project Overview

This is a blockchain traceability demonstration application for the bread production supply chain. It showcases how blockchain technology can track products from farm to store, providing transparency and verification at each stage of production. The application is built as a single-page web interface that displays interactive blockchain information for each stage: farm (ferma), transport, mill (moara), bakery (brutaria), and store (magazin).

# Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Cryptography**: Web Crypto API for SHA-256 hashing
- **Language**: Romanian (for UI text and data)
- **No build tools**: Direct browser execution, no bundler or preprocessor required
- **Responsive Design**: Mobile-first approach with separate layouts for desktop and mobile

# File Structure

- `index.html` - Main HTML structure with modals for blockchain data display
- `script.js` - Blockchain logic, hash generation, and UI interactions
- `style.css` - Responsive styling with mobile and desktop layouts
- `assets/` - Images for desktop (paine.png) and mobile (mobile.png) interfaces

# Coding Guidelines

## General
- Write clean, readable vanilla JavaScript without external dependencies
- Use Romanian for UI text, comments can be in English or Romanian
- Maintain the existing code structure and naming conventions
- Keep accessibility in mind (ARIA labels, keyboard navigation)

## JavaScript
- Use `async/await` for asynchronous operations (e.g., crypto operations)
- Use `const` for constants and `let` for variables; avoid `var`
- Use template literals for string concatenation
- Function names should be descriptive and use camelCase (e.g., `generateHashForBlock`, `openBlock`)
- Use modern DOM methods (`querySelector`, `getElementById`, `addEventListener`)

## CSS
- Use percentage-based positioning for responsive design
- Maintain separate styles for mobile (`@media (max-width: 900px)`) and desktop
- Use semantic class names that describe purpose (e.g., `.modal-content`, `.hash-display`)
- Keep animations simple and performant

## HTML
- Use semantic HTML5 elements where appropriate
- Include ARIA labels for accessibility on interactive elements
- Maintain the existing modal structure pattern for consistency

# Key Concepts

## Blockchain Implementation
- Each block contains: `tip` (type), `data` (stage information), `previousHash`, and `hash`
- Blocks are linked sequentially: ferma → transport → moara → brutaria → magazin
- Hashes are generated using SHA-256 via Web Crypto API
- The first block (ferma) has previousHash of "0000000000000000"
- Hash generation combines previousHash with all data fields

## Responsive Design
- Desktop: Uses background image (paine.png) with invisible hotspots
- Mobile: Uses mobile.png with absolutely positioned clickable buttons
- Breakpoint at 900px width

# Development

## Running the Application
- No build step required
- Open `index.html` directly in a modern web browser
- Or use a local web server: `python -m http.server 8000` or `npx serve`

## Testing
- Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- Test on mobile devices or using browser DevTools device emulation
- Verify blockchain hash generation on page load
- Test all interactive buttons and modals
- Verify keyboard navigation works for accessibility

## No Automated Tests
- This project currently has no automated test suite
- Manual testing is required for any changes

# Important Notes

- The blockchain data is hardcoded and for demonstration purposes only
- Hashes are recalculated on every page load
- All blockchain data is in Romanian to match the target audience
- The application demonstrates blockchain concepts visually without backend persistence

# References

- Web Crypto API: [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- SHA-256 Hashing: Used for blockchain integrity verification
