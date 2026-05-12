'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Governance', href: '/about/governance' },
  { label: 'Initiatives', href: '/initiatives' },
  { label: 'News & Events', href: '/news' },
  { label: 'Guidelines', href: '/guidelines' },
  { label: 'Partners', href: '/partners' },
];

export default function Header({ siteName }: { siteName: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isHome = pathname === '/';

  return (
    <>
      <style>{`
        /* ── Announcement bar ── */
        .announce-bar {
          background: var(--wfp-blue);
          color: rgba(255,255,255,.9);
          font-size: 0.78rem;
          font-weight: 500;
          padding: 0.5rem 0;
          letter-spacing: 0.01em;
        }
        .announce-inner {
          display: flex; justify-content: space-between; align-items: center;
          gap: 1rem;
        }
        .announce-links { display: flex; gap: 1.5rem; }
        .announce-links a { color: rgba(255,255,255,.8); transition: color .15s; }
        .announce-links a:hover { color: #fff; }

        /* ── Main header ── */
        .site-header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          transition: all 0.35s var(--ease-out);
        }
        .header-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 1.5rem; max-width: var(--container);
          margin: 0 auto; height: 68px; gap: 2rem;
        }
        /* Transparent on hero, white after scroll or on inner pages */
        .header-transparent .header-wrap { background: transparent; }
        .header-opaque .header-wrap,
        .header-scrolled .header-wrap {
          background: #fff;
          box-shadow: 0 1px 0 var(--border), var(--shadow-sm);
        }
        .header-wrap {
          transition: background 0.35s var(--ease-out), box-shadow 0.35s var(--ease-out);
        }

        /* Logo */
        .logo {
          display: flex; align-items: center; gap: 0.65rem; flex-shrink: 0;
        }
        .logo-emblem {
          width: 42px; height: 42px; border-radius: 10px;
          background: var(--wfp-blue); color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem; font-weight: 800; flex-shrink: 0;
          letter-spacing: -1px;
        }
        .logo-text { line-height: 1.15; }
        .logo-name {
          display: block; font-size: 0.975rem; font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--logo-color, var(--text-primary));
          transition: color 0.35s;
        }
        .logo-sub {
          display: block; font-size: 0.62rem; font-weight: 500;
          text-transform: uppercase; letter-spacing: 0.07em;
          color: var(--logo-sub-color, var(--text-muted));
          transition: color 0.35s;
        }

        /* Nav links */
        .nav-links { display: flex; align-items: center; gap: 0.25rem; }
        .nav-link {
          font-size: 0.9rem; font-weight: 500; padding: 0.45rem 0.85rem;
          border-radius: var(--radius-sm); transition: background .15s, color .15s;
          color: var(--nav-color, var(--text-primary)); white-space: nowrap;
        }
        .nav-link:hover { background: rgba(0,0,0,.05); }
        .nav-link.active { color: var(--wfp-blue); font-weight: 700; }

        /* Light nav removal: Now always uses the standard opaque layout for legibility */
        .header-cta { flex-shrink: 0; }

        /* Contact CTA */
        .header-cta { flex-shrink: 0; }

        /* Hamburger */
        .hamburger {
          display: none; width: 40px; height: 40px; border: none;
          background: transparent; border-radius: var(--radius-sm);
          align-items: center; justify-content: center; flex-direction: column; gap: 5px;
          padding: 0; transition: background .15s;
        }
        .hamburger:hover { background: rgba(0,0,0,.06); }
        .hamburger span {
          display: block; width: 20px; height: 1.5px; border-radius: 2px;
          background: var(--ham-color, var(--text-primary)); transition: all 0.3s;
        }

        /* Mobile menu */
        .mobile-menu {
          background: #fff; border-top: 1px solid var(--border);
          padding: 1rem 0 1.5rem;
        }
        .mobile-menu a {
          display: block; padding: 0.7rem 1.5rem;
          font-size: 0.975rem; font-weight: 500; color: var(--text-primary);
          transition: color .15s, background .15s; border-radius: var(--radius-sm);
          margin: 0 0.5rem;
        }
        .mobile-menu a:hover, .mobile-menu a.active { color: var(--wfp-blue); background: var(--wfp-blue-light); }
        .mobile-cta { padding: 0.75rem 1.5rem; margin-top: 0.5rem; }

        @media (max-width: 800px) {
          .nav-links { display: none; }
          .header-cta .btn { display: none; }
          .hamburger { display: flex; }
          .announce-links { display: none; }
        }
      `}</style>

      {/* Announcement bar */}
      <div className="announce-bar" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1001 }}>
        <div className="container">
          <div className="announce-inner">
            <span>WFP Nigeria · National Fortification Project (NFP)</span>
            <div className="announce-links">
              <a href="https://www.wfp.org" target="_blank" rel="noopener noreferrer">WFP Global</a>
              <a href="https://www.nafdac.gov.ng" target="_blank" rel="noopener noreferrer">NAFDAC</a>
            </div>
          </div>
        </div>
      </div>

      <header
        className={`site-header header-opaque ${scrolled ? 'header-scrolled' : ''}`}
        style={{ top: '32px' }}
      >
        <div className="header-wrap">
          <div className="header-bar">
            {/* Logo */}
            <Link href="/" className="logo">
              <div className="logo-emblem" style={{ background: 'transparent' }}>
                <Image src="/logo.png" alt="NFA Logo" width={42} height={42} style={{ objectFit: 'contain' }} priority />
              </div>
              <div className="logo-text">
                <span className="logo-name">National Fortification Alliance</span>
                <span className="logo-sub">Nigeria · Powered by WFP</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="nav-links">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`nav-link ${pathname === l.href ? 'active' : ''}`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="header-cta">
              <Link href="/contact" className="btn btn-primary btn-sm">Contact Us</Link>
            </div>

            {/* Hamburger */}
            <button
              className="hamburger"
              aria-label="Open menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={pathname === l.href ? 'active' : ''}>
                {l.label}
              </Link>
            ))}
            <div className="mobile-cta">
              <Link href="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Spacer — only on non-home pages */}
      {!isHome && <div style={{ height: '100px' }} />}
    </>
  );
}
