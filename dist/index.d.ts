/**
 * Creates a CSS class with a unique hash ID based on the provided CSS string
 * @param getCssString - Function that receives a substitute class name and returns a CSS string
 * @returns The generated hash ID to use as a CSS class name
 */
export function cssHash(getCssString: (substituteClass: string) => string): string;

/**
 * Combines multiple class names into a single string, filtering out empty values
 * @param args - Class names to combine
 * @returns Combined class names as a string
 */
export function classNames(...args: string[]): string;

/**
 * Creates pseudo-class selectors from regular class names
 * @param pseudoType - The pseudo-class selector (e.g. ':hover', ':active')
 * @param classNamesTmp - Class names as a string or array of strings
 * @returns Class names with pseudo-class selectors applied
 */
export function pseudoClasses(pseudoType: string, classNamesTmp: string | string[]): string;