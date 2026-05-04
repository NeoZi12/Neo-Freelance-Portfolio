"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { fadeUp, stagger, viewport, EASE } from "@/lib/motion";
import { montserrat } from "@/lib/fonts";
import arrowLeft from "@iconify-icons/lucide/arrow-left";
import arrowRight from "@iconify-icons/lucide/arrow-right";
import x from "@iconify-icons/lucide/x";
import chevronLeft from "@iconify-icons/lucide/chevron-left";
import chevronRight from "@iconify-icons/lucide/chevron-right";
import externalLink from "@iconify-icons/lucide/external-link";

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
  {
    id: "4",
    thumbnail: "/images/project4.png",
    liveUrl: "https://mia-tax.co.il/",
    screenshots: [
      "/images/project4-1.png",
      "/images/project4-2.png",
      "/images/project4-3.png",
      "/images/project4-4.png",
      "/images/project4-5.png",
      "/images/project4-6.png",
      "/images/project4-7.png",
      "/images/project4-8.png",
      "/images/project4-9.png",
    ],
  },
  {
    id: "5",
    thumbnail: "/images/project5.png",
    liveUrl: "https://guy-barbershop.vercel.app/",
    screenshots: [
      "/images/project5-1.png",
      "/images/project5-2.png",
      "/images/project5-3.png",
      "/images/project5-4.png",
      "/images/project5-5.png",
      "/images/project5-6.png",
      "/images/project5-7.png",
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

/* ─── Grid position classes for 3+2 centered layout ────────────────────── */

/**
 * 6-col grid on lg, 4-col on sm, 1-col on mobile.
 * First 3 cards auto-flow at col-span-2 → 3 per row on desktop.
 * Cards 4-5 are offset to center the second row.
 */
function getGridClasses(index: number): string {
  switch (index) {
    case 3:
      return "sm:col-span-2 lg:col-start-2";
    case 4:
      return "sm:col-span-2 sm:col-start-2 lg:col-start-4";
    default:
      return "sm:col-span-2";
  }
}

/* ─── ProjectCard ──────────────────────────────────────────────────────── */

function ProjectCard({
  project,
  viewProjectLabel,
  isHe,
  onClick,
}: {
  project: Project;
  viewProjectLabel: string;
  isHe: boolean;
  onClick: (id: string) => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-2xl",
        "ring-2 ring-brand-orange",
        "shadow-[0_4px_16px_rgba(230,126,34,0.15)]",
        "hover:shadow-[0_6px_28px_rgba(230,126,34,0.35)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange focus-visible:outline-offset-2",
        "transition-shadow duration-300",
      )}
      onClick={() => onClick(project.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(project.id);
        }
      }}
    >
      {/* Image — clean, no gradient overlay */}
      <div className="relative w-full aspect-[16/10] bg-neutral-900 overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.name}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, calc(100vw - 48px)"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Title bar below image */}
      <div
        className={cn(
          "bg-brand-dark px-3 py-2.5 sm:px-4 sm:py-3",
          "flex items-center justify-between gap-3",
          isHe && "flex-row-reverse",
        )}
      >
        <h3
          className={cn(
            montserrat.className,
            "text-white font-semibold text-sm sm:text-[0.9rem] leading-tight line-clamp-1",
          )}
        >
          {project.name}
        </h3>
        <span
          className={cn(
            montserrat.className,
            "shrink-0 inline-flex items-center gap-1",
            "text-brand-orange font-medium text-xs",
            "opacity-60 group-hover:opacity-100 transition-opacity duration-300",
          )}
        >
          {isHe && <Icon icon={arrowLeft} width={12} height={12} />}
          {viewProjectLabel}
          {!isHe && <Icon icon={arrowRight} width={12} height={12} />}
        </span>
      </div>
    </div>
  );
}

/* ─── ExpandedProject (inline — replaces modal) ────────────────────────── */

function ExpandedProject({
  project,
  goToWebsiteLabel,
  isHe,
  onClose,
  reducedMotion,
}: {
  project: Project;
  goToWebsiteLabel: string;
  isHe: boolean;
  onClose: () => void;
  reducedMotion: boolean;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const prev = useCallback(
    () =>
      setCurrentSlide((i) =>
        i === 0 ? project.screenshots.length - 1 : i - 1,
      ),
    [project.screenshots.length],
  );
  const next = useCallback(
    () =>
      setCurrentSlide((i) =>
        i === project.screenshots.length - 1 ? 0 : i + 1,
      ),
    [project.screenshots.length],
  );

  // Reset slide when switching projects
  useEffect(() => {
    setCurrentSlide(0);
  }, [project.id]);

  // Escape key to close
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  // Scroll panel into view when opened / switched
  useEffect(() => {
    panelRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
    });
  }, [project.id, reducedMotion]);

  return (
    <motion.div
      ref={panelRef}
      className={cn(
        "w-full rounded-2xl overflow-hidden scroll-mt-24",
        "bg-brand-dark ring-2 ring-brand-orange",
        "shadow-[0_8px_40px_rgba(230,126,34,0.25)]",
      )}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      {/* Header: title + visit link + close */}
      <div
        className={cn(
          "flex items-center justify-between gap-3 px-4 pt-4 pb-3 sm:px-6 sm:pt-5",
          isHe && "flex-row-reverse",
        )}
      >
        <h3
          className={cn(
            montserrat.className,
            "text-brand-orange font-bold text-base sm:text-xl lg:text-2xl",
            "leading-tight truncate min-w-0",
          )}
        >
          {project.name}
        </h3>

        <div
          className={cn(
            "flex items-center gap-2 shrink-0",
            isHe && "flex-row-reverse",
          )}
        >
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              montserrat.className,
              "inline-flex items-center gap-1.5",
              "border-2 border-brand-orange text-white font-semibold rounded-full",
              "text-xs px-3 py-1.5 sm:text-sm sm:px-4 sm:py-2",
              "hover:bg-brand-orange/10 transition-colors duration-200",
            )}
          >
            {isHe && <Icon icon={externalLink} width={14} height={14} />}
            {goToWebsiteLabel}
            {!isHe && <Icon icon={externalLink} width={14} height={14} />}
          </a>
          <button
            onClick={onClose}
            className={cn(
              "p-1.5 rounded-full",
              "text-white/50 hover:text-white hover:bg-white/10",
              "transition-colors duration-200",
            )}
            aria-label="Close project view"
          >
            <Icon icon={x} width={20} height={20} />
          </button>
        </div>
      </div>

      {/* Screenshot carousel */}
      <div className="px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
          <Image
            src={project.screenshots[currentSlide]}
            alt={`${project.name} screenshot ${currentSlide + 1}`}
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 900px, calc(100vw - 80px)"
          />

          {/* Mobile tap zones — invisible halves */}
          {project.screenshots.length > 1 && (
            <>
              <button
                onClick={prev}
                className="sm:hidden absolute inset-y-0 left-0 w-1/2 z-10"
                aria-label="Previous screenshot"
              />
              <button
                onClick={next}
                className="sm:hidden absolute inset-y-0 right-0 w-1/2 z-10"
                aria-label="Next screenshot"
              />
            </>
          )}

          {/* Desktop side navigation */}
          {project.screenshots.length > 1 && (
            <>
              <button
                onClick={prev}
                className={cn(
                  "hidden sm:flex",
                  "absolute inset-y-0 left-0 w-[5%] min-w-[40px]",
                  "items-center justify-center cursor-pointer",
                  "bg-gradient-to-r from-black/50 to-transparent",
                  "hover:from-black/70",
                  "text-white/60 hover:text-white transition-all duration-200",
                )}
                aria-label="Previous screenshot"
              >
                <Icon icon={chevronLeft} width={22} height={22} />
              </button>
              <button
                onClick={next}
                className={cn(
                  "hidden sm:flex",
                  "absolute inset-y-0 right-0 w-[5%] min-w-[40px]",
                  "items-center justify-center cursor-pointer",
                  "bg-gradient-to-l from-black/50 to-transparent",
                  "hover:from-black/70",
                  "text-white/60 hover:text-white transition-all duration-200",
                )}
                aria-label="Next screenshot"
              >
                <Icon icon={chevronRight} width={22} height={22} />
              </button>
            </>
          )}
        </div>

        {/* Dots + mobile arrows */}
        {project.screenshots.length > 1 && (
          <div className="flex items-center justify-center gap-3 pt-3">
            <button
              onClick={prev}
              className={cn(
                "sm:hidden w-9 h-9 rounded-full shrink-0",
                "flex items-center justify-center",
                "bg-white/10 hover:bg-white/15 active:bg-white/20",
                "text-white/70 hover:text-white transition-all duration-200",
              )}
              aria-label="Previous screenshot"
            >
              <Icon icon={chevronLeft} width={20} height={20} />
            </button>

            <div className="flex gap-1.5">
              {project.screenshots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-200",
                    i === currentSlide
                      ? "w-5 bg-brand-orange"
                      : "w-2 bg-white/25 hover:bg-white/40",
                  )}
                  aria-label={`Go to screenshot ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className={cn(
                "sm:hidden w-9 h-9 rounded-full shrink-0",
                "flex items-center justify-center",
                "bg-white/10 hover:bg-white/15 active:bg-white/20",
                "text-white/70 hover:text-white transition-all duration-200",
              )}
              aria-label="Next screenshot"
            >
              <Icon icon={chevronRight} width={20} height={20} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── PortfolioSection ─────────────────────────────────────────────────── */

export default function PortfolioSection() {
  const { locale, t } = useLanguage();
  const isHe = locale === "he";
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion() ?? false;

  const closeProject = useCallback(() => setSelectedId(null), []);

  // Merge static meta with locale-specific text
  const projects: Project[] = projectMeta.map((meta, i) => ({
    ...meta,
    name: t.portfolio.projects[i].name,
    description: t.portfolio.projects[i].description,
  }));

  // Derive selected project from current data (stays fresh on locale switch)
  const selectedProject = selectedId
    ? projects.find((p) => p.id === selectedId) ?? null
    : null;

  const otherProjects = selectedProject
    ? projects.filter((p) => p.id !== selectedProject.id)
    : null;

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

      <div className="flex-1 flex flex-col gap-14 px-6 py-10 lg:grid lg:grid-rows-[1fr_auto_1fr] lg:gap-0 lg:py-0 lg:pb-6">
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
            <span className="text-brand-orange">
              {t.portfolio.headingOrange}
            </span>
          </h2>
        </motion.div>

        {/* Content: expanded panel + cards grid */}
        <div className="flex flex-col gap-6 w-full max-w-[960px] mx-auto mt-6 lg:mt-12">
          {/* Expanded project view (inline, replaces modal) */}
          <AnimatePresence mode="wait">
            {selectedProject && (
              <ExpandedProject
                key={selectedProject.id}
                project={selectedProject}
                goToWebsiteLabel={t.portfolio.goToWebsite}
                isHe={isHe}
                onClose={closeProject}
                reducedMotion={reducedMotion}
              />
            )}
          </AnimatePresence>

          {/* Cards grid — 3+2 centered when idle, 2×2 when a project is expanded */}
          {selectedProject ? (
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
              {otherProjects!.map((project) => (
                <div key={project.id} className="group">
                  <ProjectCard
                    project={project}
                    viewProjectLabel={t.portfolio.viewProject}
                    isHe={isHe}
                    onClick={setSelectedId}
                  />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid gap-5 grid-cols-1 sm:grid-cols-4 lg:grid-cols-6"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  variants={fadeUp}
                  className={cn("group", getGridClasses(i))}
                >
                  <ProjectCard
                    project={project}
                    viewProjectLabel={t.portfolio.viewProject}
                    isHe={isHe}
                    onClick={setSelectedId}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        <div className="hidden lg:block" />
      </div>
    </section>
  );
}
