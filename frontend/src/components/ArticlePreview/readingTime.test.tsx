import { readingTime } from './readingTime';

const wordsOf = (count: number, separator = ' '): string =>
  Array.from({ length: count }, () => 'word').join(separator);

it('[QP-QTRW-8-1] Rounds a 450-word body up to 3 minutes', () => {
  expect(readingTime(wordsOf(450))).toBe(3);
});

it('[QP-QTRW-8-2] Rounds a 201-word body up to 2 minutes', () => {
  expect(readingTime(wordsOf(201))).toBe(2);
});

it('[QP-QTRW-8-3] Gives exactly 1 minute for a 200-word body', () => {
  expect(readingTime(wordsOf(200))).toBe(1);
});

it('[QP-QTRW-8-4] Gives 1 minute for a non-empty body of three words', () => {
  expect(readingTime(wordsOf(3))).toBe(1);
});

it('[QP-QTRW-8-5] Gives 0 minutes for a whitespace-only body', () => {
  expect(readingTime('   ')).toBe(0);
});

it('[QP-QTRW-8-6] Gives 0 minutes for an empty body', () => {
  expect(readingTime('')).toBe(0);
});

it('[QP-QTRW-8-7] Counts words separated only by tabs and line breaks', () => {
  expect(readingTime(wordsOf(201, '\t\n'))).toBe(2);
});
