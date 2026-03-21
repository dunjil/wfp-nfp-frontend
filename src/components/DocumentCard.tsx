import type { GuidelineDocument } from '@/lib/api';
import { getStrapiMediaUrl } from '@/lib/api';
import Icon, { IconName } from '@/components/Icon';

const CATEGORY_COLORS: Record<string, string> = {
    regulatory: 'badge-regulatory',
    technical: 'badge-technical',
    operational: 'badge-operational',
    training: 'badge-training',
    report: 'badge-report',
    policy: 'badge-announcement',
};

const CATEGORY_ICONS: Record<string, IconName> = {
    regulatory: 'scale',
    technical: 'microscope',
    operational: 'settings',
    training: 'graduation-cap',
    report: 'bar-chart',
    policy: 'clipboard',
};

interface DocumentCardProps {
    doc: GuidelineDocument;
}

export default function DocumentCard({ doc }: DocumentCardProps) {
    const { title, description, file, category, published_date, is_featured } = doc;
    const fileUrl = getStrapiMediaUrl(file?.url);
    const hasFile = !!file?.url;

    const formattedDate = published_date
        ? new Date(published_date).toLocaleDateString('en-GB', {
            month: 'long',
            year: 'numeric',
        })
        : null;

    return (
        <div className="card doc-card">
            <style>{`
        .doc-card {
          display: flex;
          flex-direction: column;
          padding: 0;
          overflow: hidden;
        }
        .doc-card-header {
          padding: 1.25rem;
          background: linear-gradient(135deg,#f8f9fa,#fff);
          border-bottom: 1px solid var(--color-gray-100);
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .doc-icon {
          font-size: 2rem;
          flex-shrink: 0;
          line-height: 1;
        }
        .doc-card-body { padding: 1.25rem; flex: 1; display: flex; flex-direction: column; }
        .doc-card h4 {
          color: var(--color-navy);
          line-height: 1.4;
          margin-bottom: 0.5rem;
        }
        .doc-card p {
          color: var(--color-gray-600);
          line-height: 1.65;
          flex: 1;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .doc-card-footer {
          border-top: 1px solid var(--color-gray-100);
          padding: 0.85rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .doc-date { font-size: 0.78rem; color: var(--color-gray-400); }
        .doc-no-file {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--color-gray-400);
          font-size: 0.8rem;
        }
      `}</style>

            <div className="doc-card-header">
                <span className="doc-icon" style={{ color: 'var(--wfp-blue)', display: 'flex' }}><Icon name={CATEGORY_ICONS[category] || 'file'} size={32} /></span>
                <div>
                    <span className={`badge ${CATEGORY_COLORS[category] || 'badge-report'}`} style={{ marginBottom: '0.4rem' }}>
                        {category}
                    </span>
                    {is_featured && (
                        <span className="badge" style={{ marginLeft: '0.4rem', background: '#fff3e0', color: '#e65100', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                            <Icon name="sparkles" size={12} /> Featured
                        </span>
                    )}
                </div>
            </div>

            <div className="doc-card-body">
                <h4>{title}</h4>
                {description && <p>{description}</p>}
            </div>

            <div className="doc-card-footer">
                {formattedDate && <span className="doc-date" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Icon name="calendar" size={14} /> {formattedDate}</span>}
                {hasFile ? (
                    <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                        download
                    >
                        <Icon name="file" size={14} /> Download
                    </a>
                ) : (
                    <span className="doc-no-file"><Icon name="clock" size={14} /> Coming Soon</span>
                )}
            </div>
        </div>
    );
}
