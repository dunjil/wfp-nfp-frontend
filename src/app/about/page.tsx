import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Icon, { IconName } from '@/components/Icon';
import { getAboutPage, getTeamMembers, getStrapiMediaUrl } from '@/lib/api';

export const metadata: Metadata = {
    title: 'About the National Fortification Project',
    description: 'Learn about NFA Nigeria — our mission, vision, history, and objectives for eliminating micronutrient malnutrition.',
};
export const revalidate = 60;

const TIMELINE = [
    { year: '2004', event: 'Nigeria enacts the Food, Drugs and Related Products (Fortification) Regulation, making fortification mandatory for key staple foods.' },
    { year: '2011', event: 'WFP Nigeria launches the National Fortification Project with NAFDAC to strengthen enforcement and processor capacity across 6 key food vehicles.' },
    { year: '2016', event: 'Coverage of Vitamin A-fortified vegetable oil reaches 70% of households. NFA introduces the national quality mark seal for certified products.' },
    { year: '2020', event: 'NFP expands to include Maize Flour and Wheat Flour in NAFDAC\'s mass fortification mandate. Premix fund established for small processors.' },
    { year: '2024', event: 'Over 200 processors certified across 36 states, reaching 12M+ consumers. NFP achieves 68% household coverage of fortified staple foods.' },
];

const OBJECTIVES: { icon: IconName; text: string }[] = [
    { icon: 'trending-up', text: 'Increase coverage of fortified staple foods to at least 90% of Nigerian households by 2027.' },
    { icon: 'landmark', text: 'Strengthen regulatory frameworks and NAFDAC enforcement capacity for food fortification.' },
    { icon: 'wrench', text: 'Build technical and operational capacity of certified food processors and millers.' },
    { icon: 'megaphone', text: 'Promote consumer awareness and behavioral demand for fortified foods across Nigeria.' },
    { icon: 'bar-chart', text: 'Establish robust monitoring and evaluation systems for real-time fortification quality tracking.' },
    { icon: 'handshake', text: 'Mobilize sustainable public-private financing for Nigeria\'s national fortification program.' },
];

const LEADERSHIP = [
    { name: 'WFP Nigeria Office', role: 'Program Lead & Technical Support', src: '/wfp-logo-standard-blue-en.svg', width: 100, height: 40 },
    { name: 'NAFDAC', role: 'Regulatory Authority & Enforcement', src: '/NAFDAC_emblem.png', width: 56, height: 56 },
    { name: 'Federal Ministry of Health', role: 'Policy & Government Ownership', src: '/Nigeria_Federal_Ministry_of_Health_Logo.png', width: 56, height: 56 },
    { name: 'NFA Secretariat', role: 'Coordination & Stakeholder Management', src: '/logo.png', width: 120, height: 40 },
];

export default async function AboutPage() {
    const about = await getAboutPage();
    const team = await getTeamMembers();

    return (
        <>
            <style>{`
        /* Hero */
        .about-hero { position: relative; height: 480px; overflow: hidden; }
        .about-hero-overlay { position: absolute; inset: 0; background: linear-gradient(105deg, rgba(0,28,60,.85) 0%, rgba(0,60,108,.55) 60%, transparent 100%); }
        .about-hero-content { position: absolute; inset: 0; display: flex; align-items: flex-end; padding-bottom: 3.5rem; }
        .about-hero h1 { color: #fff; max-width: 640px; margin-bottom: 0.75rem; }
        .about-hero p { color: rgba(255,255,255,.8); max-width: 560px; }

        /* Mission/Vision */
        .mv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 3rem; }
        .mv-card { border-radius: var(--radius-md); padding: 2.25rem; border: 1px solid var(--border); }
        .mv-card-mission { background: #f0f7ff; border-color: #bfdbfe; }
        .mv-card-vision  { background: #f0fdf4; border-color: #bbf7d0; }
        .mv-card-eyebrow { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.75rem; }
        .mv-card-mission .mv-card-eyebrow { color: var(--wfp-blue); }
        .mv-card-vision  .mv-card-eyebrow { color: var(--wfp-green); }
        .mv-card h3 { margin-bottom: 0.75rem; }
        .mv-card p  { color: var(--text-secondary); line-height: 1.75; }

        /* Challenge stats */
        .challenge-panel { background: var(--wfp-navy); color: rgba(255,255,255,.8); padding: 4rem 0; }
        .challenge-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .challenge-item { padding: 2rem; border-left: 1px solid rgba(255,255,255,.1); }
        .challenge-item:first-child { border-left: none; }
        .challenge-big { font-size: 3rem; font-weight: 900; color: var(--wfp-gold); letter-spacing: -0.04em; line-height: 1; margin-bottom: 0.5rem; }
        .challenge-label { font-size: 0.95rem; font-weight: 600; color: #fff; margin-bottom: 0.4rem; }
        .challenge-desc { font-size: 0.83rem; color: rgba(255,255,255,.55); line-height: 1.6; }

        /* Timeline */
        .timeline { display: flex; flex-direction: column; gap: 0; margin-top: 3rem; }
        .timeline-item { display: grid; grid-template-columns: 80px 1fr; gap: 1.5rem; padding: 1.75rem 0; border-bottom: 1px solid var(--border); align-items: start; }
        .timeline-item:last-child { border-bottom: none; }
        .timeline-year { font-size: 1rem; font-weight: 800; color: var(--wfp-blue); padding-top: 0.15rem; }
        .timeline-event { font-size: 0.925rem; color: var(--text-secondary); line-height: 1.7; }

        /* Objectives */
        .objectives-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-top: 2.5rem; }
        .objective-item { display: flex; align-items: flex-start; gap: 1rem; padding: 1.5rem; background: #fff; border: 1px solid var(--border-light); border-radius: var(--radius-md); transition: box-shadow .2s, transform .2s; }
        .objective-item:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
        .objective-icon { font-size: 1.4rem; flex-shrink: 0; margin-top: 0.1rem; }
        .objective-text { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.65; }

        /* Governance */
        .governance-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; margin-top: 2.5rem; }
        .governance-card { background: #fff; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.75rem; text-align: center; }
        .governance-logo { height: 60px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; filter: grayscale(100%); opacity: 0.8; transition: all 0.3s; }
        .governance-card:hover .governance-logo { filter: grayscale(0%); opacity: 1; }
        .governance-name { font-size: 0.95rem; font-weight: 700; margin-bottom: 0.35rem; }
        .governance-role { font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; }

        @media (max-width: 900px) {
          .about-hero { height: 380px; }
          .mv-grid { grid-template-columns: 1fr; }
          .challenge-row { grid-template-columns: 1fr; }
          .objectives-grid { grid-template-columns: 1fr; }
          .governance-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

            {/* ── Full-width hero ── */}
            <div className="about-hero">
                <Image src="/about-hero.png" alt="NFA meeting" fill style={{ objectFit: 'cover' }} priority />
                <div className="about-hero-overlay" />
                <div className="about-hero-content">
                    <div className="container">
                        <div className="breadcrumb">
                            <Link href="/">Home</Link>
                            <span className="breadcrumb-sep">›</span>
                            <span>About</span>
                        </div>
                        <h1>About the National Fortification Project</h1>
                        <p>{about?.hero_tagline || 'A coordinated national effort to eliminate micronutrient malnutrition through food fortification — for every Nigerian, in every community.'}</p>
                    </div>
                </div>
            </div>

            {/* ── Mission & Vision ── */}
            <section className="section">
                <div className="container">
                    <p className="section-eyebrow">Who We Are</p>
                    <h2 className="section-title">Purpose-driven. Evidence-based.</h2>
                    <p className="section-lead">The National Fortification Alliance (NFA) coordinates Nigeria's mandatory food fortification program, aligning food industry, government, and development partners under a single national framework.</p>
                    <div className="mv-grid">
                        <div className="mv-card mv-card-mission">
                            <div className="mv-card-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Icon name="globe" size={16} /> OUR MISSION
                            </div>
                            <h3>Eliminate Hidden Hunger</h3>
                            <p>{about?.mission || 'To coordinate and champion the fortification of staple foods with essential vitamins and minerals in Nigeria, ensuring every citizen has access to nutritious food — regardless of their income or location.'}</p>
                        </div>
                        <div className="mv-card mv-card-vision">
                            <div className="mv-card-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Icon name="sun" size={16} /> OUR VISION
                            </div>
                            <h3>A Nourished Nigeria</h3>
                            <p>{about?.vision || 'A Nigeria where micronutrient malnutrition is eliminated through sustainable, large-scale food fortification — where nutritious food is not a privilege but a standard.'}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── The Challenge ── */}
            <div className="challenge-panel">
                <div className="container">
                    <p className="section-eyebrow" style={{ color: 'var(--wfp-gold)' }}>The Scale of the Problem</p>
                    <h2 style={{ color: '#fff' }}>Nigeria's Hidden Hunger Crisis</h2>
                    <div className="challenge-row" style={{ marginTop: '2.5rem' }}>
                        <div className="challenge-item">
                            <div className="challenge-big">37%</div>
                            <div className="challenge-label">Child Stunting Rate</div>
                            <div className="challenge-desc">37% of children under 5 are stunted — one of the highest rates in sub-Saharan Africa.</div>
                        </div>
                        <div className="challenge-item">
                            <div className="challenge-big">30%</div>
                            <div className="challenge-label">Vitamin A Deficiency</div>
                            <div className="challenge-desc">Nearly 1 in 3 children are Vitamin A deficient, risking blindness, immune weakness, and developmental impact.</div>
                        </div>
                        <div className="challenge-item">
                            <div className="challenge-big">72%</div>
                            <div className="challenge-label">Women with Anaemia</div>
                            <div className="challenge-desc">72% of women of reproductive age are anaemic, primarily due to iron deficiency — with serious maternal and infant health consequences.</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Background / History ── */}
            <section className="section" style={{ background: 'var(--bg-off)' }}>
                <div className="container">
                    <p className="section-eyebrow">Our History</p>
                    <h2 className="section-title">Two Decades of Progress</h2>
                    <p className="section-lead">{about?.background || 'From a regulatory mandate to a nationwide movement — the NFP has grown from a policy document into a living, operational system reaching millions of Nigerians.'}</p>
                    <div className="timeline">
                        {TIMELINE.map((t) => (
                            <div key={t.year} className="timeline-item">
                                <div className="timeline-year">{t.year}</div>
                                <div className="timeline-event">{t.event}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Key Objectives ── */}
            <section className="section">
                <div className="container">
                    <p className="section-eyebrow">Strategic Priorities</p>
                    <h2 className="section-title">What We Are Working Towards</h2>
                    <div className="objectives-grid">
                        {OBJECTIVES.map((o, i) => (
                            <div key={i} className="objective-item">
                                <span className="objective-icon" style={{ color: 'var(--wfp-blue)' }}><Icon name={o.icon} size={24} /></span>
                                <span className="objective-text">{o.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Governance ── */}
            <section className="section" style={{ background: 'var(--bg-off)', paddingTop: '3rem', paddingBottom: '4rem' }}>
                <div className="container">
                    <p className="section-eyebrow">Governance</p>
                    <h2 className="section-title">Who Runs the NFA</h2>
                    <div className="governance-grid">
                        {LEADERSHIP.map((l) => (
                            <Link key={l.name} href={l.name === 'NFA Secretariat' ? '/about/secretariat' : '#'} className="governance-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                                <div className="governance-logo">
                                    <Image src={l.src} alt={l.name} width={l.width} height={l.height} style={{ objectFit: 'contain' }} />
                                </div>
                                <div className="governance-name">{l.name}</div>
                                <div className="governance-role">{l.role}</div>
                                {l.name === 'NFA Secretariat' && (
                                    <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--wfp-blue)', fontWeight: 700 }}>View Team ›</div>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Team Members ── */}
            {team.length > 0 && (
                <section className="section">
                    <div className="container">
                        <p className="section-eyebrow">Our Team</p>
                        <h2 className="section-title">Leadership & Focal Points</h2>
                        <div className="governance-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
                            {team.map((m) => (
                                <div key={m.id} className="governance-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                    {m.image && (
                                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1.25rem', position: 'relative' }}>
                                            <Image src={getStrapiMediaUrl(m.image.url)} alt={m.name} fill style={{ objectFit: 'cover' }} />
                                        </div>
                                    )}
                                    <h4 style={{ marginBottom: '0.25rem' }}>{m.name}</h4>
                                    <div className="governance-role" style={{ color: 'var(--wfp-blue)', fontWeight: 700 }}>{m.role}</div>
                                    {m.bio && <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: 1.5 }}>{m.bio}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── CTA ── */}
            <div style={{ background: 'var(--wfp-navy)', padding: '4rem 0' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                    <div>
                        <h3 style={{ color: '#fff', marginBottom: '0.4rem' }}>Want to know more or get involved?</h3>
                        <p style={{ color: 'rgba(255,255,255,.65)', margin: 0 }}>Our team is ready to answer your questions and explore paths to collaboration.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', flexShrink: 0 }}>
                        <Link href="/partners" className="btn btn-outline-white">Meet Our Partners</Link>
                        <Link href="/contact" className="btn btn-white">Contact the NFA</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
