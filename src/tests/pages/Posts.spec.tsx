import { render, screen } from '@testing-library/react';

import { createClient } from '../../../prismicio';

import Posts, { getStaticProps } from '../../pages/posts';

jest.mock('../../../prismicio');

const posts = [
  {
    slug: 'test-post',
    title: 'Test Post',
    excerpt: 'Test Post Excerpt',
    updatedAt: '10 de Abril',
  },
];

const createClientMocked = createClient as jest.Mock;

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText('Test Post')).toBeInTheDocument();
  });

  it('loads inital data', async () => {
    createClientMocked.mockReturnValueOnce({
      getAllByType: jest.fn().mockResolvedValueOnce([
        {
          uid: 'my-new-post',
          data: {
            title: 'My New Post',
            content: [{ type: 'paragraph', text: 'My New Post content' }],
          },
          last_publication_date: '07-11-2022',
        },
      ]),
    });

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'my-new-post',
              title: 'My New Post',
              updatedAt: '11 de julho de 2022',
              excerpt: 'My New Post content',
            },
          ],
        },
      }),
    );
  });
});
