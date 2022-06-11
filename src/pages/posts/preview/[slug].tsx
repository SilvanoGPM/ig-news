import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { RichText } from 'prismic-dom';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { createClient } from '../../../../prismicio';

import styles from '../post.module.scss';

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (data?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [data, router, post.slug]);

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
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="#">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const prismic = createClient();

  const response = await prismic.getByUID('post', slug);

  const post = {
    slug,
    title: response.data.title,
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      'pt-BR',
      { day: '2-digit', month: 'long', year: 'numeric' },
    ),
  };

  return {
    props: { post },
    revalidate: 60 * 60, // one hour,
  };
};
