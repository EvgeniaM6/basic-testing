import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');

  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

const baseURL = 'https://jsonplaceholder.typicode.com';
const relativePath = '/users';

const axiosInstance = {
  get: async (relativePathStr: string) => {
    return new Promise((res) => {
      const response = {
        data: relativePathStr,
      };
      res(response);
    });
  },
};

jest.mock('axios', () => {
  return {
    create: () => {
      return {
        get: axiosInstance.get,
      };
    },
  };
});

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const spy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);

    expect(spy).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const spy = jest.spyOn(axiosInstance, 'get');
    await throttledGetDataFromApi(relativePath);

    expect(spy).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toBeDefined();
  });
});
