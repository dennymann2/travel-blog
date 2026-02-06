# Immersive-G Website Effects Analysis & Implementation Guide

## Overview
The Immersive-G website (https://immersive-g.com/) uses cutting-edge web technologies to create highly sophisticated, immersive digital experiences. This document outlines the key effects and technical implementation strategies we can apply to your website.

---

## Core Technologies Used

### 1. **3D Graphics Engine: Three.js (r151)**
- **Purpose**: Real-time 3D rendering on canvas
- **Implementation**: WebGL rendering for GPU-accelerated graphics
- **Use Cases**: 
  - 3D product visualization (Cartier watches, Dior designs)
  - Interactive 3D scenes
  - Particle effects and morphing geometries
  - 3D model integration (GLB/GLTF formats)

### 2. **Smooth Scrolling: Lenis**
- **Purpose**: High-performance, physics-based smooth scrolling
- **Features**:
  - Momentum scrolling
  - Desktop and mobile optimized
  - Non-blocking scroll events
  - Seamless integration with animations

### 3. **Animation Library: GSAP (GreenSock)**
- **Purpose**: High-performance, timeline-based animations
- **Key Easing Functions Used**:
  - `cubic-bezier(.445,.05,.55,.95)` - Smooth ease-in-out
  - `cubic-bezier(.2,0,0,1)` - Custom bezier curves
- **Use Cases**:
  - Text reveal animations
  - Parallax effects
  - Scroll-triggered animations
  - Complex state transitions

---

## Visual Effects & Interactions

### A. **Hero Section Effects**
```
Key Features:
- Large, expressive typography with mask-based reveal animations
- Gradient text overlays with smooth opacity transitions
- Dynamic text that scales with viewport
- Scroll-down indicator with animated dots
- Background that darkens/lightens on scroll
```

**Implementation Strategy**:
- Use SVG masks with animated gradient definitions
- Implement timeline animations for staggered text reveals
- Create responsive typography that scales with `vw` units
- Add scroll-triggered state changes

### B. **Mouse Tracking & Cursor Effects**
```
Observed Effects:
- Custom cursor with dot particles
- Cursor responds to different UI elements
- Hover states change cursor behavior
- Parallax cursor movement
- Dynamic cursor opacity and scaling
```

**Implementation**:
```javascript
// Pseudo-code for mouse tracking
document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  
  // Update custom cursor position
  cursor.style.transform = `translate(${x}px, ${y}px)`;
  
  // Track hover states
  if (isHoveringElement) {
    cursor.classList.add('hover-state');
  }
});
```

### C. **Parallax Scrolling & Media Animation**
```
Effects Observed:
- Media blocks (images/videos) offset based on scroll position
- Text elements have different scroll speeds
- Video containers scale and move on scroll
- Images have configurable negative/positive offsets
```

**Key CSS Classes Found**:
- `.mediaBlock__image.offsetY__negative` - Scrolls faster (negative offset)
- `.mediaBlock__image.offsetY__positive` - Scrolls slower (positive offset)
- `.mediaBlock__image.offsetY__center` - Centered parallax
- `.mediaBlock__image.width__*` - Flexible grid column widths

### D. **Text Reveal Animations**
```
Technique: SVG Mask-based Reveals
- Text wrapped in SVG masks
- Gradient masks animate to reveal text
- Uses CSS transforms and opacity
- Staggered character-by-character reveals
```

**HTML Structure**:
```html
<svg>
  <defs>
    <linearGradient id="gradient">
      <stop offset="0" stop-color="white" stop-opacity="1"></stop>
      <stop offset=".66" stop-color="white" stop-opacity="0"></stop>
    </linearGradient>
    <mask id="gradient-mask">
      <rect fill="url(#gradient)" />
    </mask>
  </defs>
  <g mask="url(#gradient-mask)">
    <!-- Text content -->
  </g>
</svg>
```

### E. **Video/Media Loading & Playback**
```
Features:
- Lazy loading with data-src attributes
- Video poster frames
- Responsive sizing
- Aspect ratio maintenance
- Lazy-loaded GLB 3D models
```

**Attributes Found**:
```html
<img 
  data-src="path/to/video.mp4" 
  data-width="6"
  data-block-index="0"
  data-media-index="0"
/>
```

### F. **Grid System & Responsive Layout**
```
Grid Structure:
- 12-column responsive grid (`.gridWrapper`)
- Padding-aware containers (`.padding`)
- Gap control (`.rowGap`)
- Column span classes (`.width__2` through `.width__10`)
- Position offsets (`.position__1` through `.position__10`)
```

**Responsive Breakpoints**:
- `max-width: 1440px` - Desktop
- `max-width: 1024px` - Tablet
- `max-width: 768px` - Large mobile
- `max-width: 560px` - Small mobile
- `min-width: 2560px` - Ultra-wide screens

### G. **Page Transition Effects**
```
Effects Observed:
- Fade transitions between pages
- Opacity changes with timing
- Visibility toggling for performance
- Fast mode transitions (0.5s vs. 0.7s)
```

**Transition Classes**:
- `.page-default-transition-enter-active` - 0.7s fade in
- `.page-default-transition-leave-active` - Instant fade out
- `.fade-global-enter-active` - 0.3s global fade

---

## Advanced Techniques

### 1. **Three.js Integration**
```javascript
// Canvas setup found in HTML:
<canvas data-engine="three.js r151"></canvas>

// Key capabilities:
- WebGL shaders for custom effects
- 3D model loading (GLTF/GLB)
- Particle systems
- Post-processing effects
- Real-time lighting
```

### 2. **Lenis Scroll Setup**
```javascript
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
```

### 3. **GSAP ScrollTrigger Pattern**
```javascript
gsap.registerPlugin(ScrollTrigger);

gsap.to('.element', {
  scrollTrigger: {
    trigger: '.element',
    start: 'top center',
    end: 'bottom center',
    onEnter: () => { /* animation */ },
    onLeave: () => { /* animation */ },
  },
  duration: 1,
  ease: 'power2.out',
});
```

### 4. **Media Query Utilities (vw Units)**
```css
/* Responsive font sizing */
font-size: 1.9444444444vw; /* Scales with viewport width */

/* Responsive spacing */
padding-bottom: 30vmax;
margin-top: 2.0833333333vw;

/* Breakpoint patterns */
@media (min-width: 1915.2px) {
  font-size: 37.24px;
}
@media (max-width: 1183px) {
  font-size: 23px;
}
```

---

## Implementation Checklist for Your Website

### Phase 1: Foundation Setup
- [ ] Install Lenis for smooth scrolling
- [ ] Integrate GSAP with ScrollTrigger plugin
- [ ] Set up Three.js for 3D graphics
- [ ] Implement responsive grid system (12-column)
- [ ] Create custom cursor system

### Phase 2: Text & Typography Effects
- [ ] Implement SVG mask-based text reveals
- [ ] Add staggered character animations
- [ ] Create responsive typography with vw units
- [ ] Build gradient text overlays
- [ ] Implement text-shadow parallax

### Phase 3: Media & Parallax
- [ ] Set up lazy-loading image system
- [ ] Create parallax offset classes
- [ ] Implement scroll-triggered video playback
- [ ] Add responsive image sizing
- [ ] Build media container animations

### Phase 4: 3D & Advanced Effects
- [ ] Integrate 3D product viewers
- [ ] Create particle systems
- [ ] Implement custom shaders
- [ ] Add 3D model interactions
- [ ] Build post-processing effects

### Phase 5: Page Transitions
- [ ] Create page fade transitions
- [ ] Implement route-based animations
- [ ] Build scroll position preservation
- [ ] Add page loading indicators
- [ ] Optimize performance

---

## Performance Considerations

### Optimization Strategies Found:
1. **Lazy Loading**
   - Images load with `data-src` on scroll
   - 3D models load on demand
   - Lottie animations lazy-rendered

2. **CSS Containment**
   - Elements have `will-change` properties
   - Transforms used for animations (GPU-accelerated)
   - Opacity changes for show/hide

3. **Event Delegation**
   - Mouse events on parent containers
   - Scroll events throttled with Lenis
   - Touch events optimized

4. **Code Splitting**
   - Vue.js component lazy loading
   - Modulepreload for critical JS
   - CSS loaded by component

---

## CSS Custom Properties Pattern

```css
:root {
  --cursor-color: #030303;
  --sound-color: #000;
  --lottie-animation-container-width: 100%;
  --lottie-animation-container-height: 100%;
}

.cursor {
  color: var(--cursor-color);
  transition: color 0.5s cubic-bezier(.445,.05,.55,.95);
}

.cursor.isDark {
  --cursor-color: #e8e8e8;
}
```

---

## Browser Compatibility

The site supports:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Uses modern CSS features:
- CSS Grid
- CSS Custom Properties
- CSS Transforms
- CSS Containment
- SVG Filters & Masks

---

## Recommended Libraries & Tools

### Essential
- **Lenis** (@studio-freight/lenis) - Smooth scrolling
- **GSAP** (gsap) - Animations
- **Three.js** (three) - 3D graphics
- **ScrollTrigger** (gsap plugin) - Scroll-based animations

### Optional Enhancement
- **Framer Motion** - React animations (if using React)
- **Rive** - Animation playback
- **Lottie** - SVG animation playback
- **SplitType** - Advanced text splitting

---

## Example: Hero Section Implementation

```jsx
// React component example
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Text reveal animation
    const splitText = textRef.current.textContent.split('');
    textRef.current.innerHTML = splitText
      .map(char => `<span>${char}</span>`)
      .join('');

    gsap.from(textRef.current.querySelectorAll('span'), {
      opacity: 0,
      y: 10,
      duration: 0.8,
      stagger: 0.02,
      ease: 'power2.out',
    });

    // Parallax on scroll
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom center',
        scrub: 1,
      },
      y: -100,
    });
  }, []);

  return (
    <section ref={containerRef} className="hero">
      <h1 ref={textRef}>Transcend anything seen before</h1>
    </section>
  );
}
```

---

## Next Steps

1. **Review Your Current Stack**: Assess compatibility with new libraries
2. **Start with Lenis**: Implement smooth scrolling first
3. **Add Text Animations**: Use GSAP for hero section
4. **Implement Parallax**: Add media parallax effects
5. **Integrate Three.js**: Add 3D elements for showcase
6. **Optimize & Polish**: Performance tuning and refinement

---

## References & Resources

- Lenis Documentation: https://lenis.studiofreight.com/
- GSAP Docs: https://gsap.com/docs/v3/
- Three.js Docs: https://threejs.org/docs/
- ScrollTrigger Guide: https://gsap.com/docs/v3/Plugins/ScrollTrigger/

---

*Document created on November 20, 2025*
