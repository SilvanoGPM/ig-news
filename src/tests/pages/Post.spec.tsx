import { render, screen } from '@testing-library/react';
import { getSession } from 'next-auth/react';

import { createClient } from '../../../prismicio';

import Post, { getServerSideProps } from '../../pages/posts/[slug]';

jest.mock('next-auth/react');
jest.mock('../../../prismicio');

const post = {
  slug: 'test-post',
  title: 'Test Post',
  content: '<p>Test Post Excerpt</p>',
  updatedAt: '10 de Abril',
};

const getSessionMocked = getSession as jest.Mock;
const createClientMocked = createClient as jest.Mock;

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Post post={post} />);

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test Post Excerpt')).toBeInTheDocument();
  });

  it('redirects user if no subscription is found', async () => {
    getSessionMocked.mockReturnValueOnce(null);

    const response = await getServerSideProps({
      req: { cookies: {} },
      params: { slug: 'test-post' },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/posts/preview/test-post',
        }),
      }),
    );
  });

  it('loads data', async () => {
    getSessionMocked.mockReturnValueOnce({ activeSubscription: true });

    createClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: 'My New Post',
          content: [{ type: 'paragraph', text: 'My New Post content' }],
        },
        last_publication_date: '07-11-2022',
      }),
    });

    const response = await getServerSideProps({
      params: { slug: 'test-post' },
    } as any);

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
