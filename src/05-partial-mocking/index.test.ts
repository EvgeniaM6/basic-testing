import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  const { unmockedFunction } = originalModule;
  const newOriginalModule = {
    __esModule: true, // Use it when dealing with esModules
    unmockedFunction,
    mockOne: jest.fn,
    mockTwo: jest.fn,
    mockThree: jest.fn,
  };
  return newOriginalModule;
});

const log = console.log;

describe('partial mocking', () => {
  beforeAll(() => {
    console.log = jest.fn();
  });

  afterAll(() => {
    jest.unmock('./index');
    console.log = log;
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();
    expect(console.log).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();
    expect(console.log).toHaveBeenCalledWith('I am not mocked');
  });
});
