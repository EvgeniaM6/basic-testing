import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path, { join } from 'path';

const time = 1000;
const pathToFile = '../05-partial-mocking/index.ts';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  test('should set timeout with provided callback and timeout', () => {
    const cbFunc = jest.fn();
    doStuffByTimeout(cbFunc, time);

    expect(setTimeout).toHaveBeenCalledWith(cbFunc, time);
  });

  test('should call callback only after timeout', () => {
    const cbFunc = jest.fn();
    doStuffByTimeout(cbFunc, time);

    expect(cbFunc).not.toBeCalled();

    jest.advanceTimersByTime(time);
    expect(cbFunc).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  test('should set interval with provided callback and timeout', () => {
    const cbFunc = jest.fn();
    doStuffByInterval(cbFunc, time);

    expect(setInterval).toHaveBeenCalledWith(cbFunc, time);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cbFunc = jest.fn();
    doStuffByInterval(cbFunc, time);

    jest.advanceTimersByTime(time);
    expect(cbFunc).toBeCalledTimes(1);

    jest.advanceTimersByTime(time);
    expect(cbFunc).toBeCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);

    expect(join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const result = await readFileAsynchronously('../05-partial-mocking/ggg.ts');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const result = await readFileAsynchronously(pathToFile);

    const containStr = (result as string).includes('unmockedFunction');
    expect(containStr).toBeTruthy();
  });
});
