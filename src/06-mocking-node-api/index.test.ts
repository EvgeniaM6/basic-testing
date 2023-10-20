import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path, { join } from 'path';

const time = 1000;
const cbFunc = jest.fn(() => {
  console.log('');
});

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cbFunc, time);

    expect(setTimeout).toHaveBeenLastCalledWith(cbFunc, time);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cbFunc, time);

    expect(cbFunc).not.toBeCalled();

    jest.runAllTimers();
    expect(cbFunc).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(cbFunc, time);

    expect(setInterval).toHaveBeenLastCalledWith(cbFunc, time);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(cbFunc, time);

    jest.runOnlyPendingTimers();
    expect(cbFunc.mock.calls.length).not.toBeLessThan(1);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');
    await readFileAsynchronously('../05-partial-mocking/index.ts');

    expect(join).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    const result = await readFileAsynchronously('../05-partial-mocking/ggg.ts');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const result = await readFileAsynchronously(
      '../05-partial-mocking/index.ts',
    );

    const containStr = (result as string).includes('unmockedFunction');
    expect(containStr).toBeTruthy();
  });
});
