# css-hash- 🧩 Simple API for composing class names
- 🖥️ Server-side rendering (SSR) compatible
- 🔄 Works in both ESM and CommonJS environments
- 📘 TypeScript definitions included lightweight CSS-in-JS library for styling React components with auto-generated class names. 
Generate deterministic class names based on your CSS content and inject styles directly into the document.

## Features

- 🔍 Generates unique hash-based class names from your CSS
- 📝 Write regular CSS strings without additional syntax or preprocessors
- 🎯 Deterministic class name generation for identical CSS content
- 💾 Built-in caching for improved performance
- 🧩 Simple API for composing class names
- �️ Server-side rendering (SSR) compatible
- �🔄 Works in both ESM and CommonJS environments
- � TypeScript definitions included
- 🚀 Zero dependencies
- 📦 Small bundle size (less than 2KB minified and gzipped)

## Installation

```bash
# Using npm
npm install css-hash

# Using yarn
yarn add css-hash

# Using pnpm
pnpm add css-hash
```

## Usage

### Basic Usage

```jsx
import React from "react";
import { cssHash } from "css-hash";

function Button({ children, className }) {
  const buttonClass = cssHash(
    (substituteClass) => `
      .${substituteClass} {
        border-radius: 3px;
        padding: 0.25em 1em;
        margin: 0.5em 1em;
        background: transparent;
        color: palevioletred;
        border: 2px solid palevioletred;
      }
      .${substituteClass}.primary {
        border: 2px solid palevioletred;
        background: palevioletred;
        color: white;
      }
    `
  );
  return <button className={`${buttonClass} ${className}`}>{children}</button>;
}

function App() {
  return (
    <div>
      <Button>Normal Button</Button>
      <Button className="primary">Primary Button</Button>
    </div>
  );
}
```

### Combining Class Names

```jsx
import { classNames } from "css-hash";

// Basic string concatenation - returns "btn btn-primary"
const btnClass = classNames("btn", "btn-primary");

// Filters out falsy values - returns "btn active"
const activeClass = classNames("btn", "", "active", null, undefined, false);

// Supports arrays - returns "btn primary large"
const complexClass = classNames("btn", ["primary", "large"]);

// Supports nested arrays - returns "btn primary large active"
const nestedClass = classNames("btn", ["primary", ["large", "active"]]);

// Supports objects (keys included when value is truthy) - returns "btn active"
const conditionalClass = classNames("btn", { active: true, disabled: false });
```

## API Reference

### cssHash(getCssString)

Generates a unique class name and injects the provided CSS into the document.

- `getCssString`: Function that receives a substitute class name and returns a CSS string
- Returns: A unique hash class name

### classNames(...args)

Combines multiple class names, filtering out empty values.

- `args`: Class names to combine (can be strings, arrays, or objects with boolean values)
- Returns: Combined class names as a space-separated string

### clearCssCache()

Clears the internal CSS cache used by the cssHash function.

- Useful for testing or when you need to reset the styling
- No parameters and no return value

```jsx
import { clearCssCache } from "css-hash";

// Clear the cache to ensure fresh class name generation
// Useful in test scenarios or when theme changes
clearCssCache();
```

## Caching

The `cssHash` function uses an internal cache to optimize performance:

- Identical CSS strings generate the same class name consistently
- Prevents duplicate style tags from being added to the document
- Improves performance by avoiding redundant hash calculations
- Works safely in server-side rendering environments

You can clear this cache manually using the `clearCssCache` function if needed.

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge) and Internet Explorer 11+.

The library is designed to be safe for server-side rendering (SSR) environments.

## Advanced Usage

### With React Components

```jsx
import React, { useState } from "react";
import { cssHash, classNames } from "css-hash";

function Card({ title, children, theme = "light" }) {
  const cardClass = cssHash(
    (className) => `
      .${className} {
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
      }
      .${className}.light {
        background: white;
        color: #333;
      }
      .${className}.dark {
        background: #333;
        color: white;
      }
    `
  );

  return (
    <div className={classNames(cardClass, theme)}>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}
```

### With Server-Side Rendering (SSR)

The library is designed to work safely with SSR by:
- Checking if `document` exists before attempting to modify the DOM
- Using a consistent hashing algorithm to ensure matching class names between server and client
- Providing a cache system that works in both environments

## How It Works

The library works by:

1. Taking your CSS string as input through the `cssHash` function
2. Calculating a deterministic hash from your CSS content
3. Using that hash to create a unique, alphabetic class name
4. Replacing a placeholder in your CSS with the generated class name
5. Injecting the processed CSS into the document's head within a style tag
6. Returning the generated class name for you to use in your components

This approach avoids class name collisions while keeping your styling scoped to components.

## Comparing with Alternatives

- **vs. CSS Modules**: No build configuration needed, works directly in browser
- **vs. Styled-components/Emotion**: Simpler API, smaller size, no template literals or extra syntax

## License

ISC