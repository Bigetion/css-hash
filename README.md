# css-hash

A lightweight CSS-in-JS library for styling React components with auto-generated class names.

## Features

- 🔍 Generates unique hash-based class names
- 🧩 Simple API for composing class names
- 🔄 Supports pseudo-class selectors
- 🔄 Works in both ESM and CommonJS environments
- 🔄 TypeScript definitions included
- 🚀 Zero dependencies
- 📦 Small bundle size

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

// Returns "btn btn-primary"
const btnClass = classNames("btn", "btn-primary");

// Filters out empty values - returns "btn active"
const activeClass = classNames("btn", "", "active", null);
```

### Using Pseudo Classes

```jsx
import { pseudoClasses } from "css-hash";

// Returns ":hoverfoo :hoverbar"
const hoverClass = pseudoClasses(":hover", "foo bar");

// Also works with arrays - returns ":activefoo :activebar"
const activeClass = pseudoClasses(":active", ["foo", "bar"]);
```

## API Reference

### cssHash(getCssString)

Generates a unique class name and injects the provided CSS into the document.

- `getCssString`: Function that receives a substitute class name and returns a CSS string
- Returns: A unique hash class name

### classNames(...args)

Combines multiple class names, filtering out empty values.

- `args`: Class names to combine
- Returns: Combined class names as a space-separated string

### pseudoClasses(pseudoType, classNames)

Applies a pseudo-class prefix to a list of class names.

- `pseudoType`: The pseudo-class selector (e.g. ':hover', ':active')
- `classNames`: Class names as a space-separated string or array of strings
- Returns: Class names with pseudo-class selectors applied

## Browser Support

Works in all modern browsers and Internet Explorer 11+.

## License

ISC