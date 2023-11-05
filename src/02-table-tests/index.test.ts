import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 12, b: 3, action: Action.Add, expected: 15 },
  { a: 12, b: 3, action: Action.Subtract, expected: 9 },
  { a: 12, b: 3, action: Action.Multiply, expected: 36 },
  { a: 12, b: 3, action: Action.Divide, expected: 4 },
  { a: 12, b: 3, action: Action.Exponentiate, expected: 1728 },
  { a: 12, b: 3, action: '++', expected: null },
  { a: 12, b: '3', action: Action.Add, expected: null },
  { a: '12', b: 3, action: Action.Add, expected: null },
];

describe.each(testCases)('simpleCalculator', ({ a, b, action, expected }) => {
  test(`with a=${a}, b=${b} and action=${action} should return ${expected}`, () => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
});
