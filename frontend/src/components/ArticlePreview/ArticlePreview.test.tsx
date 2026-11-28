import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ArticlePreview } from './ArticlePreview';

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

it('[QP-QTRW-8-8] Shows the estimate on an article preview', () => {
  const body = Array.from({ length: 450 }, () => 'word').join(' ');

  render(
    <MemoryRouter>
      <ArticlePreview article={{ ...defaultArticle, body }} isSubmitting={false} />
    </MemoryRouter>
  );

  expect(screen.getByText('3 min read')).toBeInTheDocument();
});

it("[QP-QTRW-8-9] Shows each article's own estimate across a list of previews", () => {
  const longBody = Array.from({ length: 450 }, () => 'word').join(' ');
  const shortBody = Array.from({ length: 200 }, () => 'word').join(' ');

  const { container } = render(
    <MemoryRouter>
      <div>
        <ArticlePreview article={{ ...defaultArticle, body: longBody }} isSubmitting={false} />
        <ArticlePreview article={{ ...defaultArticle, body: shortBody, slug: 'test-short' }} isSubmitting={false} />
      </div>
    </MemoryRouter>
  );

  const previews = container.querySelectorAll('.article-preview');
  expect(previews).toHaveLength(2);
  expect(previews[0].textContent).toContain('3 min read');
  expect(previews[1].textContent).toContain('1 min read');
});
