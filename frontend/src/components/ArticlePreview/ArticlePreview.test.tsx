import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ArticlePreview } from './ArticlePreview';
import { readingTime } from './ArticlePreview';

const defaultArticle = {
  author: {
    bio: null,
    following: false,
    image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
    username: 'Jazmin Martinez',
  },
  body: 'Test 1',
  createdAt: new Date(),
  description: 'Test 1',
  favorited: false,
  favoritesCount: 0,
  slug: 'test-pmy91z',
  tagList: ['tag1', 'tag2'],
  title: 'Test',
  updatedAt: new Date(),
};

it('Favorite button should be outlined if not favorited', () => {
  render(
    <MemoryRouter>
      <ArticlePreview article={defaultArticle} isSubmitting={false} />
    </MemoryRouter>
  );

  expect(screen.getByLabelText('Toggle Favorite').className.split(' ')).toContain('btn-outline-primary');
});

it('Favorite button should be primary if favorited', () => {
  render(
    <MemoryRouter>
      <ArticlePreview article={{ ...defaultArticle, favorited: true }} isSubmitting={false} />
    </MemoryRouter>
  );

  expect(screen.getByLabelText('Toggle Favorite').className.split(' ')).toContain('btn-primary');
});

it('Should display tags', () => {
  render(
    <MemoryRouter>
      <ArticlePreview article={defaultArticle} isSubmitting={false} />
    </MemoryRouter>
  );

  expect(screen.getByText('tag1')).toBeInTheDocument();
  expect(screen.getByText('tag2')).toBeInTheDocument();
});

const wordsBody = (count: number) => Array.from({ length: count }, () => 'word').join(' ');

it('[QP-QTRW-9-1] Returns 3 for a 450-word body', () => {
  expect(readingTime(wordsBody(450))).toBe(3);
});

it('[QP-QTRW-9-2] Returns 1 for a 200-word body', () => {
  expect(readingTime(wordsBody(200))).toBe(1);
});

it('[QP-QTRW-9-3] Returns 2 for a 201-word body', () => {
  expect(readingTime(wordsBody(201))).toBe(2);
});

it('[QP-QTRW-9-4] Returns 1 minute for a single-word body', () => {
  expect(readingTime('Hello')).toBe(1);
});

it('[QP-QTRW-9-5] Returns 0 for a whitespace-only body', () => {
  expect(readingTime('   ')).toBe(0);
});

it('[QP-QTRW-9-6] Counts tabs and line breaks as word separators', () => {
  const separators = [' ', '\t', '\n'];
  const mixedBody = Array.from({ length: 201 }, () => 'word')
    .map((word, i) => `${word}${separators[i % 3]}`)
    .join('');
  expect(readingTime(mixedBody)).toBe(2);
});

it("[QP-QTRW-9-7] Preview shows the reading time as 'N min read'", () => {
  render(
    <MemoryRouter>
      <ArticlePreview article={{ ...defaultArticle, body: wordsBody(450) }} isSubmitting={false} />
    </MemoryRouter>
  );

  expect(screen.getByText('3 min read')).toBeInTheDocument();
});
