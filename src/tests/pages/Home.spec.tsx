import { render, screen } from '@testing-library/react';
import { stripe } from '../../services/stripe';

import Home, { getStaticProps } from '../../pages';

jest.mock('next/router');

jest.mock('../../services/stripe');

jest.mock('next-auth/react', () => ({
  useSession() {
    return { data: null, status: 'authenticated' };
  },
}));

const stripeRetrieveMocked = stripe.prices.retrieve as jest.Mock;

describe('Home page', () => {
  it('renders correctly', () => {
    render(<Home product={{ priceId: 'fake-priceId', amount: 'R$ 10' }} />);

    expect(screen.getByText('for R$ 10 month')).toBeInTheDocument();
  });

  it('loads inital data', async () => {
    stripeRetrieveMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    });

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: { product: { priceId: 'fake-price-id', amount: '$10.00' } },
      }),
    );
  });
});
