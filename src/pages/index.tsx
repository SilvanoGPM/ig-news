import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import { formatAmount } from '../utils/format';

import styles from './home.module.scss';

interface HomeProps {
  product: { priceId: string; amount: string };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home • ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span className={styles.welcomeText}>👏 Hey, Welcome</span>

          <h1>
            News about <br /> the <span>React</span> world.
          </h1>

          <p>
            Get access to all the publication <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton />
        </section>

        <Image
          width={344}
          height={520}
          src="/images/avatar.svg"
          alt="Girl coding"
        />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1L7IS2EWUeGeUWvjSbPOGzKR');

  const product = {
    priceId: price.id,
    amount: formatAmount(price.unit_amount / 100),
  };

  return {
    props: { product },
    revalidate: 60 * 60 * 24, // 24 horus
  };
};
