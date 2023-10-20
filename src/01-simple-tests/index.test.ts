import { simpleCalculator, Action } from './index';

const a = 12;
const b = 3;

const addResult = a + b;
const subtractResult = a - b;
const multiplyResult = a * b;
const divideResult = a / b;
const exponentiateResult = a ** b;

const invalidAction = '++';
const invalidB = b.toString();
const resultForInvalid = null;

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Add });
    expect(result).toBe(addResult);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Subtract });
    expect(result).toBe(subtractResult);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Multiply });
    expect(result).toBe(multiplyResult);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Divide });
    expect(result).toBe(divideResult);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Exponentiate });
    expect(result).toBe(exponentiateResult);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a, b, action: invalidAction });
    expect(result).toBe(resultForInvalid);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a, b: invalidB, action: Action.Add });
    expect(result).toBe(resultForInvalid);
  });
});
