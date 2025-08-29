# 🖼️ Image Caption Components

This document explains how to use the componentized image caption system in your portfolio projects.

## Basic Usage

### Default Image Caption
```html
<figcaption class="image-caption">
    Dashboard tracking user interactions with conversational AI, revealing patterns in prompt usage.
</figcaption>
```
**Output:** **Image:** Dashboard tracking user interactions with conversational AI, revealing patterns in prompt usage.

## Caption Styling

All image captions automatically include "**Image:**" as a prefix. The system uses a consistent approach where every caption starts with "Image:" followed by your description text.

## Caption Size

All image captions use a consistent size of `1.25rem` for optimal readability across all images.

## Alignment Variants

### Left-Aligned Caption
```html
<figcaption class="image-caption image-caption--left">
    Caption aligned to the left.
</figcaption>
```

### Right-Aligned Caption
```html
<figcaption class="image-caption image-caption--right">
    Caption aligned to the right.
</figcaption>
```

## Style Variants

### Non-Italic Caption
```html
<figcaption class="image-caption image-caption--no-italic">
    Caption without italic styling.
</figcaption>
```

### Bold Caption
```html
<figcaption class="image-caption image-caption--bold">
    Caption with bold text.
</figcaption>
```

## Source Attribution

### Caption with Source
```html
<figcaption class="image-caption image-caption--with-source" data-source="User Research Study, 2024">
    User interview insights from the discovery phase.
</figcaption>
```
**Output:** **Image:** User interview insights from the discovery phase. (Source: User Research Study, 2024)

## Combining Multiple Classes

You can combine multiple classes for more specific styling:

```html
<figcaption class="image-caption image-caption--left image-caption--no-italic">
    Comprehensive analytics showing user behavior patterns across different segments.
</figcaption>
```

## Complete Example

```html
<div class="image-container">
    <figcaption class="image-caption">
        Dashboard tracking user interactions with conversational AI, revealing patterns in prompt usage.
    </figcaption>
    <div class="image-wrapper" data-zoom="true">
        <img src="../assets/images/AI/prompts.jpeg" 
             alt="Dashboard showing AI interaction patterns" 
             class="interactive-image"
             loading="lazy">
        <div class="image-overlay">
            <button class="zoom-btn" title="Click to zoom">🔍</button>
        </div>
    </div>
</div>
```

## Available Classes Summary

### Alignment Classes
- `image-caption--left`
- `image-caption--right`

### Style Classes
- `image-caption--no-italic`
- `image-caption--bold`
- `image-caption--with-source`

## Best Practices

1. **Consider alignment** based on your layout needs
2. **Add source attribution** when using external images or data
3. **Keep descriptions concise** but informative
4. **Combine classes thoughtfully** to achieve the desired styling
