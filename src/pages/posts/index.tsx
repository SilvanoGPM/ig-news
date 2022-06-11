import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { createClient } from '../../../prismicio';

import styles from './styles.module.scss';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts • ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <a>
                <time className={styles.postedAt}>{post.updatedAt}</time>

                <strong className={styles.title}>{post.title}</strong>

                <p className={styles.content}>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = createClient();

  const response = await prismic.getAllByType('post', { pageSize: 100 });

  const posts = response.map<Post>((post) => {
    return {
      slug: post.uid,
      title: post.data.title,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        { day: '2-digit', month: 'long', year: 'numeric' },
      ),
      excerpt:
        post.data.content.find((content) => content.type === 'paragraph')
          ?.text ?? '',
    };
  });

  return {
    props: { posts },
  };
};
