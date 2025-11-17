# 🎨 Design System - Sweet Shop

## Color Palette

### Primary Colors
```
Purple Primary:   #667eea  rgb(102, 126, 234)
Purple Secondary: #764ba2  rgb(118, 75, 162)
```

### Accent Colors
```
Pink:    #f093fb  rgb(240, 147, 251)
Blue:    #4facfe  rgb(79, 172, 254)
Orange:  #fa709a  rgb(250, 112, 154)
Yellow:  #fee140  rgb(254, 225, 64)
```

### Status Colors
```
Success: #10B981  rgb(16, 185, 129)
Error:   #EF4444  rgb(239, 68, 68)
Warning: #F59E0B  rgb(245, 158, 11)
Info:    #3B82F6  rgb(59, 130, 246)
```

### Neutral Colors
```
Gray 50:  #F9FAFB
Gray 100: #F3F4F6
Gray 200: #E5E7EB
Gray 300: #D1D5DB
Gray 400: #9CA3AF
Gray 500: #6B7280
Gray 600: #4B5563
Gray 700: #374151
Gray 800: #1F2937
Gray 900: #111827
```

## Gradients

### Primary Gradient
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Secondary Gradient
```css
background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
```

### Success Gradient
```css
background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
```

### Warm Gradient
```css
background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
```

## Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
```

### Font Sizes
```
xs:   0.75rem   (12px)
sm:   0.875rem  (14px)
base: 1rem      (16px)
lg:   1.125rem  (18px)
xl:   1.25rem   (20px)
2xl:  1.5rem    (24px)
3xl:  1.875rem  (30px)
4xl:  2.25rem   (36px)
5xl:  3rem      (48px)
6xl:  3.75rem   (60px)
7xl:  4.5rem    (72px)
```

### Font Weights
```
light:     300
normal:    400
medium:    500
semibold:  600
bold:      700
extrabold: 800
black:     900
```

## Spacing Scale

```
0:    0px
1:    0.25rem   (4px)
2:    0.5rem    (8px)
3:    0.75rem   (12px)
4:    1rem      (16px)
5:    1.25rem   (20px)
6:    1.5rem    (24px)
8:    2rem      (32px)
10:   2.5rem    (40px)
12:   3rem      (48px)
16:   4rem      (64px)
20:   5rem      (80px)
24:   6rem      (96px)
```

## Border Radius

```
none:   0px
sm:     0.125rem  (2px)
base:   0.25rem   (4px)
md:     0.375rem  (6px)
lg:     0.5rem    (8px)
xl:     0.75rem   (12px)
2xl:    1rem      (16px)
3xl:    1.5rem    (24px)
full:   9999px
```

## Shadows

### Box Shadows
```css
sm:   0 1px 2px 0 rgb(0 0 0 / 0.05)
base: 0 1px 3px 0 rgb(0 0 0 / 0.1)
md:   0 4px 6px -1px rgb(0 0 0 / 0.1)
lg:   0 10px 15px -3px rgb(0 0 0 / 0.1)
xl:   0 20px 25px -5px rgb(0 0 0 / 0.1)
2xl:  0 25px 50px -12px rgb(0 0 0 / 0.25)
```

## Components

### Buttons

#### Primary Button
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: white;
padding: 0.75rem 1.5rem;
border-radius: 0.75rem;
font-weight: 700;
box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
transition: all 0.3s ease;
```

#### Secondary Button
```css
background: white;
color: #667eea;
border: 2px solid #667eea;
padding: 0.75rem 1.5rem;
border-radius: 0.75rem;
font-weight: 700;
transition: all 0.3s ease;
```

### Cards

#### Glass Card
```css
background: rgba(255, 255, 255, 0.8);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.2);
border-radius: 1.5rem;
box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

#### Product Card
```css
background: white;
border-radius: 1.5rem;
box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
transition: all 0.3s ease;
overflow: hidden;
```

### Inputs

#### Text Input
```css
width: 100%;
padding: 0.75rem 1rem;
border-radius: 0.75rem;
border: 2px solid #E5E7EB;
font-size: 1rem;
transition: all 0.2s ease;
outline: none;
```

#### Focus State
```css
border-color: #667eea;
box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
```

## Animations

### Transitions
```css
transition-all:     all 0.3s ease
transition-colors:  color, background-color 0.3s ease
transition-opacity: opacity 0.3s ease
transition-shadow:  box-shadow 0.3s ease
transition-transform: transform 0.3s ease
```

### Keyframes

#### Spin
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

#### Float
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
```

#### Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Breakpoints

```
sm:   640px   (min-width)
md:   768px   (min-width)
lg:   1024px  (min-width)
xl:   1280px  (min-width)
2xl:  1536px  (min-width)
```

## Usage Examples

### Gradient Text
```jsx
<h1 className="text-4xl font-black gradient-text">
  Welcome to Sweet Shop
</h1>
```

### Glass Card
```jsx
<div className="glass rounded-2xl p-6 shadow-xl">
  Content here
</div>
```

### Primary Button
```jsx
<button className="btn-primary">
  Click Me
</button>
```

### Hover Effect
```jsx
<div className="hover:scale-105 hover:shadow-2xl transition-all duration-300">
  Hover me
</div>
```

### Responsive Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {/* Cards */}
</div>
```

## Icons

Using React Icons (Feather Icons):
```jsx
import { FiHome, FiUser, FiShoppingCart } from 'react-icons/fi';

<FiHome className="text-xl" />
<FiUser className="text-2xl text-primary-600" />
<FiShoppingCart className="text-lg text-white" />
```

## Best Practices

### Do's ✅
- Use consistent spacing (multiples of 4px)
- Apply hover effects to interactive elements
- Use semantic color names
- Maintain consistent border radius
- Add transitions for smooth interactions
- Use gradients for visual interest
- Apply shadows for depth
- Keep text readable (contrast ratio)

### Don'ts ❌
- Mix different spacing scales
- Use too many colors
- Forget hover states
- Ignore mobile responsiveness
- Use inline styles (use Tailwind)
- Forget accessibility
- Overuse animations
- Ignore loading states

## Accessibility

### Color Contrast
- Text on white: Use gray-700 or darker
- Text on colored backgrounds: Use white
- Links: Ensure 4.5:1 contrast ratio
- Buttons: Clear focus indicators

### Focus States
```css
focus:outline-none
focus:ring-4
focus:ring-primary-100
focus:border-primary-500
```

### Touch Targets
- Minimum size: 44px × 44px
- Adequate spacing between elements
- Clear visual feedback

## Performance

### Optimization Tips
- Use Tailwind's purge feature
- Lazy load images
- Minimize custom CSS
- Use CSS transforms for animations
- Avoid layout shifts
- Optimize font loading

---

This design system ensures consistency, maintainability, and a professional look throughout the application! 🎨✨
