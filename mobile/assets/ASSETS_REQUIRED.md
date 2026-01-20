# Required App Assets

Before building for iOS, you'll need to create the following assets:

## App Icon (`icon.png`)

- **Size**: 1024x1024px
- **Format**: PNG
- **Requirements**:
  - No transparency
  - Square format
  - High resolution
  - Should look good at small sizes
  - Follow Apple's Human Interface Guidelines

## Splash Screen (`splash.png`)

- **Size**: 2732x2732px (recommended for all devices)
- **Format**: PNG
- **Background Color**: #000000 (black)
- **Requirements**:
  - Should contain your app logo/name
  - Centered design
  - Works in both light and dark mode (currently using dark)

## Adaptive Icon (`adaptive-icon.png`) - Android only

- **Size**: 1024x1024px
- **Format**: PNG
- **Background Color**: #000000 (black)
- **Requirements**:
  - Safe zone: 66% center area (will be cropped on some devices)
  - No transparency

## Favicon (`favicon.png`) - Web only

- **Size**: 48x48px or 32x32px
- **Format**: PNG or ICO
- **Requirements**:
  - Simple, recognizable icon
  - Works at small sizes

## Quick Placeholder Generation

You can create simple placeholder assets using:

1. **Online Tools**:
   - [AppIcon.co](https://www.appicon.co/) - Generate all sizes
   - [IconKitchen](https://icon.kitchen/) - Android adaptive icons
   - [Figma](https://figma.com) - Design tool

2. **Command Line** (requires ImageMagick):
   ```bash
   # Create a simple black square with green text
   convert -size 1024x1024 xc:black -pointsize 200 -fill "#10B981" \
     -gravity center -annotate +0+0 "P" icon.png
   ```

3. **Design Guidelines**:
   - Use the Protocol color scheme: Black (#000000), White (#FFFFFF), Green (#10B981)
   - Keep it simple and recognizable
   - Test at different sizes to ensure readability

## Current Status

⚠️ **Assets are currently missing** - You'll need to create these before building for production.

For development/testing, Expo will use default placeholders, but you should create proper assets before submitting to the App Store.
