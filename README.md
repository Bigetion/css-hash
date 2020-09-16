## What is this?

css-in-js library to help you style your react components.

## Instalation
```
npm i css-hash
```

## Usage

```
import React from "react";
import { cssHash } from "css-hash";

function Button({ children, className }) {
  const buttonClass = cssHash(
    (subtituteClass) => `
      .${subtituteClass} {
        border-radius: 3px;
        padding: 0.25em 1em;
        margin: 0.5em 1em;
        background: transparent;
        color: palevioletred;
        border: 2px solid palevioletred;
      }
      .${subtituteClass}.primary {
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