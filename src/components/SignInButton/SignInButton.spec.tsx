import { render, screen } from '@testing-library/react';

import { useSession } from 'next-auth/react';

import { SignInButton } from '.';

jest.mock('next-auth/react');

const useSessionMocked = useSession as jest.Mock;

describe('SignInButton component', () => {
  it('renders correctly when user is not authenticated', () => {
    useSessionMocked.mockReturnValueOnce({
      data: { user: null },
      status: 'unauthenticated',
    });

    render(<SignInButton />);

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
  });

  it('renders correctly when user is authenticated', () => {
    useSessionMocked.mockReturnValueOnce({
      data: { user: { name: 'Jonh Doe' } },
      status: 'authenticated',
    });

    render(<SignInButton />);

    expect(screen.getByText('Jonh Doe')).toBeInTheDocument();
  });
});
