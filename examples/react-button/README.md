# React Button Example

This example demonstrates how to use css-hash with React to create a reusable Button component.

## Features

- Multiple button variants (default, primary, success)
- Multiple sizes (small, medium, large)
- Hover effects
- Composable with additional class names

## Usage

```jsx
import Button from './Button';

function App() {
  return (
    <div>
      <Button>Default Button</Button>
      <Button variant="primary">Primary Button</Button>
      <Button variant="success" size="large">Success Button</Button>
    </div>
  );
}
```
