import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Braces, Check,
  ChevronDown, Code2, Cpu, Github, Globe2, Instagram, Linkedin, Mail, Menu, Radio,
  Terminal, X, Zap
} from "lucide-react";
import { navItems, profile } from "./data.js";
import { portfolioAssets } from "./portfolioAssets.js";

const iconMap = { code: Code2, cpu: Cpu, zap: Zap, terminal: Terminal, globe: Globe2, github: Github, brackets: Braces, leetcode: Code2, radio: Radio, menu: Menu, close: X };

export function Icon({ name, size = 18, ...props }) {
  const IconComponent = iconMap[name] || Code2;
  return <IconComponent size={size} strokeWidth={1.7} {...props} />;
}

export function ParticleBackground() {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return undefined;

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const stars = [];
    let frame = null;
    let width = 0;
    let height = 0;
    let lastTime = 0;
    let elapsed = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const baseCount = width < 600 ? 220 : width < 1000 ? 290 : 390;
      const count = Math.round(baseCount * (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4 ? 0.78 : 1));
      stars.length = 0;
      for (let i = 0; i < count; i += 1) {
        const depth = Math.random();
        const layer = depth < 0.56 ? 0 : depth < 0.91 ? 1 : 2;
        const radius = layer === 0
          ? 0.22 + Math.random() * 0.38
          : layer === 1
            ? 0.38 + Math.random() * 0.54
            : 0.68 + Math.random() * 0.78;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          layer,
          alpha: 0.2 + Math.random() * 0.46 + layer * 0.08,
          phase: Math.random() * Math.PI * 2,
          twinkle: 0.25 + Math.random() * 0.85,
          vx: (Math.random() - 0.5) * (0.8 + layer * 1.1),
          vy: (Math.random() - 0.5) * (0.7 + layer * 0.9),
          parallax: 0.2 + layer * 0.55,
          color: Math.random() < 0.1 ? "#7957ff" : Math.random() < 0.25 ? "#00d4ff" : "#ffffff"
        });
      }
      if (reduce || document.hidden) draw(0, false);
    };

    const move = (event) => {
      pointer.targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const draw = (timestamp, animate = true) => {
      const delta = lastTime ? Math.min((timestamp - lastTime) / 1000, 0.05) : 0;
      lastTime = timestamp;
      if (animate && !reduce) elapsed += delta;
      pointer.x += (pointer.targetX - pointer.x) * (animate && !reduce ? 0.035 : 1);
      pointer.y += (pointer.targetY - pointer.y) * (animate && !reduce ? 0.035 : 1);
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        if (animate && !reduce) {
          star.x += star.vx * delta;
          star.y += star.vy * delta;
          if (star.x < -2) star.x = width + 2;
          if (star.x > width + 2) star.x = -2;
          if (star.y < -2) star.y = height + 2;
          if (star.y > height + 2) star.y = -2;
        }

        const parallaxX = pointer.x * star.parallax * 8;
        const parallaxY = pointer.y * star.parallax * 5;
        const twinkle = reduce ? 1 : 0.76 + Math.sin(elapsed * star.twinkle + star.phase) * 0.24;
        const opacity = Math.max(0.08, Math.min(0.86, star.alpha * twinkle));
        const x = star.x + parallaxX;
        const y = star.y + parallaxY;

        ctx.globalAlpha = 1;
        if (star.layer === 2) {
          const glow = ctx.createRadialGradient(x, y, 0, x, y, star.radius * 5);
          glow.addColorStop(0, star.color === "#ffffff" ? `rgba(255,255,255,${opacity * 0.32})` : star.color === "#00d4ff" ? `rgba(0,212,255,${opacity * 0.32})` : `rgba(121,87,255,${opacity * 0.32})`);
          glow.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, star.radius * 5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(x, y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    const animate = (timestamp) => {
      frame = null;
      if (document.hidden) return;
      draw(timestamp);
      frame = requestAnimationFrame(animate);
    };
    const start = () => {
      if (reduce || document.hidden || frame !== null) return;
      lastTime = 0;
      frame = requestAnimationFrame(animate);
    };
    const stop = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      lastTime = 0;
    };
    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    resize();
    draw(0, false);
    start();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [reduce]);
  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}

export function Layout({ children }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <div id="main-content">{children}</div>
      <Footer />
    </>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => setMenuOpen(false), [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="nav-shell" aria-label="Main navigation">
        <Link to="/" className="brand" aria-label="Dhilip Kumar home"><span className="brand-mark">DK</span><span className="brand-name">DHILIP<span className="brand-dot">.</span></span></Link>
        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          {navItems.map(([label, path]) => (
            <NavLink key={path} to={path} end={path === "/"} className={({ isActive }) => `nav-link ${isActive || (path === "/projects" && location.pathname.startsWith("/projects/")) ? "active" : ""}`}>{label}</NavLink>
          ))}
          <ResumeLink compact />
        </div>
        <ResumeLink />
        <button type="button" className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
          <AnimatePresence mode="wait" initial={false}><motion.span key={menuOpen ? "x" : "menu"} initial={{ rotate: -35, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 35, opacity: 0 }}><Icon name={menuOpen ? "close" : "menu"} /></motion.span></AnimatePresence>
        </button>
      </nav>
    </header>
  );
}

function ResumeLink({ compact = false }) {
  if (!profile.resumeUrl) return <button className={`button button-small button-outline resume-link resume-unavailable ${compact ? "resume-mobile" : "resume-desktop"}`} type="button" disabled title="Add the resume PDF URL in client/src/data.js to enable this download">Resume <ArrowDownRight size={14} /></button>;
  return <a className={`button button-small button-outline resume-link ${compact ? "resume-mobile" : "resume-desktop"}`} href={profile.resumeUrl} download="Dhilip_Kumar_Resume.pdf">Resume <ArrowDownRight size={14} /></a>;
}

export function Footer() {
  const links = [
    ["GitHub", profile.socials.GitHub, Github],
    ["LinkedIn", profile.socials.LinkedIn, Linkedin],
    ["LeetCode", profile.socials.LeetCode, Braces],
    ["Portfolio source", profile.repositoryUrl, Github],
    ["Instagram", profile.socials.Instagram, Instagram],
    ["Email", profile.email ? `mailto:${profile.email}` : "", Mail]
  ];
  return (
    <footer className="site-footer">
      <div className="footer-top"><Link to="/" className="brand"><span className="brand-mark">DK</span><span className="brand-name">DHILIP<span className="brand-dot">.</span></span></Link><p>Engineering thoughtful systems<br />from signal to solution.</p><div className="footer-socials">{links.filter(([, href]) => href).map(([label, href, IconComp]) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={label}><IconComp size={17} /></a>)}</div></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Dhilip Kumar P.</span><span>Built with curiosity <span className="accent">and current.</span></span><a href="#main-content" className="back-top">Back to top <ArrowDown size={13} className="up-arrow" /></a></div>
    </footer>
  );
}

export function PageShell({ eyebrow, title, lead, children, className = "" }) {
  return <section className={`page-shell ${className}`}><div className="page-heading"><span className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</span><h1>{title}</h1>{lead && <p className="page-lead">{lead}</p>}</div>{children}</section>;
}

export function SectionHeading({ eyebrow, title, right }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{right}</div>;
}

export function ButtonLink({ to, children, secondary = false, ...props }) {
  return <Link to={to} className={`button ${secondary ? "button-outline" : "button-primary"}`} {...props}>{children}<ArrowUpRight size={16} /></Link>;
}

export function Tag({ children }) {
  return <span className="tag">{children}</span>;
}

export function Reveal({ children, delay = 0, className = "" }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

export function ProjectArtwork({ variant, compact = false, image, imageAlt = "Project image" }) {
  if (image) {
    return <div className={`project-art project-art-image ${compact ? "art-compact" : ""}`}><img src={image} alt={imageAlt} loading={compact ? "lazy" : "eager"} /></div>;
  }
  return <div className={`project-art art-${variant || "volt"} ${compact ? "art-compact" : ""}`} aria-hidden="true"><div className="art-grid" /><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-core"><Icon name={variant === "leaf" || variant === "sprout" ? "globe" : variant === "belt" ? "code" : variant === "tilt" ? "zap" : "cpu"} size={compact ? 30 : 42} /></div><div className="art-chip">SYS / {variant?.toUpperCase() || "CORE"}</div><div className="art-crosshair" /></div>;
}

export function ProjectCard({ project }) {
  const image = portfolioAssets.projectImages[project.slug];
  return <Link to={`/projects/${project.slug}`} className="project-card"><ProjectArtwork variant={project.visual} image={image} imageAlt={`${project.name} official project image`} /><div className="project-card-content"><div className="project-meta"><span>{project.category}</span><span>{project.number} / 04</span></div><h3>{project.name}</h3><p>{project.description}</p><div className="project-card-bottom"><span className="status"><i />{project.status}</span><span className="round-arrow"><ArrowUpRight size={17} /></span></div></div></Link>;
}

export function TerminalEgg({ open, onClose }) {
  return <AnimatePresence>{open && <motion.div className="terminal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && onClose()}><motion.div className="terminal-window" initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} role="dialog" aria-modal="true" aria-label="Engineering terminal"><div className="terminal-title"><span><i /><i /><i /></span><span>dk@engineering: ~</span><button aria-label="Close terminal" onClick={onClose}><X size={16} /></button></div><div className="terminal-body"><p><span className="terminal-prompt">dk@portfolio:~$</span> help</p><p className="terminal-output">Curious minds make useful things.</p><p><span className="terminal-prompt">dk@portfolio:~$</span> cat /principles</p><p className="terminal-output">learn continuously<br />build practically<br />solve real problems</p><p className="terminal-ready"><Check size={14} /> SYSTEM READY</p><p className="terminal-hint">Press Esc to close · Ctrl + K to toggle</p></div></motion.div></motion.div>}</AnimatePresence>;
}

export function ScrollHint({ label = "Scroll to explore" }) {
  return <div className="scroll-hint"><span>{label}</span><ChevronDown size={15} /></div>;
}

export function BackLink({ to = "/projects", children = "Back to projects" }) {
  return <Link className="back-link" to={to}><ArrowLeft size={15} />{children}</Link>;
}
