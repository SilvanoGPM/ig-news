import { fireEvent, render, screen } from '@testing-library/react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import { SubscribeButton } from '.';

jest.mock('next-auth/react');
jest.mock('next/router');

const useSessionMocked = useSession as jest.Mock;
const signInMocked = signIn as jest.Mock;
const useRouterMocked = useRouter as jest.Mock;
const pushMocked = jest.fn();

describe('SubscribeButton component', () => {
  beforeEach(() => {
    useRouterMocked.mockReturnValue({
      push: pushMocked,
    });
  });

  it('renders correctly', () => {
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated',
    });

    render(<SubscribeButton />);

    expect(screen.getByText('Subscribe now'));
  });

  it('redirects user to sign in when not authenticated', () => {
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated',
    });

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it('redirects to posts when user already has a subscription', () => {
    useSessionMocked.mockReturnValueOnce({
      data: { activeSubscription: true },
      status: 'authenticated',
    });

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(pushMocked).toHaveBeenCalledWith('/posts');
  });
});
