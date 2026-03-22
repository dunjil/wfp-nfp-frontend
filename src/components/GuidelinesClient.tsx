'use client';
import { useState, useMemo } from 'react';
import Icon from '@/components/Icon';
import DocumentCard from '@/components/DocumentCard';
import { GuidelineDocument } from '@/lib/api';

const CATEGORIES = ['All', 'General', 'Logistics', 'Nutrition', 'Reports', 'Other'];

export default function GuidelinesClient({ docs }: { docs: GuidelineDocument[] }) {
    const [search, setSearch] = useState('');
    const [activeCat, setActiveCat] = useState('All');

    const filtered = useMemo(() => {
        return docs.filter(doc => {
            const matchSearch = doc.title.toLowerCase().includes(search.toLowerCase()) || (doc.description && doc.description.toLowerCase().includes(search.toLowerCase()));
            const matchCat = activeCat === 'All' || doc.category === activeCat;
            return matchSearch && matchCat;
        });
    }, [docs, search, activeCat]);

    return (
        <>
            <div className="search-bar">
                <div className="container">
                    <div className="search-inner">
                        <div className="search-input-wrap">
                            <span className="search-icon" style={{ display: 'flex', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>
                                <Icon name="search" size={16} />
                            </span>
                            <input 
                                className="search-input" 
                                type="text" 
                                placeholder="Search guidelines, standards, manuals…" 
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="filter-chips">
                            {CATEGORIES.map((c) => (
                                <button 
                                    key={c} 
                                    onClick={() => setActiveCat(c)}
                                    className={`chip ${activeCat === c ? 'active' : ''}`}
                                >{c}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <section className="section" style={{ background: 'var(--bg-off)', paddingTop: '3rem' }}>
                <div className="container">
                    <p className="section-eyebrow">Document Library</p>
                    <h2 className="section-title">All Publications</h2>

                    {filtered.length > 0 ? (
                        <div className="grid-3" style={{ marginTop: '2rem' }}>
                            {filtered.map((d) => <DocumentCard key={d.id} doc={d} />)}
                        </div>
                    ) : (
                        <div className="info-bar" style={{ marginTop: '2rem' }}>
                            <span className="info-bar-icon" style={{ color: 'var(--wfp-blue)' }}><Icon name="search" size={24} /></span>
                            <div>
                                <strong>No documents match your search criteria.</strong><br />
                                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Try adjusting your keywords or selecting a different category.</span>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
