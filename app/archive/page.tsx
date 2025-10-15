import Link from 'next/link';
import { archiveExcludingLatest, getAllPosts } from '../../lib/posts';

const formatDisplayDate = (isoLikeDate: string): string => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoLikeDate);
  if (!match) {
    return isoLikeDate;
  }
  return `${match[1]}.${match[2]}.${match[3]}`;
};

const formatCategoryLabel = (category: 'topic' | 'news'): string =>
  category === 'topic' ? 'TOPIC' : 'NEWS';

export default function ArchivePage() {
  const archivePosts = archiveExcludingLatest(getAllPosts());

  if (archivePosts.length === 0) {
    return (
      <main className="archive-page">
        <div className="archive-page__inner">
          <nav className="archive-page__nav" aria-label="パンくず">
            <Link className="article-page__back" href="/">
              ← TOPへ
            </Link>
          </nav>
          <h1 className="archive-page__title">アーカイブ</h1>
          <p className="archive-page__empty">coming soon</p>
        </div>
      </main>
    );
  }

  return (
    <main className="archive-page">
      <div className="archive-page__inner">
        <nav className="archive-page__nav" aria-label="パンくず">
          <Link className="article-page__back" href="/">
            ← TOPへ
          </Link>
        </nav>
        <h1 className="archive-page__title">アーカイブ</h1>
        <ul className="archive-page__list" role="list">
          {archivePosts.map((post) => (
            <li key={post.id} className="archive-page__item">
              <div className="archive-page__meta">
                <span className="archive-page__date">{formatDisplayDate(post.date)}</span>
                <span className="archive-page__category">{formatCategoryLabel(post.category)}</span>
              </div>
              <Link className="archive-page__link" href={`/posts/${post.slug}`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
