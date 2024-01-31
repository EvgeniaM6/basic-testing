import { generateLinkedList } from './index';

const argArray = ['a', 'b', 'c'];
const nullObj = { value: null, next: null };
const cObj = { value: argArray.at(-1), next: nullObj };
const bObj = { value: argArray.at(-2), next: cObj };
const linkedList = { value: argArray.at(-3), next: bObj };

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList(argArray);

    expect(result).toStrictEqual(linkedList);
  });

  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(argArray);

    expect(result).toMatchSnapshot();
  });
});
