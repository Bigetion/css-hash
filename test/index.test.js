import { cssHash, classNames } from '../src/index';

describe('classNames', () => {
  test('should combine class names', () => {
    expect(classNames('foo', 'bar')).toBe('foo bar');
    expect(classNames('foo', '', 'bar')).toBe('foo bar');
    expect(classNames('foo', null, 'bar')).toBe('foo bar');
    expect(classNames('foo', undefined, 'bar')).toBe('foo bar');
  });
});



// Test for cssHash requires DOM which is mocked by jsdom
describe('cssHash', () => {
  test('should generate a hash class name', () => {
    const className = cssHash(id => `.${id} { color: red; }`);
    expect(typeof className).toBe('string');
    expect(className.length).toBeGreaterThan(0);
  });

  test('should add style to document', () => {
    const className = cssHash(id => `.${id} { color: blue; }`);
    const style = document.querySelector(`style[data-inline-style="${className}"]`);
    expect(style).not.toBeNull();
  });
});
