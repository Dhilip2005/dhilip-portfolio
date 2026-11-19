import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness, CalendarDays, Check,
  ChevronRight, CircuitBoard, Code2, Cpu, ExternalLink, FolderKanban, Github, GraduationCap,
  Linkedin, Mail, MapPin, Radio, School, Send, Sparkles, Trophy, Zap
} from "lucide-react";
import {
  achievements, codingProfiles, experiences, profile, projects, skillGroups
} from "./data.js";
import {
  BackLink, ButtonLink, Icon, PageShell, ProjectArtwork, ProjectCard, Reveal,
  ScrollHint, SectionHeading, Tag
} from "./components.jsx";
import { InteractiveImage } from "./InteractiveImage.jsx";
import { openImageLightbox } from "./ImageLightbox.jsx";
import { portfolioAssets } from "./portfolioAssets.js";

const HeroVisual = lazy(() => import("./HeroVisual.jsx"));
const rotatingRoles = ["Embedded Systems Enthusiast.", "IoT Developer.", "Electronics Explorer.", "Hardware-Software Integrator."];

function ResumeAction({ secondary = false }) {
  if (profile.resumeUrl) return <a className={`button ${secondary ? "button-outline" : "button-primary"}`} href={profile.resumeUrl} download="Dhilip_Kumar_Resume.pdf">Download resume <ArrowDownRight size={16} /></a>;
  return <button className={`button ${secondary ? "button-outline" : "button-primary"} button-unavailable`} type="button" disabled title="Add your resume PDF at the configured resume URL to enable download">Resume PDF not configured <ArrowDownRight size={16} /></button>;
}

function SocialLinks({ compact = false }) {
  const items = [
    ["GitHub", profile.socials.GitHub, Github],
    ["LinkedIn", profile.socials.LinkedIn, Linkedin],
    ["LeetCode", profile.socials.LeetCode, Code2],
    ["Instagram", profile.socials.Instagram, Sparkles]
  ];
  return <div className={`social-links ${compact ? "social-compact" : ""}`}>{items.map(([name, url, SocialIcon]) => url ? <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={name}><SocialIcon size={17} />{!compact && <span>{name}</span>}</a> : <span className="social-unset" key={name} title={`${name} URL can be configured in client/src/data.js`} aria-label={`${name} link not configured`}><SocialIcon size={17} /></span>)}</div>;
}

function CodeSymbol(props) {
  return <span className="code-symbol" {...props}>{"</>"}</span>;
}

const journeyHighlights = [
  { value: 7, label: "Projects Built", description: "Hands-on engineering and technology projects.", icon: FolderKanban },
  { value: 5, label: "Hackathons & Innovation", description: "Participation in innovation challenges and hackathons.", icon: Trophy },
  { value: 15, label: "Technical Events", description: "Technical events, workshops, quizzes, and engineering activities.", icon: CalendarDays },
  { value: 3, label: "Industry Experience", description: "Practical exposure to electronics manufacturing, wind energy, and electrical power systems.", icon: BriefcaseBusiness }
];

function HighlightCard({ highlight, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const HighlightIcon = highlight.icon;

  useEffect(() => {
    if (!inView) return undefined;
    if (reduceMotion) {
      setCount(highlight.value);
      return undefined;
    }

    let frame;
    const start = performance.now();
    const duration = 1100;
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(highlight.value * progress));
      if (progress < 1) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [highlight.value, inView, reduceMotion]);

  return (
    <Reveal delay={index * 0.06}>
      <article className="highlight-card" ref={ref}>
        <span className="highlight-icon"><HighlightIcon size={20} strokeWidth={1.7} /></span>
        <span className="highlight-value" aria-label={`${highlight.value}+`}>{count}<span>+</span></span>
        <h3>{highlight.label}</h3>
        <p>{highlight.description}</p>
        <span className="highlight-index">0{index + 1}</span>
      </article>
    </Reveal>
  );
}

function ProjectVideo({ video }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [playbackError, setPlaybackError] = useState("");

  const play = () => {
    const player = videoRef.current;
    if (!player) return;
    setPlaybackError("");
    player.play().catch(() => {
      setPlaybackError("Playback could not start. Use the video controls to try again.");
    });
  };

  return (
    <article className="voltguard-video-card">
      <div className="voltguard-video-frame">
        <video
          ref={videoRef}
          controls
          playsInline
          preload="none"
          poster={video.poster}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onError={() => setPlaybackError("This video could not be loaded. Please try again later.")}
          aria-label={video.title}
        >
          <source src={video.src} type="video/mp4" />
          Your browser does not support HTML video.
        </video>
        {!playing && <button className="voltguard-play-button" type="button" onClick={play} aria-label={`Play ${video.title}`}><span>PLAY</span><ArrowRight size={17} /></button>}
      </div>
      <div className="voltguard-video-copy">
        <h3>{video.title}</h3>
        <p>{video.description}</p>
        {playbackError && <p className="voltguard-video-error" role="status">{playbackError}</p>}
      </div>
    </article>
  );
}

export function HomePage() {
  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setRoleIndex((value) => (value + 1) % rotatingRoles.length), 3000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> HELLO, I'M DHILIP</div>
          <h1 className="hero-title">DHILIPKUMAR</h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-description">Building practical engineering solutions through<br className="desktop-break" /> electronics, embedded systems, and intelligent technologies.</p>
          <div className="hero-rotator" aria-live="polite"><span className="rotator-mark">/</span><motion.span key={roleIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>{rotatingRoles[roleIndex]}</motion.span></div>
          <div className="hero-actions"><ButtonLink to="/projects">Explore Projects</ButtonLink><ResumeAction secondary /><ButtonLink to="/contact" secondary>Contact Me</ButtonLink></div>
          <SocialLinks />
        </div>
        <Suspense fallback={<div className="hero-visual hero-visual-loading" aria-hidden="true"><div className="visual-loader"><span /><span /><span /></div></div>}><HeroVisual /></Suspense>
        <div className="hero-index"><span>01</span><i /><span>08</span></div>
        <ScrollHint />
      </section>
      <section className="content-section highlights-section">
        <SectionHeading eyebrow="MILESTONES / 01" title="MY JOURNEY SO FAR" />
        <div className="highlights-grid">
          {journeyHighlights.map((highlight, index) => <HighlightCard key={highlight.label} highlight={highlight} index={index} />)}
        </div>
      </section>
      <section className="home-intro content-section">
        <Reveal><div className="intro-index">[ A PRACTICAL ENGINEERING MINDSET ]</div><h2>Connecting the physical world<br />to <span>intelligent technology.</span></h2></Reveal>
        <Reveal delay={0.12}><p className="intro-copy">{profile.intro}</p><Link className="text-link" to="/about">More about me <ArrowRight size={16} /></Link></Reveal>
      </section>
      <section className="content-section featured-section">
        <SectionHeading eyebrow="SELECTED WORK / 01—05" title="Ideas, built into systems." right={<Link to="/projects" className="text-link">All projects <ArrowRight size={15} /></Link>} />
        <div className="project-grid featured-grid">{projects.slice(0, 3).map((project, index) => <Reveal key={project.slug} delay={index * 0.08}><ProjectCard project={project} /></Reveal>)}</div>
      </section>
      <section className="home-cta content-section">
        <div><span className="eyebrow">OPEN TO OPPORTUNITY</span><h2>Let's solve something<br /><span>that matters.</span></h2></div>
        <ButtonLink to="/contact">Start a conversation</ButtonLink>
      </section>
    </>
  );
}

const interests = [
  ["Embedded systems", "cpu", "Turning sensors and microcontrollers into useful, connected products."],
  ["Electronics", "zap", "Exploring circuits, measurement, and the behavior of real systems."],
  ["Industrial automation", "terminal", "Learning how control, monitoring, and safety meet on the factory floor."],
  ["IoT & communication", "radio", "Connecting devices through practical sensing and communication."],
  ["Semiconductor technology", "code", "Curious about the components at the heart of modern electronics."],
  ["Electrical systems", "zap", "Building strong fundamentals in power, machines, and protection."],
  ["Artificial intelligence", "globe", "Exploring computer vision and intelligent system applications."],
  ["Emerging technology", "cpu", "Continuously learning where engineering can go next."]
];

export function AboutPage() {
  return <PageShell eyebrow="ABOUT / 01" title={<>Engineer by study.<br /><span className="text-gradient">Builder by curiosity.</span></>} lead="A little about my engineering journey, the systems I care about, and how I approach problems." className="about-page">
    <div className="about-grid">
      <Reveal className="portrait-panel"><img className="portrait-image" src={profile.portraitUrl} alt="Portrait of Dhilip Kumar P." /><div className="portrait-caption"><span>EEE / STUDENT</span><span>COIMBATORE, INDIA</span></div><span className="portrait-cross">+</span></Reveal>
      <Reveal delay={0.1} className="about-narrative"><span className="eyebrow">THE SHORT VERSION</span><p className="about-statement">{profile.intro}</p><p className="muted">I’m interested in the full path from sensing and circuits to embedded logic, communication, and usable interfaces. I value hands-on learning, clear documentation, and honest engineering.</p><div className="philosophy"><span>MY APPROACH</span><strong>Learn continuously.<br />Build practically.<br />Solve real problems.</strong></div><div className="profile-actions"><ResumeAction secondary /><a className="button button-outline" href={profile.socials.GitHub} target="_blank" rel="noreferrer"><Github size={16} /> GitHub profile <ExternalLink size={14} /></a><a className="button button-outline" href={profile.socials.LeetCode} target="_blank" rel="noreferrer"><Code2 size={16} /> LeetCode <ExternalLink size={14} /></a></div></Reveal>
    </div>
    <div className="content-section about-section">
      <SectionHeading eyebrow="FOUNDATION / 01" title="Education" />
      <div className="education-timeline">
        <Reveal><article className="education-entry">
          <span className="education-entry-icon"><GraduationCap size={20} /></span>
          <div className="education-entry-copy"><span className="mono-label">ENGINEERING / UNDERGRADUATE</span><h3>{profile.degree}</h3><p>{profile.college}, Coimbatore</p><span className="muted small">{profile.educationPeriod}</span></div>
          <strong className="education-grade college-grade">CGPA {profile.cgpa}</strong>
        </article></Reveal>
        <Reveal delay={0.08}><article className="education-entry">
          <span className="education-entry-icon"><School size={19} /></span>
          <div className="education-entry-copy"><span className="mono-label">HIGHER SECONDARY CERTIFICATE</span><h3>HSC</h3><p>Sri Divya Chaitanya Matric Hr. Sec. School</p><span className="muted small">Sholinghur, Ranipet</span></div>
          <strong className="education-grade">90<span>%</span></strong>
        </article></Reveal>
        <Reveal delay={0.16}><article className="education-entry">
          <span className="education-entry-icon"><School size={19} /></span>
          <div className="education-entry-copy"><span className="mono-label">SECONDARY SCHOOL LEAVING CERTIFICATE</span><h3>SSLC</h3><p>Sri Divya Chaitanya Matric Hr. Sec. School</p><span className="muted small">Sholinghur, Ranipet</span></div>
          <strong className="education-grade">96<span>%</span></strong>
        </article></Reveal>
      </div>
    </div>
    <div className="content-section"><SectionHeading eyebrow="CURIOSITY / 02" title="What keeps me exploring." /><div className="interest-grid">{interests.map(([title, icon, description], index) => <Reveal key={title} delay={index * 0.035}><article className="interest-card"><span className="interest-icon"><Icon name={icon} /></span><h3>{title}</h3><p>{description}</p><span className="interest-number">0{index + 1}</span></article></Reveal>)}</div></div>
  </PageShell>;
}

export function SkillsPage() {
  return <PageShell eyebrow="CAPABILITIES / 02" title={<>A toolkit for<br /><span className="text-gradient">building real things.</span></>} lead="A growing set of engineering foundations and development tools. Proficiency is intentionally not reduced to arbitrary percentages." className="skills-page">
    <div className="skills-grid">{skillGroups.map((group, index) => <Reveal key={group.title} delay={index * 0.07}><article className="skill-card"><div className="skill-card-top"><span className="skill-icon"><Icon name={group.icon} size={21} /></span><span className="mono-label">0{index + 1} / 05</span></div><h2>{group.title}</h2><p>{group.description}</p><div className="skill-tags">{group.skills.map((skill) => <Tag key={skill}>{skill}</Tag>)}</div><span className="skill-glow" /></article></Reveal>)}</div>
    <section className="ecosystem"><div><span className="eyebrow">SYSTEMS THINKING / 01</span><h2>From signal<br />to <span>solution.</span></h2><p>Engineering work rarely lives in one box. I enjoy connecting fundamentals across the stack.</p></div><div className="ecosystem-map" aria-label="Technology ecosystem connecting engineering disciplines"><div className="eco-center"><CircuitBoard size={28} /><span>ENGINEERING</span></div><span className="eco-node eco-a"><Cpu size={18} />Hardware</span><span className="eco-node eco-b"><Radio size={18} />Communication</span><span className="eco-node eco-c"><CodeSymbol />Software</span><span className="eco-node eco-d"><Zap size={18} />Electrical</span><i className="eco-line eco-line-a" /><i className="eco-line eco-line-b" /><i className="eco-line eco-line-c" /><i className="eco-line eco-line-d" /></div></section>
  </PageShell>;
}

const categories = ["All", "Embedded Systems", "IoT", "AI / Computer Vision", "Industrial Safety", "Automation"];

export function ProjectsPage() {
  const [category, setCategory] = useState("All");
  const visible = category === "All" ? projects : projects.filter((project) => project.category === category);
  return <PageShell eyebrow="SELECTED WORK / 03" title={<>Engineering ideas.<br /><span className="text-gradient">Made tangible.</span></>} lead="A collection of engineering projects and concepts across embedded systems, electrical safety, automation, and computer vision." className="projects-page">
    <div className="filter-row" role="group" aria-label="Filter projects">{categories.map((item) => <button key={item} type="button" className={`filter-button ${category === item ? "selected" : ""}`} onClick={() => setCategory(item)}>{item}</button>)}</div>
    <div className="project-grid">{visible.map((project, index) => <Reveal key={project.slug} delay={(index % 2) * 0.08}><ProjectCard project={project} /></Reveal>)}</div>
    <div className="projects-external-links"><a className="text-link" href={profile.repositoryUrl} target="_blank" rel="noreferrer">Portfolio source <Github size={15} /><ExternalLink size={14} /></a><a className="text-link" href={profile.socials.GitHub} target="_blank" rel="noreferrer">More on GitHub <Github size={15} /><ExternalLink size={14} /></a></div>
    <p className="disclosure-note"><span className="signal-dot" /> Project stages are labelled as provided; no deployment or performance results are implied.</p>
  </PageShell>;
}

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <NotFoundPage />;
  const projectMedia = project.slug === "voltguard"
    ? portfolioAssets.voltguardMedia
    : { images: portfolioAssets.projectGalleries[project.slug] ?? [], videos: [] };
  const galleryImages = projectMedia.images;
  const openGallery = (current) => openImageLightbox(galleryImages, current);
  return <PageShell eyebrow={`CASE STUDY / ${project.number}`} title={<>{project.name}<span className="title-period">.</span></>} lead={project.title} className={`project-detail-page ${galleryImages.length ? "has-project-media" : ""}`}>
    <BackLink />
    {galleryImages.length > 0 && (
      <section className="voltguard-media-section" aria-label={`${project.name} project media`}>
        <div className="voltguard-media-intro">
          <SectionHeading eyebrow={`PROJECT MEDIA / ${project.number}`} title={project.slug === "voltguard" ? "VoltGuard in Action — Project Gallery" : `${project.name} — Project Gallery`} />
          <p>{project.slug === "voltguard" ? "Bench hardware, overhead-line scenario visualizations, and the proposed monitoring architecture." : `Uploaded project images for ${project.name}.`}</p>
        </div>
        <div className="voltguard-gallery-grid">
          {galleryImages.map((image, index) => (
            <Reveal key={image.src} delay={index * 0.06} className={`voltguard-gallery-item ${index === 0 ? "is-featured" : ""}`}>
              <figure className="voltguard-gallery-card">
                <InteractiveImage
                  src={image.src}
                  alt={image.alt}
                  caption={image.title}
                  className="voltguard-gallery-image"
                  onOpen={({ src }) => openGallery(src)}
                >
                  <span className="voltguard-image-action">VIEW IMAGE <ArrowUpRight size={13} /></span>
                </InteractiveImage>
                <figcaption><strong>{image.title}</strong><span>{image.caption}</span></figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        {project.slug === "voltguard" && <div className="voltguard-proposal-note"><span className="signal-dot" />The mobile-app and web-dashboard connections shown are proposed architecture, not a claim of completed deployment.</div>}
        {projectMedia.videos.length > 0 && <div className="voltguard-video-section">
          <SectionHeading eyebrow={`PROJECT MEDIA / ${Number(project.number) + 1}`} title={`${project.name} — Project Demonstration`} />
          <div className="voltguard-video-grid">
            {projectMedia.videos.map((video) => <Reveal key={video.src}><ProjectVideo video={video} /></Reveal>)}
          </div>
        </div>}
      </section>
    )}
    <div className="case-hero"><ProjectArtwork variant={project.visual} image={portfolioAssets.projectImages[project.slug]} imageAlt={`${project.name} official project image`} /><div className="case-aside"><span className="mono-label">PROJECT STATUS</span><span className="status"><i />{project.status}</span><span className="mono-label">DOMAIN</span><Tag>{project.category}</Tag>    <span className="mono-label">DURATION / SOURCE</span><span className="case-duration">{project.duration}</span>{project.problemId && <><span className="mono-label">PROBLEM / TEAM</span><span className="case-duration">{project.problemId} · {project.team}</span></>}</div></div>    <div className="case-content"><div className="case-main"><section><span className="eyebrow">01 / THE CHALLENGE</span><h2>Problem statement</h2><p>{project.problem}</p></section><section><span className="eyebrow">02 / THE APPROACH</span><h2>Proposed solution</h2><p>{project.solution}</p></section><section><span className="eyebrow">03 / SYSTEM DESIGN</span><h2>Technical architecture</h2><div className="architecture"><span>{project.architecture}</span><ArrowRight size={19} /></div><p className="muted small">Architecture shown at a concept level. Implementation specifics can be updated as project details are confirmed.</p></section>{project.sections && <section><span className="eyebrow">04 / CASE STUDY MAP</span><div className="case-section-list">{project.sections.map((section, index) => <div key={section}><span>0{index + 1}</span><strong>{section}</strong></div>)}</div></section>}</div><aside className="case-sidebar"><span className="mono-label">TECHNOLOGIES</span><div className="case-tags">{project.tech.map((item) => <Tag key={item}>{item}</Tag>)}</div>    <span className="mono-label">CONTRIBUTION</span><p>{project.teamMembers ? `Team: ${project.teamMembers.join(" · ")}. Supervisor: ${project.supervisor}. Batch ${project.batch}.` : "Project work and technical exploration by Dhilip Kumar. Add a specific contribution summary as implementation details are finalized."}</p>    <span className="mono-label">LINKS</span>{project.repositoryUrl ? <a className="text-link" href={project.repositoryUrl} target="_blank" rel="noreferrer">View GitHub repository <Github size={15} /><ExternalLink size={14} /></a> : <p className="muted small">No project repository is linked yet. <a href={profile.socials.GitHub} target="_blank" rel="noreferrer">Browse GitHub</a> for verified public repositories.</p>}</aside></div>    <div className="case-next"><span className="eyebrow">CONTINUE EXPLORING</span><Link to="/projects">All projects <ArrowUpRight size={18} /></Link></div>
  </PageShell>;
}

export function ExperiencePage() {
  return <PageShell eyebrow="INDUSTRIAL EXPOSURE / 04" title={<>Learning where<br /><span className="text-gradient">engineering happens.</span></>} lead="Internship and industrial training experiences across renewable energy, electrical manufacturing, and power transmission." className="experience-page">
    <div className="experience-intro"><span className="signal-dot" /> HANDS-ON EXPOSURE <span className="mono-label">COIMBATORE / INDIA</span></div>
    <div className="experience-timeline">{experiences.map((item, index) => { const tags = index === 0 ? ["Renewable energy", "Turbines", "SCADA"] : index === 1 ? ["Manufacturing", "Inspection", "Electrical components"] : ["Power systems", "Protection", "Substation automation"]; return <Reveal key={item.company} delay={index * 0.1}><article className="experience-item"><div className="timeline-rail"><span className="timeline-dot" /><span className="timeline-number">0{index + 1}</span></div><div className="experience-card"><div className="experience-head"><div><span className="mono-label">{item.date}</span><h2>{item.company}</h2><p>{item.role}</p></div><span className="company-symbol"><Zap size={22} /></span></div><span className="experience-location"><MapPin size={14} />{item.location}</span><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul><div className="experience-tags">{tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div></div></article></Reveal>; })}</div>
  </PageShell>;
}

export function CodingPage() {
  return <PageShell eyebrow="CODE / 05" title={<>Practice meets<br /><span className="text-gradient">problem solving.</span></>} lead="Follow my work and coding practice. Profile links and statistics are kept configurable; no live or unverified numbers are shown." className="coding-page">
    <div className="profile-notice"><span className="notice-icon"><Sparkles size={18} /></span><p>Public profile URLs and any verified statistics can be added in <code>client/src/data.js</code>. No account data is displayed until it is configured.</p></div>
    <div className="coding-grid">{codingProfiles.map((item, index) => { const url = profile.socials[item.urlKey]; return <Reveal key={item.name} delay={index * 0.08}><article className="coding-card"><div className="coding-top"><span className="coding-icon"><Icon name={item.icon} size={22} /></span><span className="mono-label">PROFILE / 0{index + 1}</span></div><h2>{item.name}</h2><p>{item.description}</p><div className="profile-stats"><span>Profile statistics</span><strong>Not configured</strong></div>{url ? <a className="text-link" href={url} target="_blank" rel="noreferrer">Visit profile <ExternalLink size={15} /></a> : <span className="profile-unavailable">Add profile URL in data.js <ArrowUpRight size={14} /></span>}</article></Reveal>; })}</div>
  </PageShell>;
}

export function AchievementsPage() {
  const [galleryCategory, setGalleryCategory] = useState("All");
  const categories = ["All", "Certifications", "Technical Events", "Competitions", "Sports & Other Achievements"];
  const gallery = galleryCategory === "All" ? portfolioAssets.achievements : portfolioAssets.achievements.filter((item) => item.category === galleryCategory);
  const openGallery = (current) => openImageLightbox(gallery.map((item) => ({ src: item.src, title: item.title, caption: item.caption, alt: item.caption })), current);

  return <PageShell eyebrow="MILESTONES / 06" title={<>PROOF OF LEARNING.<br /><span className="text-gradient">MOMENTS OF ACHIEVEMENT.</span></>} lead="Every achievement represents an opportunity to learn, grow, and improve." className="achievements-page">
    <div className="achievement-callout"><span className="signal-dot" /><span>Verified details are shown without inventing rankings, grades, or award results.</span></div>
    <SectionHeading eyebrow="ACHIEVEMENT TIMELINE / 01" title="Selected milestones" />
    <div className="achievement-grid">{achievements.filter((item) => !item.category || item.category).map((item, index) => <Reveal key={`${item.title}-${item.year}`} delay={index * 0.06}><article className="achievement-card"><div className="achievement-top"><span className="achievement-index">0{index + 1}</span><span className="achievement-year">{item.year}</span></div>{item.image ? <InteractiveImage src={item.image} alt={item.imageAlt} caption={item.title} className="achievement-image-link" onOpen={({ src, alt, caption }) => openImageLightbox([{ src, alt, caption }], src)} /> : <div className="award-mark"><Sparkles size={22} /></div>}<span className="mono-label">{item.label}</span><h2>{item.title}</h2><p>{item.note}</p>{item.image && <button className="document-link document-button" type="button" onClick={() => openImageLightbox([{ src: item.image, alt: item.imageAlt, caption: item.title }], item.image)}>View image <ExternalLink size={13} /></button>}</article></Reveal>)}</div>
    <section className="certificate-section"><SectionHeading eyebrow="CERTIFICATE GALLERY / 02" title="Proof & moments" /><div className="filter-row" role="group" aria-label="Filter achievement gallery">{categories.map((category) => <button key={category} type="button" className={`filter-button ${galleryCategory === category ? "selected" : ""}`} onClick={() => setGalleryCategory(category)}>{category}</button>)}</div><div className="gallery-grid">{gallery.map((item) => <Reveal key={item.src}><InteractiveImage src={item.src} alt={item.caption} caption={item.caption} className="gallery-card" onOpen={() => openGallery(item.src)}><span className="gallery-caption"><small>{item.category}</small><strong>{item.title}</strong></span></InteractiveImage></Reveal>)}</div></section>
  </PageShell>;
}

export function ContactPage() {
  const [state, setState] = useState({ status: "idle", message: "" });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    setState({ status: "loading", message: "" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Message could not be sent.");
      setState({ status: "success", message: result.message });
      form.reset();
    } catch (error) {
      setState({ status: "error", message: error.message || "Unable to reach the contact service. Try again later." });
    }
  };
  const socials = [
    ["GitHub", profile.socials.GitHub, Github],
    ["LinkedIn", profile.socials.LinkedIn, Linkedin],
    ["LeetCode", profile.socials.LeetCode, Code2],
    ["Email", profile.email ? `mailto:${profile.email}` : "", Mail]
  ];
  return <PageShell eyebrow="CONTACT / 07" title={<>LET'S BUILD<br /><span className="text-gradient">SOMETHING MEANINGFUL.</span></>} lead="Have an opportunity, project idea, or interesting engineering challenge? I'd love to connect." className="contact-page">
    <div className="contact-layout"><div className="contact-info"><div className="contact-info-heading"><span className="eyebrow">GET IN TOUCH</span><p>Good conversations often lead to great engineering. Send a note, or find me on a configured profile.</p></div><div className="contact-details">{profile.email && <a href={`mailto:${profile.email}`}><span className="contact-detail-icon"><Mail size={18} /></span><span><small>EMAIL</small>{profile.email}</span><ArrowUpRight size={15} /></a>}{profile.phone && <a href={`tel:${profile.phone.replace(/[^+0-9]/g, "")}`}><span className="contact-detail-icon"><Radio size={18} /></span><span><small>PHONE</small>{profile.phone}</span><ArrowUpRight size={15} /></a>}{profile.location && <div><span className="contact-detail-icon"><MapPin size={18} /></span><span><small>LOCATION</small>{profile.location}</span></div>}{socials.filter(([, url]) => url).map(([name, url, IconComp]) => <a key={name} href={url} target={url.startsWith("http") ? "_blank" : undefined} rel="noreferrer"><span className="contact-detail-icon"><IconComp size={18} /></span><span><small>{name.toUpperCase()}</small>Connect on {name}</span><ArrowUpRight size={15} /></a>)}</div><div className="profile-actions"><ResumeAction secondary /><a className="button button-outline" href={profile.socials.GitHub} target="_blank" rel="noreferrer"><Github size={16} /> GitHub profile <ExternalLink size={14} /></a></div><div className="contact-signal"><span className="signal-dot" /> AVAILABLE FOR OPPORTUNITIES</div></div>
      <form className="contact-form" onSubmit={handleSubmit}><div className="form-heading"><span className="mono-label">SEND A MESSAGE</span><span className="form-required">* REQUIRED</span></div><label>Name<input name="name" autoComplete="name" required maxLength="100" placeholder="Your name" /></label><label>Email<input name="email" type="email" autoComplete="email" required maxLength="254" placeholder="you@example.com" /></label><label>Subject<input name="subject" required maxLength="160" placeholder="What would you like to discuss?" /></label><label>Message<textarea name="message" rows="5" required maxLength="5000" placeholder="Tell me a little about it..." /></label><label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" /></label><button className="button button-primary submit-button" type="submit" disabled={state.status === "loading"}>{state.status === "loading" ? "Sending..." : "Send message"}{state.status === "success" ? <Check size={17} /> : <Send size={16} />}</button>{state.message && <p className={`form-feedback ${state.status}`} role="status">{state.message}</p>}<p className="form-privacy">Your details are used only to reply to this enquiry.</p></form></div>
  </PageShell>;
}

export function NotFoundPage() {
  const navigate = useNavigate();
  return <PageShell eyebrow="404 / LOST SIGNAL" title={<>Page not<br /><span className="text-gradient">found.</span></>} lead="That route doesn't exist. Let's get you back on the right track."><button className="button button-primary" onClick={() => navigate("/")}>Return home <ArrowRight size={16} /></button></PageShell>;
}
