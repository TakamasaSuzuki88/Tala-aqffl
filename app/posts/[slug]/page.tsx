import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Post } from '../../../lib/posts';
import { getAllPosts } from '../../../lib/posts';

const formatDisplayDate = (isoLikeDate: string): string => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoLikeDate);
  if (!match) {
    return isoLikeDate;
  }
  return `${match[1]}.${match[2]}.${match[3]}`;
};

const toParagraphs = (content?: string) => {
  if (!content) {
    return [];
  }

  return content
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
};

const resolveBodyContent = (post: Post): string[] => {
  const body = post.body ?? post.subtitle;
  return toParagraphs(body);
};

const formatCategoryLabel = (category: Post['category']): string =>
  category === 'topic' ? 'TOPIC' : 'NEWS';

type PostPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default function PostPage({ params }: PostPageProps) {
  const post = getAllPosts().find((item) => item.slug === params.slug);

  if (!post) {
    notFound();
  }

  const displayDate = formatDisplayDate(post.date);
  const summary = post.subtitle ?? '';
  const bodyParts = resolveBodyContent(post);

  return (
    <main className="article-page">
      <div className="article-page__inner">
        <nav className="article-page__breadcrumb" aria-label="パンくず">
          <Link className="article-page__back" href="/">
            ← TOPへ
          </Link>
          <Link className="article-page__back" href="/archive">
            ← アーカイブへ
          </Link>
        </nav>
        <p className="article-page__category">{formatCategoryLabel(post.category)}</p>
        <h1 className="article-page__title">{post.title}</h1>
        <time className="article-page__date" dateTime={post.date}>
          {displayDate}
        </time>
        {summary && <p className="article-page__summary">{summary}</p>}
        <div className="article-page__body">
          {bodyParts.length > 0 ? bodyParts.map((paragraph, index) => <p key={index}>{paragraph}</p>) : null}
        </div>
      </div>
    </main>
  );
}
