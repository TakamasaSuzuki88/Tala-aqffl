# Mandala 3D Website - UI/UX Specifications

## Design System

### Brand Identity

#### Logo
```
     ★
   ★   ★      Mandala3D
 ★   ◆   ★    Create • Explore • Share
   ★   ★
     ★
```
- **Primary Mark**: Animated 3D mandala icon
- **Wordmark**: "Mandala3D" in custom geometric font
- **Tagline**: "Create • Explore • Share"

#### Color Palette

##### Primary Colors
```scss
$primary-gradient-1: #667EEA;  // Indigo
$primary-gradient-2: #764BA2;  // Purple
$primary-accent:     #F093FB;  // Pink
$primary-dark:       #2D3561;  // Dark Blue
```

##### Secondary Colors
```scss
$secondary-teal:     #4ECDC4;
$secondary-coral:    #FF6B6B;
$secondary-yellow:   #FFE66D;
$secondary-mint:     #95E1D3;
```

##### Neutral Colors
```scss
$neutral-900: #1A1A2E;  // Near Black
$neutral-800: #16213E;  // Dark Gray
$neutral-700: #3E4C59;  // Gray
$neutral-500: #6B7280;  // Medium Gray
$neutral-300: #D1D5DB;  // Light Gray
$neutral-100: #F3F4F6;  // Off White
$neutral-000: #FFFFFF;  // White
```

### Typography

#### Font Stack
```css
/* Headings */
font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;

/* Body Text */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Code/Technical */
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```

#### Type Scale
```scss
// Desktop
$h1: 48px / 56px / 700;   // size / line-height / weight
$h2: 36px / 44px / 600;
$h3: 28px / 36px / 600;
$h4: 24px / 32px / 500;
$h5: 20px / 28px / 500;
$body-lg: 18px / 28px / 400;
$body: 16px / 24px / 400;
$body-sm: 14px / 20px / 400;
$caption: 12px / 16px / 400;

// Mobile (scaled down 15%)
$h1-mobile: 40px / 48px / 700;
$h2-mobile: 32px / 40px / 600;
// etc.
```

### Spacing System

```scss
$space-unit: 8px;
$space-xs:   $space-unit * 0.5;  // 4px
$space-sm:   $space-unit * 1;    // 8px
$space-md:   $space-unit * 2;    // 16px
$space-lg:   $space-unit * 3;    // 24px
$space-xl:   $space-unit * 4;    // 32px
$space-2xl:  $space-unit * 6;    // 48px
$space-3xl:  $space-unit * 8;    // 64px
```

### Component Library

#### Buttons

##### Primary Button
```jsx
<Button variant="primary" size="large">
  Create Mandala
</Button>
```
Style:
- Background: Linear gradient (primary-gradient-1 to primary-gradient-2)
- Text: White, bold
- Padding: 16px 32px
- Border-radius: 12px
- Shadow: 0 4px 14px rgba(102, 126, 234, 0.4)
- Hover: Scale(1.02), enhanced shadow
- Active: Scale(0.98)

##### Secondary Button
```jsx
<Button variant="secondary" size="medium">
  Browse Templates
</Button>
```
Style:
- Background: Transparent
- Border: 2px solid primary-gradient-1
- Text: primary-gradient-1
- Hover: Background fills with gradient

##### Icon Button
```jsx
<IconButton icon={<Heart />} aria-label="Like" />
```
Style:
- Size: 40px × 40px
- Background: neutral-100 (light mode)
- Hover: Primary color background
- Active: Animated scale bounce

#### Cards

##### Mandala Card
```jsx
<MandalaCard>
  <CardMedia src="mandala.jpg" />
  <CardContent>
    <CardTitle>Cosmic Harmony</CardTitle>
    <CardStats likes={142} views={1.2k} />
  </CardContent>
  <CardActions>
    <IconButton icon={<Heart />} />
    <IconButton icon={<Share />} />
  </CardActions>
</MandalaCard>
```
Style:
- Background: White with subtle shadow
- Border-radius: 16px
- Hover: Elevate with shadow, show actions
- Image aspect ratio: 1:1
- Padding: 16px

#### Forms

##### Input Field
```jsx
<TextField 
  label="Mandala Name"
  placeholder="Enter a name..."
  helperText="Choose something memorable"
/>
```
Style:
- Height: 48px
- Border: 1px solid neutral-300
- Focus: 2px primary-gradient-1 border
- Border-radius: 8px
- Label: 14px, neutral-700
- Transition: All 200ms ease

##### Slider
```jsx
<Slider 
  label="Complexity"
  min={1} 
  max={10}
  value={5}
  marks
/>
```
Style:
- Track: 4px height, neutral-300
- Fill: Gradient (primary colors)
- Thumb: 20px circle, white with shadow
- Marks: Show at each integer

## Layout Specifications

### Grid System

```scss
// Desktop (1440px)
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 80px;
  
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

// Tablet (768px - 1439px)
@media (max-width: 1439px) {
  .container {
    padding: 0 40px;
    grid-template-columns: repeat(8, 1fr);
    gap: 20px;
  }
}

// Mobile (< 768px)
@media (max-width: 767px) {
  .container {
    padding: 0 16px;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
}
```

### Navigation Header

#### Desktop Layout
```
┌──────────────────────────────────────────────────────────────────────┐
│  80px padding                                                  80px  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Logo  Create  Explore  Templates  Community  Learn    User  │  │
│  │ 160px  [               Center Nav 600px            ]  120px │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Height: 72px
- Background: White/Dark with backdrop-filter: blur(10px)
- Shadow: 0 2px 8px rgba(0, 0, 0, 0.08)
- Position: Sticky top
- Z-index: 1000

#### Mobile Layout
```
┌──────────────────────────────┐
│ ☰  Mandala3D         👤  │  Height: 56px
└──────────────────────────────┘
┌──────────────────────────────┐
│ Create                      │  Slide-out menu
│ Explore                     │  Width: 280px
│ Templates                   │  Animation: 300ms
│ Community                   │
│ Learn                       │
└──────────────────────────────┘
```

### Creator Interface

#### Layout Structure
```
┌────────────────────────────────────────────────────────────────────┐
│  Toolbar (56px)                                                   │
│  [Undo] [Redo] | [Select] [Move] [Rotate] | [Save] [Export]      │
├──────────────┬──────────────────────────────────────┬────────────────┤
│              │                                      │                │
│   Tools      │          3D Viewport                 │   Parameters   │
│   Panel      │                                      │   Panel        │
│              │      [Canvas: 800×800px]            │                │
│   (80px)     │                                      │   (320px)      │
│              │                                      │                │
│ [🖍] Brush   │                                      │ Complexity [5] │
│ [▲] Shape    │                                      │ Symmetry   [8] │
│ [🎨] Color   │                                      │ Layers     [3] │
│ [✨] Effects │                                      │ Animation [✓]  │
│              │                                      │                │
├──────────────┴──────────────────────────────────────┴────────────────┤
│  Timeline/Layers (120px)                                          │
│  [Layer 1] [Layer 2] [Layer 3] [+]                                │
└────────────────────────────────────────────────────────────────────┘
```

#### 3D Viewport Controls
- **Orbit**: Left click + drag
- **Pan**: Right click + drag / Middle mouse
- **Zoom**: Scroll wheel / Pinch gesture
- **Reset View**: Double click
- **Fullscreen**: F key / Button

### Gallery/Explore Page

#### Grid Layout
```
┌────────────────────────────────────────────────────────────┐
│  Filter Bar                                                  │
│  [All] [Trending] [New] [Following] | [Style ▼] [Color ▼]   │
├────────────────────────────────────────────────────────────┤
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ │
│  │            │ │            │ │            │ │            │ │
│  │  Mandala   │ │  Mandala   │ │  Mandala   │ │  Mandala   │ │
│  │    Card    │ │    Card    │ │    Card    │ │    Card    │ │
│  │            │ │            │ │            │ │            │ │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘ │
│                                                              │
│  Grid: 4 columns (desktop), 2 (tablet), 1 (mobile)          │
│  Gap: 24px (desktop), 16px (mobile)                         │
│  Card aspect ratio: 1:1                                     │
└────────────────────────────────────────────────────────────┘
```

## Interaction Patterns

### Hover States

#### Navigation Items
- Text color: primary-gradient-1
- Underline animation: 2px, slide in from left
- Transition: 200ms ease

#### Cards
- Transform: translateY(-4px)
- Shadow: 0 8px 24px rgba(0, 0, 0, 0.12)
- Show overlay actions (like, share)
- Transition: 300ms ease

#### Buttons
- Primary: Scale(1.02), enhanced shadow
- Secondary: Background fill animation
- Icon: Rotate 15deg for settings, scale for others

### Loading States

#### Skeleton Screens
```jsx
<SkeletonCard>
  <SkeletonImage />     // Animated shimmer
  <SkeletonText lines={2} />
  <SkeletonActions />
</SkeletonCard>
```

#### Progress Indicators
- Linear progress for exports
- Circular progress for generation
- Percentage text display
- Estimated time remaining

### Animations

#### Page Transitions
```css
/* Fade and slide */
@keyframes pageEnter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* Duration: 400ms, ease-out */
```

#### Micro-interactions
- Like button: Heart burst animation
- Share button: Ripple effect
- Generate button: Pulse while processing
- Success: Check mark draw animation
- Error: Shake animation

### Modal Dialogs

#### Structure
```jsx
<Modal>
  <ModalOverlay />      // Dark backdrop, blur
  <ModalContent>        // White container, centered
    <ModalHeader />
    <ModalBody />
    <ModalFooter>
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Confirm</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

#### Specifications
- Max width: 600px
- Padding: 32px
- Border-radius: 24px
- Animation: Scale + fade in
- Backdrop: rgba(0, 0, 0, 0.5) with blur(4px)

## Responsive Breakpoints

### Breakpoint Values
```scss
$breakpoint-mobile:  320px;   // Minimum supported
$breakpoint-tablet:  768px;   // iPad portrait
$breakpoint-desktop: 1024px;  // Small desktop
$breakpoint-wide:    1440px;  // Standard desktop
$breakpoint-ultra:   1920px;  // Large monitors
```

### Adaptive Behaviors

#### Mobile (320px - 767px)
- Single column layouts
- Bottom navigation bar
- Collapsed menus
- Touch-optimized controls
- Simplified creator interface

#### Tablet (768px - 1023px)
- 2-column grid for gallery
- Side panel navigation
- Floating action buttons
- Mixed touch/mouse controls

#### Desktop (1024px+)
- Multi-column layouts
- Full navigation header
- Advanced creator tools
- Keyboard shortcuts
- Hover interactions

## Accessibility Specifications

### Focus Management
```css
/* Focus visible styles */
:focus-visible {
  outline: 2px solid $primary-gradient-1;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Skip to content link */
.skip-to-content {
  position: absolute;
  left: -9999px;
  
  &:focus {
    left: 50%;
    transform: translateX(-50%);
    top: 10px;
    z-index: 9999;
  }
}
```

### ARIA Labels
```jsx
<button 
  aria-label="Like this mandala"
  aria-pressed={isLiked}
  role="button"
>
  <HeartIcon aria-hidden="true" />
  <span className="sr-only">142 likes</span>
</button>
```

### Keyboard Navigation
- Tab: Navigate through interactive elements
- Enter/Space: Activate buttons
- Arrow keys: Navigate galleries, adjust sliders
- Escape: Close modals, cancel operations
- Shortcuts: Cmd+S (save), Cmd+E (export), etc.

## Dark Mode Specifications

### Color Overrides
```scss
// Dark mode palette
[data-theme="dark"] {
  --bg-primary: #1A1A2E;
  --bg-secondary: #16213E;
  --text-primary: #F3F4F6;
  --text-secondary: #D1D5DB;
  --border: #3E4C59;
  
  // Inverted shadows
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.6);
}
```

### Component Adaptations
- Cards: Dark background with subtle borders
- Inputs: Dark background, light text
- 3D Viewport: Dark grid, adjustable brightness
- Modals: Dark with increased contrast

## Performance Optimizations

### Image Loading
```jsx
<MandalaImage
  src="mandala-full.jpg"
  placeholder="mandala-blur.jpg"  // Base64 blur
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 25vw"
  srcSet="
    mandala-400.jpg 400w,
    mandala-800.jpg 800w,
    mandala-1200.jpg 1200w
  "
/>
```

### Code Splitting
```javascript
// Lazy load heavy components
const Editor3D = lazy(() => import('./Editor3D'));
const ExportModal = lazy(() => import('./ExportModal'));
const Analytics = lazy(() => import('./Analytics'));
```

### CSS Optimizations
- Critical CSS inline
- Unused CSS removal
- CSS modules for scoping
- PostCSS for autoprefixing
- PurgeCSS for production

## Component States

### Button States
1. **Default**: Base styling
2. **Hover**: Enhanced visual feedback
3. **Active**: Pressed appearance
4. **Focus**: Keyboard navigation indicator
5. **Disabled**: Reduced opacity, no pointer events
6. **Loading**: Show spinner, disable interaction

### Input States
1. **Empty**: Placeholder text
2. **Focused**: Border highlight
3. **Filled**: User content
4. **Error**: Red border, error message
5. **Success**: Green check indicator
6. **Disabled**: Grayed out

### Card States
1. **Default**: Base appearance
2. **Hover**: Elevated, show actions
3. **Selected**: Border highlight
4. **Loading**: Skeleton screen
5. **Error**: Error message overlay

## Design Tokens

```json
{
  "color": {
    "primary": "#667EEA",
    "secondary": "#4ECDC4",
    "success": "#48BB78",
    "warning": "#F6AD55",
    "error": "#FC8181",
    "neutral": {
      "50": "#F9FAFB",
      "100": "#F3F4F6",
      "200": "#E5E7EB",
      "300": "#D1D5DB",
      "400": "#9CA3AF",
      "500": "#6B7280",
      "600": "#4B5563",
      "700": "#374151",
      "800": "#1F2937",
      "900": "#111827"
    }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px",
    "2xl": "48px",
    "3xl": "64px"
  },
  "borderRadius": {
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "xl": "16px",
    "2xl": "24px",
    "full": "9999px"
  },
  "shadow": {
    "sm": "0 1px 2px rgba(0, 0, 0, 0.05)",
    "md": "0 4px 6px rgba(0, 0, 0, 0.07)",
    "lg": "0 10px 15px rgba(0, 0, 0, 0.1)",
    "xl": "0 20px 25px rgba(0, 0, 0, 0.1)"
  },
  "animation": {
    "duration": {
      "fast": "200ms",
      "normal": "300ms",
      "slow": "500ms"
    },
    "easing": {
      "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
      "easeOut": "cubic-bezier(0, 0, 0.2, 1)",
      "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)"
    }
  }
}
```