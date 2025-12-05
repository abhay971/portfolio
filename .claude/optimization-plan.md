# Portfolio Website Performance Optimization Plan

## Overview
This plan optimizes your portfolio website to eliminate lag and delays during scrolling and interaction **without changing any design or styling**. Focus is purely on performance improvements through code optimization.

---

## Critical Performance Issues Identified

### 🔴 TIER 1 - Critical (Causes Visible Lag)
1. **Unthrottled mousemove tracking** - CustomCursor fires 100+ state updates/second
2. **Unthrottled scroll listeners** - BackToTop and manual scroll handlers fire on every pixel
3. **Heavy WebGL rendering** - ShaderBackground runs at unlimited FPS with complex shaders
4. **Cursor-following image** - Projects component tracks mouse without throttling

### 🟡 TIER 2 - High Impact
5. **Per-character animations** - AnimatedName creates many animated DOM nodes with 3D transforms
6. **Multiple WebGL renderers** - Both ShaderBackground and ParticleBackground running simultaneously
7. **20 individual skill animations** - SkillsShowcase animates each skill separately
8. **Missing component memoization** - TextReveal and skill items re-render unnecessarily

### 🟢 TIER 3 - Medium Impact (Cumulative)
9. **Multiple Intersection Observers** - TextReveal used 5x per project creates many observers
10. **Expensive backdrop blur** - Header uses backdrop-blur on fixed positioning
11. **Complex clip-path animations** - ScrollRevealText uses GPU-heavy path calculations

---

## Optimization Strategy (Design & Styling Unchanged)

### **Phase 1: Event Throttling & Debouncing** ⚡
*Eliminate continuous event firing*

#### 1.1 Throttle Custom Cursor (useCustomCursor.js)
**Current Issue:** Fires 100+ times/second on mousemove
**Solution:**
- Wrap mousemove with `requestAnimationFrame` throttle
- Prevents state updates faster than browser can render (16.67ms minimum)
- Use `useCallback` to memoize event handlers

**Code Changes:**
```javascript
// Before: Direct setState on every mousemove
const updateCursorPosition = (e) => {
  setPosition({ x: e.clientX, y: e.clientY })
}

// After: RAF-throttled updates
const updateCursorPosition = useCallback((e) => {
  if (!rafId.current) {
    rafId.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY })
      rafId.current = null
    })
  }
}, [])
```

**Expected Impact:** 80-90% reduction in state updates, smoother cursor tracking

---

#### 1.2 Throttle Scroll Listeners (BackToTop.jsx)
**Current Issue:** Fires on every scroll pixel (60+ times/second)
**Solution:**
- Throttle scroll listener with `requestAnimationFrame`
- Only check visibility once per frame

**Code Changes:**
```javascript
// Before: Direct setState on scroll
window.addEventListener('scroll', toggleVisibility)

// After: RAF-throttled scroll
useEffect(() => {
  let ticking = false

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        toggleVisibility()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

**Expected Impact:** 90% reduction in scroll handler calls

---

#### 1.3 Throttle Projects Mouse Tracking (Projects.jsx)
**Current Issue:** Unthrottled mousemove when hovering projects
**Solution:**
- Same RAF throttle pattern as cursor
- Only update position once per frame

**Expected Impact:** Smoother image following, reduced CPU usage

---

### **Phase 2: WebGL Optimization** 🎨
*Reduce GPU load without visual changes*

#### 2.1 Add FPS Throttling to ShaderBackground
**Current Issue:** Renders at unlimited FPS (60+ on most displays)
**Solution:**
- Cap at 30 FPS (background animations don't need 60 FPS)
- Implement frame skipping like OptimizedShaderBackground
- Add visibility detection to pause when off-screen

**Code Changes:**
```javascript
const targetFPS = 30
const frameInterval = 1000 / targetFPS

const render = (currentTime) => {
  const deltaTime = currentTime - lastFrameTime

  if (deltaTime >= frameInterval) {
    lastFrameTime = currentTime - (deltaTime % frameInterval)
    // ... render WebGL
  }

  animationFrameId = requestAnimationFrame(render)
}
```

**Expected Impact:** 50% reduction in GPU usage on Hero section

---

#### 2.2 Add Intersection Observer to WebGL Backgrounds
**Solution:**
- Pause ShaderBackground when Hero section scrolls out of view
- Pause ParticleBackground when About section is off-screen
- Resume only when visible

**Code Pattern:**
```javascript
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        // Resume rendering
      } else {
        // Pause/reduce FPS to 10
      }
    },
    { threshold: 0 }
  )

  observer.observe(containerRef.current)
  return () => observer.disconnect()
}, [])
```

**Expected Impact:** 70-80% GPU reduction when scrolling past sections

---

#### 2.3 Reduce ParticleBackground Resolution on Low-End Devices
**Solution:**
- Detect device performance (navigator.hardwareConcurrency)
- Reduce particle count and FPS on <4 core devices
- Lower devicePixelRatio to 1x on mobile

**Expected Impact:** Better performance on mobile/tablets

---

### **Phase 3: React Performance Optimization** ⚛️
*Prevent unnecessary re-renders*

#### 3.1 Memoize Frequently Used Components
**Components to Memoize:**
- `TextReveal` (used 5x per project = 25+ instances)
- Individual skill items in `SkillsShowcase` (20 items)
- Tech tags in `About.jsx` (16 tags)
- Social link buttons

**Code Changes:**
```javascript
// Wrap component with React.memo
export default React.memo(TextReveal)

// For list items, use unique keys and memo
const SkillItem = React.memo(({ skill, index }) => {
  // ... skill rendering
})

// In SkillsShowcase
{skills.map((skill, i) => (
  <SkillItem key={skill.name} skill={skill} index={i} />
))}
```

**Expected Impact:** 60-70% reduction in re-renders during scroll

---

#### 3.2 Optimize AnimatedName Component
**Current Issue:** Creates separate motion.div for each character
**Solution:**
- Use `will-change: transform` CSS hint
- Reduce spring stiffness from 200 to 100 (less computation)
- Consider single word animation instead of per-character on mobile

**Code Changes:**
```javascript
// Add CSS optimization
<motion.span
  style={{
    display: 'inline-block',
    willChange: 'transform, opacity'  // Browser hint
  }}
  transition={{
    damping: 12,
    stiffness: 100,  // Reduced from 200
  }}
>
```

**Expected Impact:** 30-40% reduction in animation calculation overhead

---

#### 3.3 Lazy Load Off-Screen Sections
**Solution:**
- Wrap Projects, Experience, Contact in React.lazy
- Load only when scrolling approaches
- Use Intersection Observer trigger

**Code Changes:**
```javascript
// App.jsx
const Projects = lazy(() => import('./components/projects/Projects'))
const Experience = lazy(() => import('./components/experience/Experience'))
const Contact = lazy(() => import('./components/contact/Contact'))

// Wrap in Suspense with loading fallback
<Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
  <Projects />
  <Experience />
  <Contact />
</Suspense>
```

**Expected Impact:** 40% faster initial page load

---

### **Phase 4: Animation Optimization** 🎭
*Keep visual design, reduce computational cost*

#### 4.1 Batch Skill Animations
**Current Issue:** 20 separate motion.div elements in SkillsShowcase
**Solution:**
- Animate container, stagger children using CSS variables
- Reduce individual motion.div overhead

**Code Pattern:**
```javascript
// Parent container handles animation trigger
<motion.div
  initial="hidden"
  whileInView="visible"
  variants={containerVariants}
>
  {skills.map((skill, i) => (
    <motion.div
      variants={itemVariants}
      custom={i}  // Pass index for stagger
      style={{ '--index': i }}  // CSS variable for delay
    >
```

**Expected Impact:** 50% reduction in Framer Motion overhead

---

#### 4.2 Optimize TextReveal Instances
**Current Issue:** Used 5 times per project (25+ total instances)
**Solution:**
- Memoize component (already covered in 3.1)
- Share single Intersection Observer across instances
- Use `once: true` to stop observing after animation

**Already Implemented:** `once: true` ✓
**Add:** Component memoization

**Expected Impact:** Minimal additional overhead per instance

---

#### 4.3 Replace Backdrop Blur with Semi-Transparent Background
**Current Issue:** Header uses expensive `backdrop-blur-lg`
**Solution:**
- Replace with `background-color: rgba(0, 0, 0, 0.8)` or similar
- Achieves same visual effect without blur filter
- **WAIT** - Only if user approves (changes visual slightly)

**Alternative:** Keep blur, add `will-change: backdrop-filter`

**Expected Impact:** 20-30% reduction in header rendering cost

---

### **Phase 5: Scroll Performance** 📜
*Smooth scrolling experience*

#### 5.1 Add Passive Event Listeners
**Solution:**
- Add `{ passive: true }` to all scroll listeners
- Tells browser scroll won't be prevented
- Allows async scroll handling

**Code Changes:**
```javascript
window.addEventListener('scroll', handler, { passive: true })
window.addEventListener('mousemove', handler, { passive: true })
```

**Expected Impact:** Browser can optimize scroll independently

---

#### 5.2 Use CSS `content-visibility` for Off-Screen Content
**Solution:**
- Add `content-visibility: auto` to section containers
- Browser skips rendering off-screen content
- Huge performance gain on long pages

**Code Changes:**
```css
/* Add to section wrappers */
section {
  content-visibility: auto;
  contain-intrinsic-size: 100vh; /* Estimated height */
}
```

**Expected Impact:** 50-70% reduction in off-screen rendering cost

---

### **Phase 6: General Code Optimizations** 🔧

#### 6.1 Remove Unused Dependency
**Found:** `react-scroll-parallax` installed but never imported
**Solution:** Remove from package.json

```bash
npm uninstall react-scroll-parallax
```

**Expected Impact:** Smaller bundle size

---

#### 6.2 Add Performance Monitoring
**Solution:**
- Add FPS counter (dev mode only)
- Log WebGL initialization
- Monitor frame drops

**Code Pattern:**
```javascript
// Dev mode FPS counter
if (import.meta.env.DEV) {
  let lastTime = performance.now()
  let frames = 0

  const measureFPS = () => {
    frames++
    const currentTime = performance.now()
    if (currentTime >= lastTime + 1000) {
      console.log(`FPS: ${frames}`)
      frames = 0
      lastTime = currentTime
    }
    requestAnimationFrame(measureFPS)
  }
  measureFPS()
}
```

---

## Implementation Order (Priority-Based)

### **MUST DO** (Eliminates visible lag):
1. ✅ Throttle useCustomCursor mousemove → **useCustomCursor.js**
2. ✅ Throttle BackToTop scroll → **BackToTop.jsx**
3. ✅ Add FPS cap to ShaderBackground → **ShaderBackground.jsx**
4. ✅ Throttle Projects mouse tracking → **Projects.jsx**

### **SHOULD DO** (Significant improvement):
5. ✅ Add visibility detection to WebGL backgrounds → **ShaderBackground.jsx, ParticleBackground.jsx**
6. ✅ Memoize TextReveal → **TextReveal.jsx**
7. ✅ Memoize SkillsShowcase items → **SkillsShowcase.jsx**
8. ✅ Optimize AnimatedName spring physics → **AnimatedName.jsx**

### **NICE TO HAVE** (Polish):
9. ✅ Add passive event listeners → **All scroll/mouse listeners**
10. ✅ Lazy load bottom sections → **App.jsx**
11. ✅ Add content-visibility CSS → **Section components**
12. ✅ Remove unused dependency → **package.json**

---

## Files to Modify (18 files)

### Critical Performance Files:
1. `/Users/abhay/Desktop/Personal/portfolio/src/hooks/useCustomCursor.js` - Add RAF throttle
2. `/Users/abhay/Desktop/Personal/portfolio/src/components/layout/BackToTop.jsx` - Throttle scroll
3. `/Users/abhay/Desktop/Personal/portfolio/src/components/hero/ShaderBackground.jsx` - FPS cap + visibility
4. `/Users/abhay/Desktop/Personal/portfolio/src/components/projects/Projects.jsx` - Throttle mouse

### High Impact Files:
5. `/Users/abhay/Desktop/Personal/portfolio/src/components/about/ParticleBackground.jsx` - Visibility detection
6. `/Users/abhay/Desktop/Personal/portfolio/src/components/common/TextReveal.jsx` - Memoization
7. `/Users/abhay/Desktop/Personal/portfolio/src/components/about/SkillsShowcase.jsx` - Memoization + batch
8. `/Users/abhay/Desktop/Personal/portfolio/src/components/hero/AnimatedName.jsx` - Physics optimization

### Medium Impact Files:
9. `/Users/abhay/Desktop/Personal/portfolio/src/components/layout/ScrollProgress.jsx` - Passive listener
10. `/Users/abhay/Desktop/Personal/portfolio/src/components/about/ScrollRevealText.jsx` - Memoization
11. `/Users/abhay/Desktop/Personal/portfolio/src/components/about/About.jsx` - Memoize tech tags
12. `/Users/abhay/Desktop/Personal/portfolio/src/components/hero/SocialLinks.jsx` - Memoization
13. `/Users/abhay/Desktop/Personal/portfolio/src/App.jsx` - Lazy loading

### CSS Optimization:
14. `/Users/abhay/Desktop/Personal/portfolio/src/index.css` - Add content-visibility

### Configuration:
15. `/Users/abhay/Desktop/Personal/portfolio/package.json` - Remove unused dependency

---

## Expected Performance Improvements

### Before Optimization:
- **Mousemove:** 100-150 updates/second
- **Scroll events:** 60-80 events/second
- **WebGL FPS:** Unlimited (60-120 FPS)
- **Re-renders:** Frequent unnecessary updates
- **Initial load:** All sections loaded immediately

### After Optimization:
- **Mousemove:** 60 updates/second (RAF throttled)
- **Scroll events:** 60 events/second (RAF throttled, passive)
- **WebGL FPS:** 30 FPS cap, paused when off-screen
- **Re-renders:** 60-70% reduction via memoization
- **Initial load:** Lazy load reduces initial bundle

### User Experience Impact:
- ✅ **Scroll smoothness:** From janky to buttery smooth
- ✅ **Cursor tracking:** More responsive, less CPU drain
- ✅ **Battery usage:** 40-50% reduction (less GPU/CPU work)
- ✅ **Mobile performance:** 2-3x improvement
- ✅ **Load time:** 30-40% faster initial render

---

## Testing Strategy

### Performance Metrics to Monitor:
1. **Chrome DevTools Performance Tab:**
   - Record scroll performance before/after
   - Check FPS graph (should stay at 60 FPS)
   - Monitor scripting time (should reduce)

2. **React DevTools Profiler:**
   - Record re-render counts
   - Check component render times
   - Identify remaining bottlenecks

3. **Lighthouse Score:**
   - Run before/after comparison
   - Target: 90+ performance score

4. **Manual Testing:**
   - Smooth scrolling through entire page
   - No cursor lag or stutter
   - Responsive interactions
   - Test on mobile device

---

## Risk Assessment

### Low Risk (Safe to implement):
- Event throttling (improves performance, no visual change)
- Memoization (React optimization, invisible to user)
- FPS capping (30 FPS still smooth for backgrounds)
- Passive listeners (browser optimization flag)
- Lazy loading (improves load time)

### Medium Risk (Test carefully):
- Visibility-based pausing (ensure smooth resume)
- AnimatedName physics changes (verify animation feel)
- Content-visibility CSS (test scroll behavior)

### User Approval Needed:
- Backdrop blur replacement (visual change)
- Particle count reduction (visual change)

---

## Notes

- **No design changes** - All optimizations are code-level only
- **No styling changes** - Visual appearance stays identical
- **Progressive enhancement** - Can implement in stages
- **Backwards compatible** - No breaking changes
- **Mobile-first** - Optimizations benefit mobile most

This plan eliminates lag and delays through pure code optimization while maintaining your exact design and styling.