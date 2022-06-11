import Head from 'next/head';

import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts • ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time className={styles.postedAt}>10 de Junho de 2022</time>

            <strong className={styles.title}>
              Recoil - biblioteca de gerenciamento de estados no React
            </strong>

            <p className={styles.content}>
              Vamos falar de React com um assunto interessante: Gerenciamento de
              estados e a nova lib chamada Recoil.
            </p>
          </a>

          <a href="#">
            <time className={styles.postedAt}>10 de Junho de 2022</time>

            <strong className={styles.title}>
              Recoil - biblioteca de gerenciamento de estados no React
            </strong>

            <p className={styles.content}>
              Vamos falar de React com um assunto interessante: Gerenciamento de
              estados e a nova lib chamada Recoil.
            </p>
          </a>

          <a href="#">
            <time className={styles.postedAt}>10 de Junho de 2022</time>

            <strong className={styles.title}>
              Recoil - biblioteca de gerenciamento de estados no React
            </strong>

            <p className={styles.content}>
              Vamos falar de React com um assunto interessante: Gerenciamento de
              estados e a nova lib chamada Recoil.
            </p>
          </a>

          <a href="#">
            <time className={styles.postedAt}>10 de Junho de 2022</time>

            <strong className={styles.title}>
              Recoil - biblioteca de gerenciamento de estados no React
            </strong>

            <p className={styles.content}>
              Vamos falar de React com um assunto interessante: Gerenciamento de
              estados e a nova lib chamada Recoil.
            </p>
          </a>

          <a href="#">
            <time className={styles.postedAt}>10 de Junho de 2022</time>

            <strong className={styles.title}>
              Recoil - biblioteca de gerenciamento de estados no React
            </strong>

            <p className={styles.content}>
              Vamos falar de React com um assunto interessante: Gerenciamento de
              estados e a nova lib chamada Recoil.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
