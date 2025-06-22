const { classNames } = require('../src/index');

describe('classNames (Advanced)', () => {
  test('should handle basic string inputs', () => {
    expect(classNames('foo', 'bar')).toBe('foo bar');
    expect(classNames('foo', ' bar ')).toBe('foo bar');
    expect(classNames('foo', '')).toBe('foo');
  });

  test('should handle falsy values', () => {
    expect(classNames('foo', null, 'bar')).toBe('foo bar');
    expect(classNames('foo', undefined, 'bar')).toBe('foo bar');
    expect(classNames('foo', false, 'bar')).toBe('foo bar');
    expect(classNames('foo', 0, 'bar')).toBe('foo bar');
    expect(classNames('foo', '', 'bar')).toBe('foo bar');
  });

  test('should handle number values', () => {
    expect(classNames('foo', 1, 'bar')).toBe('foo 1 bar');
    expect(classNames('item', 5)).toBe('item 5');
  });

  test('should handle array values', () => {
    expect(classNames('foo', ['bar', 'baz'])).toBe('foo bar baz');
    expect(classNames('a', ['b', ['c', 'd']])).toBe('a b c d');
  });

  test('should handle object values', () => {
    expect(classNames('foo', { bar: true, baz: false })).toBe('foo bar');
    expect(classNames({ foo: true, bar: false, baz: true })).toBe('foo baz');
    expect(classNames({ 'foo-bar': true })).toBe('foo-bar');
  });

  test('should handle complex combinations', () => {
    const result = classNames(
      'btn',
      { 'btn-active': true, 'btn-large': false },
      ['btn-primary', ['btn-outlined', null]],
      undefined,
      'btn-block'
    );
    expect(result).toBe('btn btn-active btn-primary btn-outlined btn-block');
  });
});
