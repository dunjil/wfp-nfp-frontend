import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/Icon';

export const metadata: Metadata = {
    title: 'Governance & Compliance | National Fortification Alliance',
    description: 'Learn about the roles, responsibilities, regulatory monitoring, and industry compliance structure of the NFA Nigeria.',
};

const ROLES = [
    {
        name: 'Standards Organisation of Nigeria (SON)',
        roles: [
            'Elaboration, review, and adoption of standards in collaboration with stakeholders',
            'Monitoring and testing of fortified foods at factory level',
            'Capacity building on food fortification',
            'Funding of laboratory testing and monitoring activities',
            'Secretariat for the USI/IDD Taskforce and Hosting of Taskforce meetings',
            'Collaboration with IPAN on laboratory certification'
        ]
    },
    {
        name: 'National Agency for Food and Drug Administration and Control (NAFDAC)',
        roles: [
            'Issuance of marketing authorization for fortified food products',
            'Registration of micronutrient premixes',
            'Monitoring and testing of fortified foods at retail, distribution, and port levels',
            'Funding of monitoring and laboratory activities',
            'Capacity building for regulatory staff',
            'Secretariat of the National Fortification Alliance',
            'Review and development of fortification regulations'
        ]
    },
    {
        name: 'Federal Ministry of Health and Social Welfare (FMOHSW)',
        roles: [
            'Nutrition policy development',
            'Programme evaluation and impact assessment',
            'Support for NFA coordination and activities'
        ]
    },
    {
        name: 'Federal Competition and Consumer Protection Commission (FCCPC)',
        roles: [
            'Household-level monitoring',
            'Consumer sensitization and awareness creation',
            'Advocacy activities'
        ]
    },
    {
        name: 'Industry',
        roles: [
            'Production and distribution of adequately fortified foods',
            'Sponsorship of NFA activities',
            'Support for food fortification research',
            'Consumer awareness and social marketing'
        ]
    },
    {
        name: 'Development Partners',
        roles: [
            'Technical assistance',
            'Capacity building',
            'Laboratory strengthening',
            'Financial support',
            'Public awareness creation'
        ]
    }
];

const LABS = [
    { name: 'Saag Chemicals', location: 'Lagos', contact: '08025589200' },
    { name: 'Remaben Scientific Services Ltd', location: 'Ikeja', contact: '08023037743' },
    { name: 'Bato Chemical Labs Ltd', location: 'Ogun State', contact: '08091972222' },
    { name: 'Jawura Environmental Services Ltd', location: 'Lagos', contact: '09058592802' },
    { name: 'LS Scientific Limited', location: 'Ikeja', contact: '08094709004' },
    { name: 'Alfa Laboratories', location: 'Lagos', contact: '08023093103' },
    { name: 'Katchey Laboratory', location: 'Ikeja', contact: '08036209410' },
    { name: 'Bureau Veritas Nigeria Ltd', location: 'Ogun State', contact: '08095559245' }
];

const MEETINGS = [
    { year: '2026', june: 'NAFDAC', december: 'Industry' },
    { year: '2027', june: 'SON', december: 'FCCPC' },
    { year: '2028', june: 'FMoHSW', december: 'NAFDAC' }
];

const CHALLENGES = [
    'Scarcity of Vitamin A Palmitate',
    'Foreign exchange constraints affecting premix supply',
    'Technical limitations in fortification equipment',
    'Inconsistencies in laboratory analytical results',
    'Challenges with shelf-life stability studies',
    'Packaging and storage limitations',
    'Inconsistent customs tariff implementation',
    'Inadequate monitoring of imported products',
    'Informal retail packaging challenges',
    'Technical capacity gaps in micronutrient testing'
];

export default function GovernancePage() {
    return (
        <main className="governance-page">
            <style>{`
                .gov-hero {
                    position: relative;
                    background: var(--wfp-navy);
                    color: #fff;
                    padding: 6rem 0 4rem;
                    text-align: center;
                }
                .hero-title {
                    font-size: 2.8rem;
                    font-weight: 900;
                    margin-bottom: 1rem;
                }
                .hero-subtitle {
                    font-size: 1.15rem;
                    color: rgba(255,255,255,0.7);
                    max-width: 700px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                .roles-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 2rem;
                    margin-top: 3rem;
                }
                .role-card {
                    background: #fff;
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-lg);
                    padding: 2rem;
                    box-shadow: var(--shadow-sm);
                }
                .role-card h3 {
                    color: var(--wfp-blue);
                    font-size: 1.25rem;
                    margin-bottom: 1.25rem;
                    border-bottom: 2px solid var(--wfp-blue-light);
                    padding-bottom: 0.75rem;
                }
                .role-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .role-list li {
                    position: relative;
                    padding-left: 1.5rem;
                    margin-bottom: 0.75rem;
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                    line-height: 1.5;
                }
                .role-list li::before {
                    content: "•";
                    color: var(--wfp-gold);
                    font-weight: bold;
                    font-size: 1.5rem;
                    position: absolute;
                    left: 0;
                    top: -4px;
                }

                .monitoring-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem;
                    margin-top: 2.5rem;
                }
                .monitor-card {
                    background: var(--wfp-blue);
                    color: #fff;
                    padding: 2rem;
                    border-radius: var(--radius-md);
                    text-align: center;
                }
                .monitor-card:nth-child(2) { background: var(--wfp-navy); }
                .monitor-card:nth-child(3) { background: var(--wfp-green); }
                
                .monitor-card h3 { font-size: 1.2rem; margin-bottom: 1rem; }
                .monitor-card p { opacity: 0.9; font-size: 0.95rem; }

                .table-container {
                    overflow-x: auto;
                    margin-top: 2rem;
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-md);
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    background: #fff;
                }
                th, td {
                    padding: 1rem;
                    text-align: left;
                    border-bottom: 1px solid var(--border-light);
                }
                th {
                    background: var(--bg-off);
                    font-weight: 700;
                    color: var(--text-primary);
                }
                tr:last-child td { border-bottom: none; }
                
                .challenges-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1rem;
                    margin-top: 2rem;
                }
                .challenge-item {
                    background: #fff;
                    padding: 1rem;
                    border: 1px solid var(--border-light);
                    border-left: 4px solid var(--wfp-red, #dc2626);
                    border-radius: 4px;
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                }

                @media (max-width: 900px) {
                    .monitoring-grid { grid-template-columns: 1fr; }
                }
            `}</style>

            <div className="gov-hero">
                <div className="container">
                    <div className="breadcrumb" style={{ justifyContent: 'center', margin-bottom: '2rem' }}>
                        <Link href="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Home</Link>
                        <span className="breadcrumb-sep" style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
                        <Link href="/about" style={{ color: 'rgba(255,255,255,0.6)' }}>About</Link>
                        <span className="breadcrumb-sep" style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
                        <span style={{ color: '#fff' }}>Governance & Compliance</span>
                    </div>
                    <h1 className="hero-title">Governance & Compliance</h1>
                    <p className="hero-subtitle">
                        An overview of the roles, responsibilities, monitoring systems, and industry framework that ensure the effectiveness of the National Fortification Alliance.
                    </p>
                </div>
            </div>

            {/* Roles and Responsibilities */}
            <section className="section">
                <div className="container">
                    <p className="section-eyebrow">Accountability</p>
                    <h2 className="section-title">Roles and Responsibilities</h2>
                    <p className="section-lead">The success of the National Fortification Project relies on clearly defined roles across all stakeholder groups.</p>
                    
                    <div className="roles-grid">
                        {ROLES.map((role, idx) => (
                            <div key={idx} className="role-card">
                                <h3>{role.name}</h3>
                                <ul className="role-list">
                                    {role.roles.map((r, rIdx) => (
                                        <li key={rIdx}>{r}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Regulatory Monitoring System */}
            <section className="section" style={{ background: 'var(--bg-off)' }}>
                <div className="container">
                    <p className="section-eyebrow" style={{ color: 'var(--wfp-blue)' }}>Compliance</p>
                    <h2 className="section-title">Regulatory Monitoring System</h2>
                    <p className="section-lead">According to the NFA Regulatory Framework, food fortification monitoring in Nigeria operates across three major levels to ensure product quality from production to consumption.</p>
                    
                    <div className="monitoring-grid">
                        <div className="monitor-card">
                            <div style={{ marginBottom: '1rem' }}><Icon name="settings" size={32} /></div>
                            <h3>Factory Level</h3>
                            <p>Conducted by the <strong>Standards Organisation of Nigeria (SON)</strong> to ensure compliance during the production process.</p>
                        </div>
                        <div className="monitor-card">
                            <div style={{ marginBottom: '1rem' }}><Icon name="truck" size={32} /></div>
                            <h3>Distribution & Retail</h3>
                            <p>Conducted by the <strong>National Agency for Food and Drug Administration and Control (NAFDAC)</strong> at market and port levels.</p>
                        </div>
                        <div className="monitor-card">
                            <div style={{ marginBottom: '1rem' }}><Icon name="home" size={32} /></div>
                            <h3>Household Level</h3>
                            <p>Conducted by the <strong>Federal Competition and Consumer Protection Commission (FCCPC)</strong> and Federal Ministry of Education (FME).</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Approved Labs */}
            <section className="section">
                <div className="container">
                    <p className="section-eyebrow">Quality Assurance</p>
                    <h2 className="section-title">Approved Micronutrient Laboratories</h2>
                    <p className="section-lead">
                        The NFA, in collaboration with the Institute of Public Analysts of Nigeria (IPAN), recognizes accredited laboratories supporting micronutrient analysis and compliance monitoring.
                    </p>
                    
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Laboratory Name</th>
                                    <th>Location</th>
                                    <th>Contact</th>
                                </tr>
                            </thead>
                            <tbody>
                                {LABS.map((lab, idx) => (
                                    <tr key={idx}>
                                        <td><strong>{lab.name}</strong></td>
                                        <td>{lab.location}</td>
                                        <td>{lab.contact}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Biannual Meetings & Challenges */}
            <section className="section" style={{ background: 'var(--bg-off)' }}>
                <div className="container">
                    <div className="roles-grid" style={{ marginTop: 0, gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
                        
                        {/* Meetings */}
                        <div>
                            <p className="section-eyebrow">Collaboration</p>
                            <h2 style={{ marginBottom: '1.5rem' }}>NFA Biannual Meetings</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                The Alliance convenes twice yearly to review programme implementation, discuss technical updates, strengthen coordination, review compliance, and agree on strategic actions.
                            </p>
                            
                            <div className="table-container" style={{ marginTop: '1rem' }}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>June Meeting Host</th>
                                            <th>December Meeting Host</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {MEETINGS.map((m, idx) => (
                                            <tr key={idx}>
                                                <td><strong>{m.year}</strong></td>
                                                <td>{m.june}</td>
                                                <td>{m.december}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Challenges */}
                        <div>
                            <p className="section-eyebrow" style={{ color: 'var(--wfp-red, #dc2626)' }}>Transparency</p>
                            <h2 style={{ marginBottom: '1.5rem' }}>Industry Challenges</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                Identifying and addressing operational hurdles is critical. The NFA actively works to mitigate the following identified industry challenges:
                            </p>
                            <div className="challenges-grid">
                                {CHALLENGES.map((challenge, idx) => (
                                    <div key={idx} className="challenge-item">
                                        {challenge}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}
