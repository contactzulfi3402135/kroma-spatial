import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Download,
  Menu,
  MoveUpRight,
  X,
} from 'lucide-react';

const imageUrls = {
  hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
  obsidian: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
  klanghaus: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
  nordic: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  vanguard: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
};

const navLinks = [
  { label: 'Works', href: '#works' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Material Index', href: '#materials' },
  { label: 'Studio', href: '#studio' },
  { label: 'Inquiries', href: '#inquiries' },
];

const projects = [
  {
    id: 'obsidian',
    title: 'The Obsidian Monolith',
    place: 'Kyoto, Japan',
    type: 'RESIDENTIAL',
    facts: '1,420 M²  /  2025',
    categories: ['residential'],
    description:
      'A private gallery and residence carved from Kyoto volcanic basalt and charred Yakisugi cedar, utilizing internal courtyards to capture passive seasonal airflow.',
    image: imageUrls.obsidian,
    alt: 'A sculptural contemporary residence set within a quiet Japanese landscape.',
    ratio: 'wide',
    imagePosition: 'center 54%',
    coordinate: '35.0116° N / 135.7681° E',
    engineer: 'Takeshi Hasegawa',
    architect: 'Mika Yamada',
  },
  {
    id: 'klanghaus',
    title: 'Klanghaus Alpine Sanctuary',
    place: 'Graubünden, Switzerland',
    type: 'ACOUSTIC CIVIC',
    facts: '2,800 M²  /  2024',
    categories: ['acoustic', 'civic'],
    description:
      'A chamber music hall designed with algorithmic timber ribbing that achieves 1.8-second natural acoustic reverberation without electronic amplification.',
    image: imageUrls.klanghaus,
    alt: 'A warm timber pavilion whose structural ribs shape a gathering space.',
    ratio: 'tall',
    imagePosition: 'center 54%',
    coordinate: '46.5988° N / 9.5258° E',
    engineer: 'Nina Keller',
    architect: 'Lukas Frei',
  },
  {
    id: 'nordic',
    title: 'Nordic Monograph Archive',
    place: 'Bergen, Norway',
    type: 'CIVIC LIBRARY',
    facts: '5,600 M²  /  2026',
    categories: ['civic'],
    description:
      'Triple-glazed structural glass and recycled maritime steel framing, optimized to maximize Arctic winter daylight angles.',
    image: imageUrls.nordic,
    alt: 'A precise glass and steel civic building rising against a pale northern sky.',
    ratio: 'tall',
    imagePosition: 'center 47%',
    coordinate: '60.3913° N / 5.3221° E',
    engineer: 'Maren Foss',
    architect: 'Soren Dale',
  },
  {
    id: 'vanguard',
    title: 'Officine Vanguard Archive',
    place: 'Milan, Italy',
    type: 'INDUSTRIAL ADAPTATION',
    facts: '3,100 M²  /  2025',
    categories: ['civic'],
    description:
      'Adaptive reuse of a 1918 locomotive foundry into an open-plan textile archive and research laboratory in cast terrazzo and waxed bronze.',
    image: imageUrls.vanguard,
    alt: 'A reimagined industrial atelier with a large glazed opening and layered concrete surfaces.',
    ratio: 'wide',
    imagePosition: 'center 55%',
    coordinate: '45.4642° N / 9.1900° E',
    engineer: 'Luca Bianchi',
    architect: 'Anna Riva',
  },
];

const filters = [
  { id: 'all', label: 'All Works', count: '04' },
  { id: 'civic', label: 'Cultural & Civic' },
  { id: 'residential', label: 'Residential Monoliths' },
  { id: 'acoustic', label: 'Acoustic Pavilions' },
];

const materials = [
  {
    id: 'quartzite',
    number: '01',
    name: 'Honed Valser Quartzite',
    shortName: 'Valser Quartzite',
    origin: 'Vals, Graubünden · Switzerland',
    image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80',
    alt: 'A close study of pale, honed natural stone with fine mineral variation.',
    composition: 'Comp. strength: 210 MPa / Hand-split finish',
    detail: 'Locally quarried metamorphic stone',
    thermal: '2.10 MJ·m⁻³·K⁻¹',
    note: 'A dense, quiet surface that holds the memory of its Alpine formation in every cleft and crystalline seam.',
  },
  {
    id: 'yakisugi',
    number: '02',
    name: 'Shou Sugi Ban Yakisugi',
    shortName: 'Charred Cypress',
    origin: 'Kyoto Prefecture · Japan',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80',
    alt: 'A deeply toned timber surface with a charred, linear grain.',
    composition: 'Carbonized Japanese cypress / 80-year fire resistance',
    detail: 'Hand-charred and naturally sealed timber',
    thermal: '0.72 MJ·m⁻³·K⁻¹',
    note: 'Fire, grain, and time meet in a protected cedar skin whose texture deepens as the building weathers.',
  },
  {
    id: 'bronze',
    number: '03',
    name: 'Architectural Cast Bronze',
    shortName: 'Cast Bronze',
    origin: 'Navigli Foundry · Milan, Italy',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    alt: 'A close-up of burnished bronze with a softly varied patina.',
    composition: 'Wax-patinated cupro-alloy / Living oxidation finish',
    detail: 'Sand-cast, hand-waxed cupro-alloy',
    thermal: '3.34 MJ·m⁻³·K⁻¹',
    note: 'A living metal chosen for its capacity to register touch, air, and the slow passage of time.',
  },
];

function formatClock(timeZone) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(new Date());
}

function StudioClocks() {
  const [times, setTimes] = useState({ zurich: formatClock('Europe/Zurich'), kyoto: formatClock('Asia/Tokyo') });

  useEffect(() => {
    const update = () => {
      setTimes({ zurich: formatClock('Europe/Zurich'), kyoto: formatClock('Asia/Tokyo') });
    };
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="studio-clocks" aria-label="Local studio times">
      <span className="clock-radar" aria-hidden="true" />
      <span>ZRH {times.zurich}</span>
      <span className="clock-divider" aria-hidden="true">/</span>
      <span>KYO {times.kyoto}</span>
    </div>
  );
}

function ImageWithSkeleton({ src, alt, className = '', imageClassName = '', loading = 'lazy', style }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`image-frame ${className}`} style={style}>
      <div className={`image-skeleton ${loaded ? 'image-skeleton-hidden' : ''}`} aria-hidden="true" />
      <img
        className={`image-fill ${loaded ? 'image-loaded' : ''} ${imageClassName}`}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />
    </div>
  );
}

function CornerMark({ className = '' }) {
  return (
    <svg className={`corner-mark ${className}`} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 2v16M2 10h16" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="10" cy="10" r="2.3" fill="#0B0B0D" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function WireframeOverlay({ active }) {
  return (
    <svg className={`wireframe-overlay ${active ? 'wireframe-visible' : ''}`} viewBox="0 0 440 560" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id="architectural-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="#F5F5F0" strokeWidth="0.45" opacity="0.64" />
          <circle cx="0" cy="0" r="1" fill="#F5F5F0" opacity="0.75" />
        </pattern>
      </defs>
      <rect width="440" height="560" fill="url(#architectural-grid)" />
      <path d="M62 456 140 398 258 403 358 346M140 398V194L238 143 358 173V346M238 143v163l120 40M62 456V305l78-56 98 58M62 305l120 18 98-17 78 40M140 194l122 14 96-35M182 323v109m76-126v97" fill="none" stroke="#F5F5F0" strokeWidth="1" opacity="0.74" />
      <path d="m140 194 42 12v120m-42 72 118 5 58-57m-58-91 100-82" fill="none" stroke="#C5A880" strokeWidth="0.8" opacity="0.82" />
    </svg>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((link) => document.querySelector(link.href)).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-22% 0px -62% 0px', threshold: [0, 0.1, 0.3] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
      <div className="header-inner">
        <a className="brand-lockup" href="#hero" aria-label="KROMA Spatial, return to top" onClick={closeMenu}>
          <span className="brand-wordmark">KROMA SPATIAL</span>
          <span className="brand-divider" aria-hidden="true" />
          <StudioClocks />
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className={`nav-link ${active === link.href.slice(1) ? 'nav-link-active' : ''}`}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-inquiry" href="#inquiries">
            <span>Commission Inquiry</span>
            <ArrowUpRight size={13} strokeWidth={1.25} aria-hidden="true" />
          </a>
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={19} strokeWidth={1.25} /> : <Menu size={19} strokeWidth={1.25} />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {navLinks.map((link, index) => (
              <a key={link.href} href={link.href} onClick={closeMenu}>
                <span className="mobile-nav-number">0{index + 1}</span>
                <span>{link.label}</span>
                <ArrowUpRight size={14} strokeWidth={1.25} aria-hidden="true" />
              </a>
            ))}
            <div className="mobile-nav-clock"><StudioClocks /></div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({ reduceMotion }) {
  const [wireframe, setWireframe] = useState(false);

  return (
    <section id="hero" className="hero-section page-shell">
      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="monograph-stamp">
            <span className="stamp-dot" aria-hidden="true" />
            <span>[ MONOGRAPH 2026 // VOL. IV ]</span>
            <span className="stamp-divider">/</span>
            <span className="stamp-subject">ARCHITECTURAL TECTONICS &amp; COMPUTATIONAL MASS</span>
          </div>
          <p className="hero-kicker">Architecture / Spatial engineering / 47° 22′ N</p>
          <h1 className="hero-title">
            We sculpt monolithic space through computational precision and raw materiality.
          </h1>
          <p className="hero-description">
            Operating between Zurich and Kyoto, KROMA engineers public institutions, cultural pavilions, and private residences that honor geographical terroir and stand for generations.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#works">
              <span>Explore monographs</span>
              <ArrowRight size={16} strokeWidth={1.25} aria-hidden="true" />
            </a>
            <a className="manifesto-link" href="/kroma-manifesto.pdf" download>
              <span className="manifesto-icon"><Download size={14} strokeWidth={1.25} aria-hidden="true" /></span>
              <span>Studio manifesto <em>PDF / 3 pages</em></span>
            </a>
          </div>
          <div className="hero-footnote">
            <span>Built from place.</span>
            <span className="hero-footnote-rule" aria-hidden="true" />
            <span>Measured against time.</span>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual-wrap"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-visual-label">
            <span>01 / MASS STUDY</span>
            <span>SWISS PLATEAU · 408 M</span>
          </div>
          <div className="hero-visual group">
            <ImageWithSkeleton
              src={imageUrls.hero}
              alt="A monumental modernist residence framed by raw concrete and carefully controlled daylight."
              className="hero-image-shell"
              imageClassName="hero-photo"
              loading="eager"
            />
            <div className="hero-image-shade" aria-hidden="true" />
            <WireframeOverlay active={wireframe} />
            <CornerMark className="crosshair crosshair-tl" />
            <CornerMark className="crosshair crosshair-tr" />
            <CornerMark className="crosshair crosshair-bl" />
            <CornerMark className="crosshair crosshair-br" />
            <div className="hero-top-index">
              <span className="index-live-dot" />
              <span>FIELD / 01</span>
            </div>
            <button
              type="button"
              className={`wireframe-toggle ${wireframe ? 'wireframe-toggle-on' : ''}`}
              aria-pressed={wireframe}
              onClick={() => setWireframe((current) => !current)}
            >
              <span className="toggle-indicator" aria-hidden="true" />
              <span>[ WIREFRAME / PHYSICAL ]</span>
            </button>
            <div className="hero-image-caption">
              <span>LAT 47.3769° N <span className="caption-divider">//</span> LONG 8.5417° E</span>
              <span>ELEV 408M</span>
            </div>
            <div className="image-side-index" aria-hidden="true">TECTONIC SURVEY / 2026</div>
          </div>
          <div className="hero-visual-foot">
            <span>PLATE 01</span>
            <span>EXPERIMENTAL CONCRETE / LIGHT STUDY</span>
          </div>
        </motion.div>
      </div>

      <div className="hero-stats" aria-label="Studio metrics">
        <div className="stat-cell">
          <span className="stat-label">01. Built Footprint</span>
          <strong>58,400 <small>m²</small></strong>
        </div>
        <div className="stat-cell">
          <span className="stat-label">02. Biennale Honours</span>
          <strong>14 <small>Global selections</small></strong>
        </div>
        <div className="stat-cell">
          <span className="stat-label">03. Carbon Balance</span>
          <strong>Net-zero <small>embodied</small></strong>
        </div>
        <div className="stat-cell">
          <span className="stat-label">04. Active Commissions</span>
          <strong className="stat-locations">Zurich / Kyoto / Oslo</strong>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ number, label, title, aside }) {
  return (
    <div className="section-heading">
      <div className="section-heading-main">
        <p className="section-index"><span>{number}</span><span className="index-slash">//</span>{label}</p>
        <h2>{title}</h2>
      </div>
      {aside && <div className="section-heading-aside">{aside}</div>}
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [specOpen, setSpecOpen] = useState(false);

  return (
    <motion.article
      layout
      className={`project-card ${project.ratio === 'wide' ? 'project-card-wide' : 'project-card-tall'}`}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.18), ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`project-image-wrap project-image-${project.ratio}`}>
        <ImageWithSkeleton
          src={project.image}
          alt={project.alt}
          imageClassName="project-photo"
          style={{ '--image-position': project.imagePosition }}
        />
        <div className="project-image-vignette" aria-hidden="true" />
        <div className="project-image-meta">
          <span className="project-counter">0{index + 1} / 04</span>
          <span className="project-coordinate">{project.coordinate}</span>
        </div>
        <div className="project-badge">[ {project.type} / {project.facts} ]</div>
        <button
          className="project-spec-trigger"
          type="button"
          aria-expanded={specOpen}
          aria-controls={`project-spec-${project.id}`}
          onClick={() => setSpecOpen((open) => !open)}
        >
          <span>{specOpen ? 'CLOSE SPEC' : 'TECH SPEC'}</span><span className="spec-trigger-mark">{specOpen ? '−' : '+'}</span>
        </button>
        <div id={`project-spec-${project.id}`} className={`project-spec-drawer ${specOpen ? 'project-spec-drawer-open' : ''}`} aria-label={`${project.title} technical specification`}>
          <div className="drawer-heading"><span>Technical record</span><ArrowUpRight size={13} strokeWidth={1.25} aria-hidden="true" /></div>
          <div className="drawer-grid">
            <div><span>Structural engineer</span><strong>{project.engineer}</strong></div>
            <div><span>Design architect</span><strong>{project.architect}</strong></div>
            <div><span>Completion</span><strong>{project.facts.split('/').at(-1).trim()}</strong></div>
            <div><span>Gross internal area</span><strong>{project.facts.split('/')[0].trim()}</strong></div>
          </div>
        </div>
      </div>
      <div className="project-caption">
        <div className="project-caption-top">
          <span className="project-place">{project.place}</span>
          <span className="project-ordinal">K / 0{index + 1}</span>
        </div>
        <div className="project-title-row">
          <h3>{project.title}</h3>
          <span className="project-link-mark" aria-hidden="true"><MoveUpRight size={17} strokeWidth={1.25} /></span>
        </div>
        <p>{project.description}</p>
      </div>
    </motion.article>
  );
}

function Works() {
  const [activeFilter, setActiveFilter] = useState('all');
  const visibleProjects = projects.filter((project) => activeFilter === 'all' || project.categories.includes(activeFilter));

  return (
    <section id="works" className="works-section page-shell section-rule">
      <SectionHeading
        number="02"
        label="INDEX OF COMPLETED WORKS"
        title="Permanence in Concrete, Timber, and Light."
        aside={<span>SELECTED BUILT WORK / 2024—26</span>}
      />
      <div className="works-toolbar">
        <p className="toolbar-note"><span className="toolbar-ruler" aria-hidden="true" /> Four commissions, four distinct geographies.</p>
        <div className="filter-list" role="tablist" aria-label="Filter projects">
          {filters.map((filter) => (
            <button
              className={`filter-tab ${activeFilter === filter.id ? 'filter-tab-active' : ''}`}
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            >
              <span>{filter.label}</span>
              {filter.count && <small>({filter.count})</small>}
            </button>
          ))}
        </div>
      </div>
      <motion.div className={`projects-grid ${activeFilter !== 'all' ? 'projects-grid-filtered' : ''} ${activeFilter !== 'all' && visibleProjects.length === 1 ? 'projects-grid-single' : ''}`} layout>
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </AnimatePresence>
      </motion.div>
      <div className="works-endnote">
        <span>END OF INDEX</span>
        <span>04 / 04</span>
      </div>
    </section>
  );
}

function MaterialArchive() {
  const [activeMaterial, setActiveMaterial] = useState(materials[0]);

  return (
    <section id="materials" className="materials-section page-shell section-rule">
      <div className="materials-grid">
        <div className="materials-intro">
          <p className="section-index"><span>03</span><span className="index-slash">//</span>MATERIAL ARCHIVE</p>
          <h2>Material is not a finish. It is a record of place.</h2>
          <p className="materials-intro-copy">
            KROMA begins with matter in its native terrain. We work with quarries, sawyers, and foundries whose methods preserve provenance, repairability, and the tactile evidence of making.
          </p>
          <div className="sourcing-note">
            <span className="sourcing-note-line" aria-hidden="true" />
            <div><span>PROCUREMENT PRINCIPLE</span><p>Source locally. Fabricate slowly. Let weather complete the surface.</p></div>
          </div>
          <p className="archive-reference">MATERIAL INDEX <span>03 SAMPLES / VOL. IV</span></p>
        </div>

        <div className="material-interface">
          <AnimatePresence mode="wait">
            <motion.div
              className="material-preview"
              key={activeMaterial.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              aria-live="polite"
            >
              <div className="material-image-wrap">
                <ImageWithSkeleton
                  src={activeMaterial.image}
                  alt={activeMaterial.alt}
                  imageClassName="material-photo"
                />
                <span className="material-image-id">K / MAT—{activeMaterial.number}</span>
                <span className="material-image-scale">MICROTEXTURE / 1:5</span>
                <span className="material-image-cross">+</span>
              </div>
              <div className="material-detail">
                <div className="material-detail-top">
                  <span className="material-number">{activeMaterial.number} / 03</span>
                  <span className="material-live"><span /> ARCHIVE ENTRY</span>
                </div>
                <h3>{activeMaterial.name}</h3>
                <p className="material-origin">{activeMaterial.origin}</p>
                <p className="material-note">{activeMaterial.note}</p>
                <div className="material-specs">
                  <div><span>Composition</span><strong>{activeMaterial.composition}</strong></div>
                  <div><span>Thermal mass · volumetric</span><strong>{activeMaterial.thermal}</strong></div>
                  <div><span>Surface protocol</span><strong>{activeMaterial.detail}</strong></div>
                </div>
                <div className="material-detail-foot">
                  <span>SPECIMEN / {activeMaterial.number}</span>
                  <span>PROVENANCE VERIFIED <Check size={12} strokeWidth={1.25} aria-hidden="true" /></span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="material-selector" role="tablist" aria-label="Select a material specimen">
            {materials.map((material) => (
              <button
                key={material.id}
                type="button"
                role="tab"
                aria-selected={activeMaterial.id === material.id}
                className={`material-choice ${activeMaterial.id === material.id ? 'material-choice-active' : ''}`}
                onClick={() => setActiveMaterial(material)}
              >
                <ImageWithSkeleton src={material.image} alt="" imageClassName="swatch-photo" />
                <span className="material-choice-copy">
                  <span className="material-choice-index">{material.number} / SAMPLE</span>
                  <strong>{material.shortName}</strong>
                  <small>{material.origin.split('·')[0].trim()}</small>
                </span>
                <ChevronRight size={15} strokeWidth={1.25} className="material-choice-arrow" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const principles = [
  {
    number: '01',
    name: 'TECTONIC PURITY',
    copy: 'We eliminate decorative veneer. The structure itself—the load-bearing column, the tension cable, the mass of poured concrete—must serve as the final spatial ornament.',
    annotation: 'STRUCTURE / ORNAMENT',
  },
  {
    number: '02',
    name: 'COMPUTATIONAL DAYLIGHT',
    copy: 'Every fenestration is calculated using bespoke solar simulation algorithms to ensure living spaces interact dynamically with changing equinox light.',
    annotation: 'SOLAR STUDY / EQUINOX',
  },
  {
    number: '03',
    name: 'GEOGRAPHIC INTEGRATION',
    copy: 'A building must belong irrevocably to its coordinates. We source stone within 50km of the site and adapt roof pitches to historical snowfall metrics.',
    annotation: 'SITE / CLIMATE / MATTER',
  },
];

function Philosophy({ reduceMotion }) {
  return (
    <section id="philosophy" className="philosophy-section page-shell section-rule">
      <div className="philosophy-heading">
        <div>
          <p className="section-index"><span>04</span><span className="index-slash">//</span>COMPUTATIONAL PHILOSOPHY</p>
          <h2>Precision is a form of restraint.</h2>
        </div>
        <p className="philosophy-intro">A method of subtraction, calibrated to the enduring intelligence of a site.</p>
      </div>
      <div className="principles-grid">
        {principles.map((principle, index) => (
          <motion.article
            className="principle-card"
            key={principle.number}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="principle-index"><span>{principle.number}</span><span className="principle-index-rule" /></div>
            <h3>{principle.name}</h3>
            <p>{principle.copy}</p>
            <div className="principle-annotation"><span className="annotation-square" />{principle.annotation}</div>
          </motion.article>
        ))}
      </div>
      <div className="philosophy-baseline"><span>DESIGN POSITION / 2026</span><span>FORM FOLLOWS FIELD CONDITIONS</span></div>
    </section>
  );
}

const clientTypes = ['Private Client', 'Cultural Institution', 'Commercial Developer', 'Municipal Authority'];
const scales = ['Under 1,000 m²', '1,000–5,000 m²', '5,000+ m²'];
const investments = ['$2M – $5M', '$5M – $15M', '$15M+'];

function InquiryForm() {
  const [clientType, setClientType] = useState(clientTypes[0]);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const resetDossier = () => {
    formRef.current?.reset();
    setClientType(clientTypes[0]);
    setSubmitted(false);
  };

  return (
    <section id="inquiries" className="inquiry-section page-shell section-rule">
      <div className="inquiry-grid">
        <div className="inquiry-intro">
          <p className="section-index"><span>05</span><span className="index-slash">//</span>PRIVATE COMMISSIONS</p>
          <h2>Begin with the site. Then ask what it can become.</h2>
          <p className="inquiry-copy">
            We accept a limited number of commissions each year. Share the coordinates, ambitions, and constraints of your project; our partners will respond with the right next conversation.
          </p>
          <div className="inquiry-aside-note">
            <div className="inquiry-aside-symbol" aria-hidden="true">
              <svg viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="0.7" />
                <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="0.7" strokeDasharray="1.5 3" />
                <path d="M50 6v88M6 50h88M19 19l62 62M81 19 19 81" stroke="currentColor" strokeWidth="0.7" />
                <circle cx="50" cy="50" r="3" fill="#E25822" />
              </svg>
            </div>
            <div><span>RESPONSE PROTOCOL</span><p>Every brief is reviewed directly by a founding partner within 48 hours.</p></div>
          </div>
          <div className="inquiry-coordinates"><span>47° 22′ 16.8″ N</span><span>08° 32′ 29.8″ E</span><span>ZURICH / KYO</span></div>
        </div>

        <div className="inquiry-form-panel">
          <div className="form-panel-head">
            <div><span>COMMISSION DOSSIER</span><p>FORM K / 01—A</p></div>
            <span className="form-status"><span /> SECURE INTAKE</span>
          </div>
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                ref={formRef}
                key="form"
                className="commission-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                <div className="form-row form-row-2">
                  <label className="form-field">
                    <span>Full name <i>*</i></span>
                    <input name="fullName" type="text" autoComplete="name" placeholder="Name of primary representative" required />
                  </label>
                  <label className="form-field">
                    <span>Representative title <i>*</i></span>
                    <input name="title" type="text" placeholder="Principal, curator, director…" required />
                  </label>
                </div>
                <fieldset className="form-choice-fieldset">
                  <legend>Client typology <i>*</i></legend>
                  <div className="client-type-list">
                    {clientTypes.map((type) => (
                      <button
                        className={`client-type-option ${clientType === type ? 'client-type-selected' : ''}`}
                        type="button"
                        key={type}
                        aria-pressed={clientType === type}
                        onClick={() => setClientType(type)}
                      >
                        <span className="choice-square" aria-hidden="true">{clientType === type ? '✓' : ''}</span>{type}
                      </button>
                    ))}
                  </div>
                  <input type="hidden" name="clientTypology" value={clientType} />
                </fieldset>
                <label className="form-field">
                  <span>Geographic coordinates or city of site <i>*</i></span>
                  <input name="site" type="text" placeholder="City, region, country / known coordinates" required />
                </label>
                <div className="form-row form-row-2 form-radio-row">
                  <fieldset className="form-choice-fieldset">
                    <legend>Anticipated scale <i>*</i></legend>
                    <div className="radio-pill-list">
                      {scales.map((scale, index) => (
                        <label className="radio-pill" key={scale}>
                          <input type="radio" name="scale" value={scale} required={index === 0} />
                          <span>{scale}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset className="form-choice-fieldset">
                    <legend>Investment bracket <i>*</i></legend>
                    <div className="radio-pill-list">
                      {investments.map((investment, index) => (
                        <label className="radio-pill" key={investment}>
                          <input type="radio" name="investment" value={investment} required={index === 0} />
                          <span>{investment}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
                <label className="form-field form-field-textarea">
                  <span>Project vision &amp; brief <i>*</i></span>
                  <textarea name="vision" rows="4" placeholder="Describe the intended use, the conditions of the site, and the qualities you hope the architecture will hold." required />
                </label>
                <div className="form-submit-row">
                  <p>By transmitting this dossier, you agree to a confidential partner review.</p>
                  <button className="form-submit" type="submit">
                    <span>Transmit commission dossier</span>
                    <ArrowUpRight size={16} strokeWidth={1.25} aria-hidden="true" />
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="verification-screen"
                role="status"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="verification-check"><Check size={23} strokeWidth={1.25} aria-hidden="true" /></div>
                <p className="verification-eyebrow">TRANSMISSION COMPLETE / 2026</p>
                <h3>Thank you. The dossier is in review.</h3>
                <div className="verification-record">
                  <div><span>STATUS</span><strong>COMMISSION DOSSIER TRANSMITTED</strong></div>
                  <div><span>CASE IDENTIFIER</span><strong>KS-2026-CH-892</strong></div>
                  <div><span>PARTNER REVIEW</span><strong>Elena Vance &amp; Kenzo Mori review new briefs within 48 hours.</strong></div>
                </div>
                <button className="new-dossier-button" type="button" onClick={resetDossier}>Start a new dossier <ArrowRight size={14} strokeWidth={1.25} /></button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="studio" className="site-footer">
      <div className="footer-inner page-shell">
        <div className="footer-topline"><span>ARCHITECTURAL COLOPHON</span><span>KROMA / ZRH — KYO</span></div>
        <div className="footer-grid">
          <div className="footer-column footer-identity">
            <a className="footer-wordmark" href="#hero">KROMA<br /><span>SPATIAL</span></a>
            <p>Architecture AG<br />Swiss registration UID: CHE-492.183.091<br />Kyoto Board Lic. 2026-88</p>
          </div>
          <div className="footer-column">
            <span className="footer-label">STUDIO LOCATIONS</span>
            <p><strong>Zurich</strong><br />Rämistrasse 44<br />8001 Zürich, Switzerland</p>
            <p><strong>Kyoto</strong><br />Nakagyo Ward<br />Kyoto 604-8005, Japan</p>
          </div>
          <div className="footer-column">
            <span className="footer-label">DIRECT INQUIRIES</span>
            <a href="mailto:commissions@kroma-spatial.ch">commissions@kroma-spatial.ch <ArrowUpRight size={12} strokeWidth={1.25} /></a>
            <a href="mailto:press@kroma-spatial.ch">press@kroma-spatial.ch <ArrowUpRight size={12} strokeWidth={1.25} /></a>
            <span className="footer-label footer-label-spaced">PARTNER HOURS</span>
            <p>Monday—Friday<br />09:00–18:00 CET</p>
          </div>
          <div className="footer-column footer-colophon">
            <span className="footer-label">COLOPHON</span>
            <p>Set in Space Grotesk, Plus Jakarta Sans, and JetBrains Mono. Built with custom React and Tailwind. Net-zero digital host.</p>
            <div className="footer-stamp"><span className="footer-stamp-dot" /> MATERIAL / LIGHT / TIME</div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 KROMA SPATIAL ARCHITECTURE AG. ALL RIGHTS RESERVED.</span>
          <a href="#hero">BACK TO DATUM <ArrowDown size={12} strokeWidth={1.25} className="back-to-top-icon" /></a>
          <span>DESIGNED FOR DURATION / VOL. IV</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="site-frame">
      <Header />
      <main>
        <Hero reduceMotion={reduceMotion} />
        <Works />
        <MaterialArchive />
        <Philosophy reduceMotion={reduceMotion} />
        <InquiryForm />
      </main>
      <Footer />
    </div>
  );
}
