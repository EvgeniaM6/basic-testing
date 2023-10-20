import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const baseURL = 'https://jsonplaceholder.typicode.com';
const relativePath = '/users';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    jest.spyOn(axios, 'create');
    throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const spy = jest.fn(throttledGetDataFromApi);
    spy(relativePath);

    expect(spy).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toBeDefined();
  });
});
