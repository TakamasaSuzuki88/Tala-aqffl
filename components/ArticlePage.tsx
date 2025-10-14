import type { ReactNode } from 'react';

type ArticlePageProps = {
  category: 'TOPIC' | 'NEWS';
  title: string;
  date: string;
  dateTime: string;
  summary?: string;
  status?: 'coming-soon';
  children?: ReactNode;
};

export default function ArticlePage({
  category,
  title,
  date,
  dateTime,
  summary,
  status,
  children
}: ArticlePageProps) {
  const shouldShowBody = status !== 'coming-soon';

  return (
    <main className="article-page">
      <div className="article-page__inner">
        <a className="article-page__back" href="/">
          ← トップへ戻る
        </a>
        <p className="article-page__category">{category}</p>
        <h1 className="article-page__title">{title}</h1>
        <time className="article-page__date" dateTime={dateTime}>
          {date}
        </time>
        {summary && <p className="article-page__summary">{summary}</p>}
        <div className="article-page__body">
          {shouldShowBody ? (
            children
          ) : (
            <p className="article-page__coming-soon">Coming soon.</p>
          )}
        </div>
      </div>
    </main>
  );
}
