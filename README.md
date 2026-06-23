# AIC High-Ticket Closer Website

A premium, high-converting landing page built for the AIC High-Ticket Closer training program. The design replicates top-tier sales training websites with a focus on modern dark-theme aesthetics, buttery smooth micro-animations, and conversion optimization.

## Features

- **Premium Matte Black & Gold Theme**: A sleek `#121212` background complemented by a `#D4AF37` matte gold accent color.
- **Glassmorphism Elements**: Subtle translucent backgrounds with background-blur for a highly modern feel.
- **Super Smooth Animations**:
  - **Scroll Stagger Fade-Up**: As the user scrolls, elements like timelines, bios, and CTAs gracefully slide up and fade in sequentially.
  - **Character Reveal Effect**: Text characters animate into view sequentially for a premium wave-like typing effect.
- **Interactive UI**:
  - Expandable FAQs accordion with a CSS Grid height transition for butter-smooth opening and closing.
  - Interactive blueprint carousel.
  - Custom modal overlays for booking calls with a mock calendar interface.
- **Responsive Design**: Fully mobile optimized with CSS Grid and Flexbox layouts.

## File Structure

- `index.html`: The main landing page document.
- `style.css`: Contains all custom styling, including advanced CSS variables and keyframe animations.
- `script.js`: Handles all interactions, Intersection Observers for scroll animations, and the character reveal logic.
- `alex.png`: Bio photo for the About section.

## How to Run

Since this is a vanilla HTML/CSS/JS project, you can simply open the `index.html` file in your preferred web browser. 

Alternatively, you can run a local server:
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your browser.

## Customization

- **Colors**: The theme colors are fully controlled via CSS variables at the top of `style.css`. Change `--accent-gold` to modify the primary accent color.
- **Animations**: Timing functions use custom `cubic-bezier` curves for organic movement. Adjust these curves or the `--stagger-index` inline styles to speed up or slow down reveal animations.

---
Built with ❤️ for High-Ticket Closers.
