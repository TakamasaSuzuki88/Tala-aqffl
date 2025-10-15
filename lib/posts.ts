import postsJson from '../data/posts.json';

export type PostCategory = 'topic' | 'news';

export type Post = {
  id: string;
  slug: string;
  category: PostCategory;
  date: string;
  title: string;
  subtitle?: string;
  body?: string;
  pinned?: boolean;
};

const LATEST_DISPLAY_COUNT = 4;

const toTimestamp = (value: string): number => {
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const comparePostDesc = (a: Post, b: Post): number => toTimestamp(b.date) - toTimestamp(a.date);

export const getAllPosts = (): Post[] => {
  const posts = (postsJson as Post[]).map((post) => ({
    ...post,
    category: post.category
  }));

  return posts.sort(comparePostDesc);
};

export const splitByCategory = (posts: Post[]): { topic: Post[]; news: Post[] } => {
  const topic = posts.filter((post) => post.category === 'topic').sort(comparePostDesc);
  const news = posts.filter((post) => post.category === 'news').sort(comparePostDesc);

  return { topic, news };
};

export const latestNByCategory = (posts: Post[], category: PostCategory, n: number): Post[] => {
  const grouped = splitByCategory(posts);
  return grouped[category].slice(0, Math.max(0, n));
};

export const archiveExcludingLatest = (posts: Post[]): Post[] => {
  const grouped = splitByCategory(posts);

  const topicArchive = grouped.topic.slice(LATEST_DISPLAY_COUNT);
  const newsArchive = grouped.news.slice(LATEST_DISPLAY_COUNT);

  return [...topicArchive, ...newsArchive].sort(comparePostDesc);
};

export const LATEST_POST_COUNT = LATEST_DISPLAY_COUNT;
