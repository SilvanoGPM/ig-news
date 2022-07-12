import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { createClient } from '../../../prismicio';

import Post, { getStaticProps } from '../../pages/posts/preview/[slug]';

jest.mock('next-auth/react');
jest.mock('next/router');
jest.mock('../../../prismicio');

const post = {
  slug: 'test-post',
  title: 'Test Post',
  content: '<p>Test Post Excerpt</p>',
  updatedAt: '10 de Abril',
};

const createClientMocked = createClient as jest.Mock;
const useSessionMocked = useSession as jest.Mock;
const useRouterMocked = useRouter as jest.Mock;

const pushMock = jest.fn();

describe('Posts page', () => {
  it('renders correctly', () => {
    useSessionMocked.mockReturnValueOnce({
      status: 'unauthenticated',
      data: null,
    });

    render(<Post post={post} />);

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test Post Excerpt')).toBeInTheDocument();
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument();
  });

  it('redirects user to full post when user is subscribed', async () => {
    useSessionMocked.mockReturnValueOnce({
      status: 'authenticated',
      data: { activeSubscription: true },
    });

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    });

    render(<Post post={post} />);

    expect(pushMock).toHaveBeenCalledWith('/posts/test-post');
  });

  it('loads initial data', async () => {
    createClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: 'My New Post',
          content: [{ type: 'paragraph', text: 'My New Post content' }],
        },
        last_publication_date: '07-11-2022',
      }),
    });

    const response = await getStaticProps({
      params: { slug: 'test-post' },
    });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'test-post',
            title: 'My New Post',
            content: '<p>My New Post content</p>',
            updatedAt: '11 de julho de 2022',
          },
        },
      }),
    );
  });
});
