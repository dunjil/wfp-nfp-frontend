'use client';
import Image from 'next/image';
import Link from 'next/link';
import { getStrapiMediaUrl } from '@/lib/api';
import type { NewsEvent } from '@/lib/api';

interface NewsCardProps { article: NewsEvent; }

const CATEGORY_BADGE: Record<string, [string, string]> = {
  news: ['bg-blue-50 text-blue-700', 'News'],
  event: ['bg-green-50 text-green-700', 'Event'],
  announcement: ['bg-amber-50 text-amber-700', 'Announcement'],
  report: ['bg-purple-50 text-purple-700', 'Report'],
};

const PLACEHOLDER_IMAGES: Record<string, string> = {
  news: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=640&h=420&fit=crop&q=75&auto=format',
  event: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=640&h=420&fit=crop&q=75&auto=format',
  announcement: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=640&h=420&fit=crop&q=75&auto=format',
  report: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=640&h=420&fit=crop&q=75&auto=format',
};

export default function NewsCard({ article }: NewsCardProps) {
  const { title, excerpt, date, image, category, slug, is_featured } = article;
  const imgSrc = image?.url
    ? getStrapiMediaUrl(image.url)
    : (PLACEHOLDER_IMAGES[category] ?? PLACEHOLDER_IMAGES.news);
  const hasStrapi = !!image?.url;

  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  const [badgeClass, badgeLabel] = CATEGORY_BADGE[category] ?? ['bg-gray-100 text-gray-600', category];

  return (
    <>
      <style>{`
        .news-card {
          background: #fff; border-radius: var(--radius-xl);
          border: 1px solid var(--border-light); overflow: hidden;
          display: flex; flex-direction: column;
          box-shadow: var(--shadow-sm);
          transition: all 0.4s var(--ease-spring);
        }
        .news-card:hover { 
          box-shadow: var(--shadow-xl); 
          transform: translateY(-8px); 
          border-color: var(--border);
        }
        .news-card-img {
          aspect-ratio: 16/10; position: relative; overflow: hidden;
          background: var(--bg-off);
        }
        .news-card-img img { transition: transform 0.6s var(--ease-spring); }
        .news-card:hover .news-card-img img { transform: scale(1.08) rotate(1deg); }
        .news-card-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.3) 0%, transparent 60%);
        }
        .news-card-featured-tag {
          position: absolute; top: 1rem; left: 1rem;
          background: var(--wfp-gold); color: #7a4a00;
          font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 0.3rem 0.8rem; border-radius: var(--radius-full);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }
        .news-card-body { padding: 1.75rem 1.5rem; display: flex; flex-direction: column; flex: 1; }
        .news-card-meta {
          display: flex; align-items: center; gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .news-card-badge {
          font-size: 0.68rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.05em; padding: 0.25rem 0.65rem; border-radius: var(--radius-sm);
        }
        .news-card-date { font-size: 0.8rem; color: var(--text-muted); font-weight: 500; }
        .news-card-title {
          font-size: 1.15rem; font-weight: 800; line-height: 1.4;
          color: var(--text-primary); margin-bottom: 0.75rem;
          transition: color .2s;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .news-card:hover .news-card-title { color: var(--wfp-blue); }
        .news-card-excerpt {
          font-size: 0.95rem; color: var(--text-muted); line-height: 1.65;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
          flex: 1; margin-bottom: 1.5rem;
        }
        .news-card-link {
          font-size: 0.9rem; font-weight: 700; color: var(--wfp-blue);
          display: inline-flex; align-items: center; gap: 0.3rem;
          transition: gap .3s var(--ease-spring);
        }
        .news-card:hover .news-card-link { gap: 0.75rem; }
      `}</style>

      <Link href={`/news/${slug}`} className="news-card">
        <div className="news-card-img">
          <Image
            src={imgSrc}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, 33vw"
            unoptimized={!hasStrapi}
          />
          <div className="news-card-img-overlay" />
          {is_featured && <span className="news-card-featured-tag">Featured</span>}
        </div>
        <div className="news-card-body">
          <div className="news-card-meta">
            <span className={`news-card-badge ${badgeClass}`}>{badgeLabel}</span>
            <span className="news-card-date">{formattedDate}</span>
          </div>
          <h3 className="news-card-title">{title}</h3>
          {excerpt && <p className="news-card-excerpt">{excerpt}</p>}
          <span className="news-card-link">Read more →</span>
        </div>
      </Link>
    </>
  );
}
