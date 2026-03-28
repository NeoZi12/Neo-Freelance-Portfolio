"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Montserrat } from "next/font/google";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const montserrat = Montserrat({ subsets: ["latin"] });

/* ─── Static data (images / URLs only) ─────────────────────────────────── */

const projectMeta = [
  {
    id: "1",
    thumbnail: "/images/project1.png",
    liveUrl: "https://jobizz-beige.vercel.app/",
    screenshots: [
      "/images/project1-1.png",
      "/images/project1-2.png",
      "/images/project1-3.png",
      "/images/project1-4.png",
      "/images/project1-5.png",
      "/images/project1-6.png",
      "/images/project1-7.png",
      "/images/project1-8.png",
      "/images/project1-9.png",
    ],
  },
  {
    id: "2",
    thumbnail: "/images/project2.png",
    liveUrl: "https://bruna-barros.vercel.app",
    screenshots: [
      "/images/project2-1.png",
      "/images/project2-2.png",
      "/images/project2-3.png",
      "/images/project2-4.png",
      "/images/project2-5.png",
      "/images/project2-6.png",
      "/images/project2-7.png",
    ],
  },
  {
    id: "3",
    thumbnail: "/images/project3.png",
    liveUrl: "https://neozi12.github.io/",
    screenshots: [
      "/images/project3-1.png",
      "/images/project3-2.png",
      "/images/project3-3.png",
      "/images/project3-4.png",
      "/images/project3-5.png",
    ],
  },
];

/* ─── Types ─────────────────────────────────────────────────────────────── */

interface Project {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  screenshots: string[];
  liveUrl: string;
}

/* ─── ProjectCard ───────────────────────────────────────────────────────── */

function ProjectCard({
  project,
  viewProjectLabel,
  isHe,
  onClick,
}: {
  project: Project;
  viewProjectLabel: string;
  isHe: boolean;
  onClick: (p: Project) => void;
}) {
  return (
    /*
     * `group` lives here so that group-hover:scale-105 on the image works.
     * The motion.div wrapper (in the parent) handles scroll animation only —
     * it has no hover transform, so CSS group-hover is unaffected.
     */
    <div
      className="relative cursor-pointer overflow-hidden rounded-2xl h-[220px] sm:h-[260px] lg:h-[280px] ring-2 ring-brand-orange shadow-[0_8px_32px_rgba(230,126,34,0.45)]"
      onClick={() => onClick(project)}
    >
      <div className="relative w-full h-full bg-gray-800">
        <Image
          src={project.thumbnail}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div
        className={cn(
          "absolute inset-0 rounded-2xl",
          "bg-gradient-to-b from-brand-orange/70 to-transparent",
          "flex flex-col justify-between p-4",
        )}
      >
        <h3
          className={cn(
            montserrat.className,
            "text-white font-bold text-sm sm:text-base lg:text-lg leading-tight line-clamp-2",
            isHe && "text-right",
          )}
        >
          {project.name}
        </h3>

        <div className={cn("flex items-center", isHe && "justify-end")}>
          <span
            className={cn(
              montserrat.className,
              "inline-flex items-center gap-1.5",
              "bg-black border-2 border-brand-orange text-brand-orange",
              "font-semibold text-sm rounded-[18px] px-4 py-2",
              "shadow-[0px_6px_16px_rgba(230,126,34,0.4)]",
            )}
          >
            {isHe && <Icon icon="lucide:arrow-left" width={14} height={14} />}
            {viewProjectLabel}
            {!isHe && <Icon icon="lucide:arrow-right" width={14} height={14} />}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── ProjectModal ──────────────────────────────────────────────────────── */

function ProjectModal({
  project,
  goToWebsiteLabel,
  isHe,
  onClose,
}: {
  project: Project;
  goToWebsiteLabel: string;
  isHe: boolean;
  onClose: () => void;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prev = () =>
    setCurrentSlide((i) => (i === 0 ? project.screenshots.length - 1 : i - 1));
  const next = () =>
    setCurrentSlide((i) => (i === project.screenshots.length - 1 ? 0 : i + 1));

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [project.id]);

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={cn(
          "relative bg-brand-dark rounded-2xl max-w-4xl w-full p-4 md:p-7",
          "max-h-[90vh] overflow-y-hidden",
          "border border-brand-orange/40",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors duration-200 z-10"
          aria-label="Close modal"
        >
          <Icon icon="lucide:x" width={22} height={22} />
        </button>

        {/* Title + CTA — swap order in Hebrew */}
        <div className={cn(
          "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pr-7",
          isHe && "sm:flex-row-reverse",
        )}>
          <h2
            className={cn(
              montserrat.className,
              "text-brand-orange font-bold text-lg sm:text-2xl leading-snug",
              isHe && "text-right",
            )}
          >
            {project.name}
          </h2>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              montserrat.className,
              "inline-flex items-center justify-center gap-1.5 self-start sm:shrink-0",
              "border-2 border-brand-orange text-white font-semibold text-sm rounded-[18px] px-4 py-2",
              "shadow-[0px_6px_16px_rgba(230,126,34,0.3)] hover:shadow-[0px_8px_20px_rgba(230,126,34,0.5)] transition-shadow duration-200",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {isHe && <Icon icon="lucide:external-link" width={14} height={14} />}
            {goToWebsiteLabel}
            {!isHe && <Icon icon="lucide:external-link" width={14} height={14} />}
          </a>
        </div>

        <div className="relative overflow-hidden rounded-xl aspect-video bg-black shadow-[0_8px_32px_rgba(230,126,34,0.45)]">
          <Image
            src={project.screenshots[currentSlide]}
            alt={`${project.name} screenshot ${currentSlide + 1}`}
            fill
            className="object-contain"
          />

          {project.screenshots.length > 1 && (
            <>
              <button
                onClick={prev}
                className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2",
                  "w-9 h-9 rounded-full bg-black/50 hover:bg-black/80",
                  "flex items-center justify-center text-white transition-colors duration-200",
                )}
                aria-label="Previous screenshot"
              >
                <Icon icon="lucide:chevron-left" width={20} height={20} />
              </button>

              <button
                onClick={next}
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2",
                  "w-9 h-9 rounded-full bg-black/50 hover:bg-black/80",
                  "flex items-center justify-center text-white transition-colors duration-200",
                )}
                aria-label="Next screenshot"
              >
                <Icon icon="lucide:chevron-right" width={20} height={20} />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {project.screenshots.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors duration-200",
                      i === currentSlide ? "bg-white" : "bg-white/40",
                    )}
                    aria-label={`Go to screenshot ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── PortfolioSection ──────────────────────────────────────────────────── */

export default function PortfolioSection() {
  const { locale, t } = useLanguage();
  const isHe = locale === "he";
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const closeModal = useCallback(() => setSelectedProject(null), []);

  // Merge static meta (images, URLs) with locale-specific text
  const projects: Project[] = projectMeta.map((meta, i) => ({
    ...meta,
    name: t.portfolio.projects[i].name,
    description: t.portfolio.projects[i].description,
  }));

  return (
    <section
      id="portfolio"
      className={cn(
        "bg-gradient-to-b from-portfolio-dark to-portfolio-warm scroll-mt-16 lg:scroll-mt-0",
        "min-h-screen lg:h-screen flex flex-col",
        montserrat.className,
      )}
    >
      <div className="hidden lg:block h-[90px] shrink-0" />

      <div className="flex-1 flex flex-col gap-8 px-6 py-10 lg:grid lg:grid-rows-[1fr_auto_1fr] lg:gap-0 lg:py-0 lg:pb-6">
        {/* Title */}
        <motion.div
          className="flex items-center justify-center lg:self-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <h2
            className="text-white font-bold text-3xl lg:text-[36px] leading-none text-center"
            dir={isHe ? "rtl" : "ltr"}
          >
            <span className="text-white">{t.portfolio.headingRegular} </span>
            <span className="text-brand-orange">{t.portfolio.headingOrange}</span>
          </h2>
        </motion.div>

        {/* Cards grid — stagger container */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-x-8 lg:gap-y-5 w-full max-w-[1200px] mx-auto"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {projects.map((project) => (
            /*
             * motion.div wrapper: handles the scroll-in animation.
             * `group` is on the inner div inside ProjectCard so that
             * group-hover:scale-105 on the image still works correctly.
             */
            <motion.div
              key={project.id}
              variants={fadeUp}
              className="group"
            >
              <ProjectCard
                project={project}
                viewProjectLabel={t.portfolio.viewProject}
                isHe={isHe}
                onClick={setSelectedProject}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="hidden lg:block" />
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          goToWebsiteLabel={t.portfolio.goToWebsite}
          isHe={isHe}
          onClose={closeModal}
        />
      )}
    </section>
  );
}
