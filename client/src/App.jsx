import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Layout, ParticleBackground, TerminalEgg } from "./components.jsx";
import ImageLightbox from "./ImageLightbox.jsx";
import {
  AboutPage, AchievementsPage, CodingPage, ContactPage, ExperiencePage, HomePage,
  NotFoundPage, ProjectDetailPage, ProjectsPage, SkillsPage
} from "./pages.jsx";

const titles = {
  "/": "",
  "/about": "About",
  "/skills": "Skills",
  "/projects": "Projects",
  "/experience": "Experience",
  "/coding": "Coding Profiles",
  "/achievements": "Achievements",
  "/contact": "Contact"
};
const descriptions = {
  "/": "Dhilip Kumar — Electrical and Electronics Engineering. Building practical solutions across embedded systems, electronics, and automation.",
  "/about": "Learn about Dhilip Kumar's Electrical and Electronics Engineering background, interests, and engineering approach.",
  "/skills": "Explore Dhilip Kumar's growing toolkit across programming, embedded systems, electrical engineering, and web development.",
  "/projects": "Explore engineering projects and concepts in embedded systems, IoT, electrical safety, automation, and computer vision.",
  "/experience": "Industrial internship and training experiences in renewable energy, electrical manufacturing, and power transmission.",
  "/coding": "Coding and problem-solving profile links for Dhilip Kumar. Statistics are displayed only when verified.",
  "/achievements": "A configurable record of Dhilip Kumar's activities and milestones, with no unsupported award claims.",
  "/contact": "Contact Dhilip Kumar about engineering opportunities, project ideas, and technical challenges."
};

export default function App() {
  const location = useLocation();
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const pageTitle = location.pathname === "/" ? "" : (titles[location.pathname] || (location.pathname.startsWith("/projects/") ? "Project Case Study" : "Not Found"));
    const brandTitle = "Dhilip Kumar | Electrical and Electronics Engineering";
    document.title = pageTitle ? `${pageTitle} | ${brandTitle}` : brandTitle;
    const description = descriptions[location.pathname] || "Engineering project case study by Dhilip Kumar.";
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", pageTitle ? `${pageTitle} | ${brandTitle}` : brandTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.ctrlKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setTerminalOpen((open) => !open);
      }
      if (event.key === "Escape") setTerminalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <ParticleBackground />
      <ImageLightbox />
      <Layout>
        <main className="route-content" key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/coding" element={<CodingPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </main>
      </Layout>
      <TerminalEgg open={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  );
}
