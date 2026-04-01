"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { montserrat } from "@/lib/fonts";
import arrowLeft from "@iconify-icons/lucide/arrow-left";
import arrowRight from "@iconify-icons/lucide/arrow-right";
import x from "@iconify-icons/lucide/x";
import chevronLeft from "@iconify-icons/lucide/chevron-left";
import chevronRight from "@iconify-icons/lucide/chevron-right";
import externalLink from "@iconify-icons/lucide/external-link";
import maximize2 from "@iconify-icons/lucide/maximize-2";
import minimize2 from "@iconify-icons/lucide/minimize-2";

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
          loading="lazy"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
            {isHe && <Icon icon={arrowLeft} width={14} height={14} />}
            {viewProjectLabel}
            {!isHe && <Icon icon={arrowRight} width={14} height={14} />}
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
  const [isFullscreen, setIsFullscreen] = useState(false);

  const prev = () =>
    setCurrentSlide((i) => (i === 0 ? project.screenshots.length - 1 : i - 1));
  const next = () =>
    setCurrentSlide((i) => (i === project.screenshots.length - 1 ? 0 : i + 1));

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreen) setIsFullscreen(false);
        else onClose();
      }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose, isFullscreen]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [project.id]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={cn(
          "relative bg-brand-dark flex flex-col overflow-hidden",
          "border border-brand-orange/30",
          "shadow-[0_0_0_1px_rgba(230,126,34,0.08),0_8px_48px_rgba(0,0,0,0.6)]",
          isFullscreen
            ? "fixed inset-0 w-screen h-[100dvh] rounded-none p-4"
            // Mobile: content-driven height (fits the image naturally, no black void)
            // Desktop: fixed 85vh so the preview fills the panel
            : "rounded-2xl w-full sm:w-[min(90vw,1300px)] max-h-[92dvh] sm:h-[85vh] sm:max-h-none p-3 sm:p-5",
        )}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Controls — fullscreen toggle (desktop only) + close */}
        <div className="absolute top-3 right-3 flex items-center gap-1 z-10">
          <button
            onClick={() => setIsFullscreen((f) => !f)}
            className="hidden sm:block text-white/70 hover:text-white transition-colors duration-200 p-1"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            <Icon icon={isFullscreen ? minimize2 : maximize2} width={20} height={20} />
          </button>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors duration-200 p-1"
            aria-label="Close modal"
          >
            <Icon icon={x} width={22} height={22} />
          </button>
        </div>

        {/* Header — stacked on mobile, single row on desktop */}
        <div className={cn(
          "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 shrink-0 pr-14",
          isHe && "sm:flex-row-reverse",
        )}>
          <h2
            className={cn(
              montserrat.className,
              "text-brand-orange font-bold leading-snug truncate min-w-0",
              "text-base sm:text-2xl",
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
              "border-2 border-brand-orange text-white font-semibold rounded-[18px]",
              "text-xs px-3 py-1.5 sm:text-sm sm:px-4 sm:py-2",
              "shadow-[0px_6px_16px_rgba(230,126,34,0.3)] hover:shadow-[0px_8px_20px_rgba(230,126,34,0.5)] transition-shadow duration-200",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {isHe && <Icon icon={externalLink} width={14} height={14} />}
            {goToWebsiteLabel}
            {!isHe && <Icon icon={externalLink} width={14} height={14} />}
          </a>
        </div>

        {/* Preview + controls wrapper */}
        <div className="flex-1 min-h-0 flex flex-col">

          {/* Image area
              Mobile: aspect-video container — sizes itself to the image ratio,
                      eliminating the empty black void that came from flex-1 in a tall modal.
              Desktop / fullscreen: flex-1 min-h-0 — fills remaining panel height as before. */}
          <div className={cn(
            "relative overflow-hidden rounded-xl bg-black",
            "shadow-[0_8px_32px_rgba(230,126,34,0.45)]",
            isFullscreen
              ? "flex-1 min-h-0"
              : "aspect-video sm:aspect-auto sm:flex-1 sm:min-h-0",
          )}>
            <Image
              src={project.screenshots[currentSlide]}
              alt={`${project.name} screenshot ${currentSlide + 1}`}
              fill
              className="object-contain"
            />

            {/* Mobile tap zones — invisible full-height halves, no visual clutter */}
            {project.screenshots.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="sm:hidden absolute inset-y-0 left-0 w-1/2 z-10 cursor-pointer"
                  aria-label="Previous screenshot"
                />
                <button
                  onClick={next}
                  className="sm:hidden absolute inset-y-0 right-0 w-1/2 z-10 cursor-pointer"
                  aria-label="Next screenshot"
                />
              </>
            )}

            {/* Side nav columns — desktop only, hidden on mobile */}
            {project.screenshots.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className={cn(
                    "hidden sm:flex",
                    "absolute inset-y-0 left-0 w-[6%]",
                    "items-center justify-center",
                    "bg-gradient-to-r from-neutral-900/65 to-neutral-800/35",
                    "hover:from-neutral-900/75 hover:to-neutral-800/45",
                    "border-r border-white/[0.05] rounded-l-xl cursor-pointer",
                    "text-white/75 hover:text-white transition-all duration-200",
                  )}
                  aria-label="Previous screenshot"
                >
                  <Icon icon={chevronLeft} width={20} height={20} />
                </button>

                <button
                  onClick={next}
                  className={cn(
                    "hidden sm:flex",
                    "absolute inset-y-0 right-0 w-[6%]",
                    "items-center justify-center",
                    "bg-gradient-to-l from-neutral-900/65 to-neutral-800/35",
                    "hover:from-neutral-900/75 hover:to-neutral-800/45",
                    "border-l border-white/[0.05] rounded-r-xl cursor-pointer",
                    "text-white/75 hover:text-white transition-all duration-200",
                  )}
                  aria-label="Next screenshot"
                >
                  <Icon icon={chevronRight} width={20} height={20} />
                </button>
              </>
            )}
          </div>

          {/* Bottom controls — dots (all sizes) + flanking arrows (mobile only) */}
          {project.screenshots.length > 1 && (
            <div className="shrink-0 pt-2 sm:pt-3 flex items-center justify-center gap-3">
              <button
                onClick={prev}
                className={cn(
                  "sm:hidden w-11 h-11 rounded-full shrink-0",
                  "flex items-center justify-center",
                  "bg-neutral-800/70 hover:bg-neutral-700/80",
                  "text-white/80 hover:text-white",
                  "transition-all duration-200",
                )}
                aria-label="Previous screenshot"
              >
                <Icon icon={chevronLeft} width={26} height={26} />
              </button>

              <div className="flex gap-2">
                {project.screenshots.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors duration-200",
                      i === currentSlide ? "bg-white" : "bg-white/35",
                    )}
                    aria-label={`Go to screenshot ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className={cn(
                  "sm:hidden w-11 h-11 rounded-full shrink-0",
                  "flex items-center justify-center",
                  "bg-neutral-800/70 hover:bg-neutral-700/80",
                  "text-white/80 hover:text-white",
                  "transition-all duration-200",
                )}
                aria-label="Next screenshot"
              >
                <Icon icon={chevronRight} width={26} height={26} />
              </button>
            </div>
          )}

        </div>
      </motion.div>
    </motion.div>
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
        "min-h-screen flex flex-col",
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

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            goToWebsiteLabel={t.portfolio.goToWebsite}
            isHe={isHe}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
