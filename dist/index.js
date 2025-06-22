'use strict';

/**
 * Calculates a hash from a string using djb2 algorithm
 * @param {number} h - Hash seed
 * @param {string} x - String to hash
 * @returns {number} The calculated hash
 * @private
 */
function phash(h, x) {
  let i = x.length;
  while (i) {
    h = (h * 33) ^ x.charCodeAt(--i);
  }
  return h;
}

/**
 * Generates a hash from a string
 * @param {string} x - String to hash
 * @returns {number} The calculated hash
 * @private
 */
function hash(x) {
  return phash(5381, x);
}

/**
 * Gets an alphabetic character from a code
 * @param {number} code - The character code
 * @returns {string} The alphabetic character
 * @private
 */
function getAlphabeticChar(code) {
  return String.fromCharCode(code + (code > 25 ? 39 : 97));
}

/**
 * Generates an alphabetic name from a code
 * @param {number} code - The code to convert
 * @returns {string} The generated name
 * @private
 */
function generateAlphabeticName(code) {
  const charsLength = 52;
  let name = "";
  let x;
  for (x = Math.abs(code); x > charsLength; x = (x / charsLength) | 0) {
    name = getAlphabeticChar(x % charsLength) + name;
  }
  return (getAlphabeticChar(x % charsLength) + name).replace(
    /(a)(d)/gi,
    "$1-$2"
  );
}

/**
 * Generates a random ID
 * @returns {string} A random ID
 * @private
 */
function generateId() {
  return Math.random().toString(36).slice(2).slice(0, 9);
}

/**
 * Generates a hash ID from a string
 * @param {string} str - The string to hash
 * @returns {string} The generated hash ID
 * @private
 */
function generateHashId(str) {
  return generateAlphabeticName(hash(str) >>> 0);
}

/**
 * Adds a stylesheet to the document
 * @param {string} attributeId - The attribute ID for the style tag
 * @param {string} attributeValue - The attribute value for the style tag
 * @param {string} cssString - The CSS content
 * @private
 */
function addStyleSheet(attributeId, attributeValue, cssString) {
  // Check if we're in a browser environment
  if (typeof document === 'undefined') return;
  
  try {
    // Make the selector safe for querySelector by escaping any special characters
    const safeAttributeValue = attributeValue.replace(/"/g, '\\"');
    const isElementExist = document.querySelector(
      `style[${attributeId}="${safeAttributeValue}"]`
    );
    
    if (!isElementExist) {
      const head = document.head || document.getElementsByTagName("head")[0];
      if (!head) return; // Safety check
      
      const style = document.createElement("style");
      style.setAttribute("type", "text/css");
      style.setAttribute(attributeId, attributeValue);
      
      // Handle IE style sheets
      if ('styleSheet' in style) {
        // @ts-ignore - styleSheet is supported in IE
        style.styleSheet.cssText = cssString;
      } else {
        style.appendChild(document.createTextNode(cssString));
      }
      
      head.appendChild(style);
    }
  } catch (error) {
    // Silent fail - don't break the application if style injection fails
    console.warn('CSS-Hash: Error injecting stylesheet', error);
  }
}

// Cache for storing previously generated CSS
const cssCache = typeof Map !== 'undefined' ? new Map() : null;

/**
 * Creates a CSS class with a unique hash ID based on the provided CSS string
 * @param {function(string):string} getCssString - Function that receives a substitute class name and returns a CSS string
 * @returns {string} The generated hash ID to use as a CSS class name
 */
function cssHash(getCssString) {
  if (typeof getCssString !== "function") {
    return "";
  }

  // Use a temporary ID to compute the raw CSS
  const tmpId = "TMP_ID";  // Using a consistent placeholder for hashing
  const rawCssString = getCssString(tmpId)
    .replace(/\n/g, "")
    .replace(/\s\s+/g, " ");
  
  // Create a signature for caching
  const signature = rawCssString;

  // Check cache first if available
  if (cssCache && cssCache.has(signature)) {
    return cssCache.get(signature);
  }
  
  // Generate a deterministic hash ID based on the CSS content
  const hashId = generateHashId(signature);
  
  // Replace the temporary ID with the actual hash ID
  const hashCssString = rawCssString.split(tmpId).join(hashId);
  
  // Add the style to the document
  addStyleSheet("data-inline-style", hashId, hashCssString);
  
  // Store in cache if available
  if (cssCache) {
    cssCache.set(signature, hashId);
  }
  
  return hashId;
}

/**
 * Combines multiple class names into a single string, filtering out empty values
 * @param {...string} args - Class names to combine
 * @returns {string} Combined class names as a string
 */
function classNames(...args) {
  return args
    .filter((item) => {
      if (typeof item === "string") {
        return item.trim() !== "";
      }
      return false;
    })
    .join(" ");
}

/**
 * Creates pseudo-class selectors from regular class names
 * @param {string} pseudoType - The pseudo-class selector (e.g. ':hover', ':active')
 * @param {string|string[]} classNamesTmp - Class names as a string or array of strings
 * @returns {string} Class names with pseudo-class selectors applied
 */
function pseudoClasses(pseudoType, classNamesTmp) {
  /** @type {string[]} */
  let classList = [];
  if (Array.isArray(classNamesTmp)) {
    classList = [...classNamesTmp];
  } else if (typeof classNamesTmp === "string") {
    classList = classNamesTmp.split(" ");
  }
  return classList
    .filter((o) => !!o)
    .map((className) => {
      return className
        .split(" ")
        .map((c) => `${pseudoType}${c.trim()}`)
        .join(" ");
    })
    .join(" ");
}

/**
 * Clears the internal CSS cache
 * Useful for testing or when you need to reset the styling
 */
function clearCssCache() {
  if (cssCache) {
    cssCache.clear();
  }
}

// For CommonJS environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    cssHash,
    classNames,
    pseudoClasses,
    clearCssCache
  };
}
// For ESM environments
else if (typeof exports !== 'undefined') {
  exports.cssHash = cssHash;
  exports.classNames = classNames;
  exports.pseudoClasses = pseudoClasses;
  exports.clearCssCache = clearCssCache;
}


