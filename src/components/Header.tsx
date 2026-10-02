import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
];

// Which nav pill to highlight for each section on the page
const NAV_FOR_SECTION: Record<string, string> = {
  hero: 'hero',
  about: 'about',
  expertise: 'about',
  work: 'work',
  contact: '',
};

export function Header() {
  const [active, setActive] = useState('hero');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Thin band across the middle of the screen: whichever section crosses it is "active"
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(NAV_FOR_SECTION[entry.target.id] ?? '');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    Object.keys(NAV_FOR_SECTION).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <header className="hdr">
      <div className="hdr-inner">
        {/* LEFT: title */}
        <button className="hdr-logo" onClick={() => go('hero')} aria-label="Go to top">
          <span className="nav-title">FRANCIS TUMBA</span>
        </button>

        {/* CENTER: glass nav */}
        <nav className="hdr-glass" aria-label="Main">
          {LINKS.map((l) => (
            <button
              key={l.id}
              className={`hdr-link ${active === l.id ? 'active' : ''}`}
              onClick={() => go(l.id)}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* RIGHT: CTA */}
        <button className="nav-cta hdr-cta" onClick={() => go('contact')}>
          GET IN TOUCH <ArrowUpRight size={16} />
        </button>

        {/* Mobile menu button */}
        <button
          className="hdr-burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="hdr-panel">
          {LINKS.map((l) => (
            <button
              key={l.id}
              className={`hdr-link ${active === l.id ? 'active' : ''}`}
              onClick={() => go(l.id)}
            >
              {l.label}
            </button>
          ))}
          <button className="nav-cta hdr-panel-cta" onClick={() => go('contact')}>
            GET IN TOUCH <ArrowUpRight size={16} />
          </button>
        </div>
      )}
    </header>
  );
}
