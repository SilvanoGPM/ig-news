import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { RichText } from 'prismic-dom';

import { createClient } from '../../../prismicio';

import styles from './post.module.scss';

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} • ig.news</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1 className={styles.postTitle}>{post.title}</h1>
          <time className={styles.postTime}>{post.updatedAt}</time>

          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  const { slug } = params as { slug: string };

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: `/posts/preview/${slug}`,
        permanent: false,
      },
    };
  }

  const prismic = createClient({ req });

  const response = await prismic.getByUID('post', slug);

  const post = {
    slug,
    title: response.data.title,
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      'pt-BR',
      { day: '2-digit', month: 'long', year: 'numeric' },
    ),
  };

  return { props: { post } };
};
