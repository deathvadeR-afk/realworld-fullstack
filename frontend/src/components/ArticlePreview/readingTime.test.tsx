import { readingTimeMinutes } from './readingTime';

const wordsSeparatedBy = (count: number, separator: string) =>
  Array.from({ length: count }, (_, index) => `word${index}`).join(separator);

it('[QP-QTRW-7-1] A 450-word body returns 3 minutes', () => {
  expect(readingTimeMinutes(wordsSeparatedBy(450, ' '))).toBe(3);
});

it('[QP-QTRW-7-2] A 200-word body returns 1 minute', () => {
  expect(readingTimeMinutes(wordsSeparatedBy(200, ' '))).toBe(1);
});

it('[QP-QTRW-7-3] A 201-word body returns 2 minutes', () => {
  expect(readingTimeMinutes(wordsSeparatedBy(201, ' '))).toBe(2);
});

it('[QP-QTRW-7-4] A single-word body returns the minimum of 1 minute', () => {
  expect(readingTimeMinutes('Hello')).toBe(1);
});

it('[QP-QTRW-7-5] An empty or whitespace-only body returns 0 minutes', () => {
  expect(readingTimeMinutes('')).toBe(0);
  expect(readingTimeMinutes('   ')).toBe(0);
});

it('[QP-QTRW-7-6] Tabs, newlines and repeated spaces all separate words', () => {
  const separators = ['\t', '\n', '    ', ' \t\n  '];
  const words = Array.from({ length: 201 }, (_, index) => `word${index}`);
  const body = words
    .map((word, index) => (index === 0 ? word : `${separators[index % separators.length]}${word}`))
    .join('');
  expect(readingTimeMinutes(body)).toBe(2);
});
