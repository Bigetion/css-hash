import React from 'react';
import { cssHash, classNames } from '../../dist/index.mjs';

function Button({ children, variant = 'default', size = 'medium', className = '', ...props }) {
  const buttonClass = cssHash(
    (id) => `
      .${id} {
        border-radius: 4px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 500;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid transparent;
        transition: background-color 0.2s, color 0.2s, border-color 0.2s;
        text-decoration: none;
      }
      
      .${id}.default {
        background-color: #f5f5f5;
        color: #333;
        border-color: #e0e0e0;
      }
      
      .${id}.default:hover {
        background-color: #e0e0e0;
      }
      
      .${id}.primary {
        background-color: #1976d2;
        color: white;
      }
      
      .${id}.primary:hover {
        background-color: #1565c0;
      }
      
      .${id}.success {
        background-color: #2e7d32;
        color: white;
      }
      
      .${id}.success:hover {
        background-color: #2d6a31;
      }
      
      .${id}.small {
        padding: 4px 8px;
        font-size: 12px;
      }
      
      .${id}.medium {
        padding: 8px 16px;
        font-size: 14px;
      }
      
      .${id}.large {
        padding: 12px 24px;
        font-size: 16px;
      }
    `
  );

  return (
    <button 
      className={classNames(buttonClass, variant, size, className)} 
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
