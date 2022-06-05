import Head from 'next/head';
import Image from 'next/image';

import styles from './home.module.scss';

export default function Home() {
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
            <span>for $9.90 month</span>
          </p>
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
