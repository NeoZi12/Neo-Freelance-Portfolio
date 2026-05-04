"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { fadeUp, stagger, viewport, EASE, DUR } from "@/lib/motion";
import { montserrat } from "@/lib/fonts";
import arrowLeft from "@iconify-icons/lucide/arrow-left";
import arrowRight from "@iconify-icons/lucide/arrow-right";
import x from "@iconify-icons/lucide/x";
import chevronLeft from "@iconify-icons/lucide/chevron-left";
import chevronRight from "@iconify-icons/lucide/chevron-right";
import externalLink from "@iconify-icons/lucide/external-link";

/* ─── Static data (images / URLs only) ─────────────────────────────────── */

type Screenshot = { src: string; width: number; height: number };

const projectMeta: {
  id: string;
  thumbnail: string;
  liveUrl: string;
  screenshots: Screenshot[];
}[] = [
  {
    id: "1",
    thumbnail: "/images/project1.png",
    liveUrl: "https://jobizz-beige.vercel.app/",
    screenshots: [
      { src: "/images/project1-1.png", width: 1919, height: 870 },
      { src: "/images/project1-2.png", width: 1918, height: 868 },
      { src: "/images/project1-3.png", width: 1919, height: 872 },
      { src: "/images/project1-4.png", width: 1919, height: 868 },
      { src: "/images/project1-5.png", width: 1919, height: 871 },
      { src: "/images/project1-6.png", width: 1919, height: 871 },
      { src: "/images/project1-7.png", width: 1919, height: 866 },
      { src: "/images/project1-8.png", width: 1919, height: 869 },
      { src: "/images/project1-9.png", width: 1919, height: 871 },
    ],
  },
  {
    id: "2",
    thumbnail: "/images/project2.png",
    liveUrl: "https://bruna-barros.vercel.app",
    screenshots: [
      { src: "/images/project2-1.png", width: 1919, height: 868 },
      { src: "/images/project2-2.png", width: 1919, height: 869 },
      { src: "/images/project2-3.png", width: 1919, height: 875 },
      { src: "/images/project2-4.png", width: 1919, height: 870 },
      { src: "/images/project2-5.png", width: 1919, height: 771 },
      { src: "/images/project2-6.png", width: 1919, height: 776 },
      { src: "/images/project2-7.png", width: 1919, height: 870 },
    ],
  },
  {
    id: "3",
    thumbnail: "/images/project3.png",
    liveUrl: "https://neozi12.github.io/",
    screenshots: [
      { src: "/images/project3-1.png", width: 1919, height: 873 },
      { src: "/images/project3-2.png", width: 1919, height: 869 },
      { src: "/images/project3-3.png", width: 1919, height: 870 },
      { src: "/images/project3-4.png", width: 1919, height: 876 },
      { src: "/images/project3-5.png", width: 1919, height: 872 },
    ],
  },
  {
    id: "4",
    thumbnail: "/images/project4.png",
    liveUrl: "https://mia-tax.co.il/",
    screenshots: [
      { src: "/images/project4-1.png", width: 1899, height: 912 },
      { src: "/images/project4-2.png", width: 1899, height: 908 },
      { src: "/images/project4-3.png", width: 1904, height: 909 },
      { src: "/images/project4-4.png", width: 1900, height: 908 },
      { src: "/images/project4-5.png", width: 1899, height: 909 },
      { src: "/images/project4-6.png", width: 1897, height: 907 },
      { src: "/images/project4-7.png", width: 1899, height: 905 },
      { src: "/images/project4-8.png", width: 1897, height: 908 },
      { src: "/images/project4-9.png", width: 1899, height: 907 },
    ],
  },
  {
    id: "5",
    thumbnail: "/images/project5.png",
    liveUrl: "https://guy-barbershop.vercel.app/",
    screenshots: [
      { src: "/images/project5-1.png", width: 1889, height: 829 },
      { src: "/images/project5-2.png", width: 1871, height: 861 },
      { src: "/images/project5-3.png", width: 1891, height: 866 },
      { src: "/images/project5-4.png", width: 1877, height: 870 },
      { src: "/images/project5-5.png", width: 1882, height: 868 },
      { src: "/images/project5-6.png", width: 1873, height: 870 },
      { src: "/images/project5-7.png", width: 1866, height: 867 },
    ],
  },
];

/* ─── Display order per locale ─────────────────────────────────────────── */
// IDs: 1=Jobizz, 2=Bruna Barros, 3=NZ, 4=Tax Consultant, 5=Guy Barbershop
const PROJECT_ORDER_EN = ["1", "2", "3", "5", "4"] as const;
const PROJECT_ORDER_HE = ["5", "4", "1", "3", "2"] as const;

/* ─── Types ─────────────────────────────────────────────────────────────── */

interface Project {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  screenshots: Screenshot[];
  liveUrl: string;
}

/* ─── Grid position classes for 2+2+1 centered layout ──────────────────── */

/**
 * 4-col grid on sm/lg, 1-col on mobile.
 * Cards 1-4 auto-flow at col-span-2 → 2 per row.
 * Card 5 is offset to center the final row.
 */
function getGridClasses(index: number): string {
  if (index === 4) {
    return "sm:col-span-2 sm:col-start-2 lg:col-start-2";
  }
  return "sm:col-span-2";
}

/* ─── ProjectCard ──────────────────────────────────────────────────────── */

function ProjectCard({
  project,
  viewProjectLabel,
  goToWebsiteLabel,
  isHe,
  isPhone,
  onClick,
}: {
  project: Project;
  viewProjectLabel: string;
  goToWebsiteLabel: string;
  isHe: boolean;
  isPhone: boolean;
  onClick: (id: string) => void;
}) {
  // Phone: no expansion gallery — entire card links to the live site,
  // with a prominent "Go to website" pill on the top-right of the thumbnail.
  if (isPhone) {
    return (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "block overflow-hidden rounded-2xl",
          "ring-2 ring-brand-orange",
          "shadow-[0_4px_16px_rgba(230,126,34,0.15)]",
          "active:shadow-[0_6px_28px_rgba(230,126,34,0.35)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange focus-visible:outline-offset-2",
          "transition-shadow duration-300",
        )}
      >
        <div className="relative w-full aspect-[16/10] bg-neutral-900 overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.name}
            fill
            loading="lazy"
            sizes="calc(100vw - 48px)"
            className="object-cover"
          />
          <span
            className={cn(
              montserrat.className,
              "absolute top-3 right-3 z-10",
              "inline-flex items-center gap-1.5",
              "bg-brand-orange text-white font-semibold rounded-full",
              "ring-1 ring-brand-dark",
              "text-xs px-3 py-2",
              "shadow-[0_4px_12px_rgba(0,0,0,0.4)]",
            )}
          >
            {goToWebsiteLabel}
            <Icon icon={externalLink} width={14} height={14} />
          </span>
        </div>
        <div
          className={cn(
            "bg-brand-dark px-4 py-3",
            "flex items-center",
            isHe ? "justify-end" : "justify-start",
          )}
        >
          <h3
            className={cn(
              montserrat.className,
              "text-white font-semibold text-base leading-tight line-clamp-1",
            )}
          >
            {project.name}
          </h3>
        </div>
      </a>
    );
  }

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
          sizes="(min-width: 1024px) 480px, (min-width: 640px) 45vw, calc(100vw - 48px)"
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
            "text-orange-300 font-medium text-xs",
            "opacity-70 group-hover:opacity-100 transition-opacity duration-300",
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
  shouldScrollIntoView,
}: {
  project: Project;
  goToWebsiteLabel: string;
  isHe: boolean;
  onClose: () => void;
  reducedMotion: boolean;
  shouldScrollIntoView: boolean;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Initially nudge the user toward the natural reading direction by disabling
  // the "prev" arrow until they navigate at least once. Resets per project
  // (component remounts on key change).
  const [hasNavigated, setHasNavigated] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const prev = useCallback(() => {
    setHasNavigated(true);
    setCurrentSlide((i) =>
      i === 0 ? project.screenshots.length - 1 : i - 1,
    );
  }, [project.screenshots.length]);
  const next = useCallback(() => {
    setHasNavigated(true);
    setCurrentSlide((i) =>
      i === project.screenshots.length - 1 ? 0 : i + 1,
    );
  }, [project.screenshots.length]);
  const goToSlide = useCallback((i: number) => {
    setHasNavigated(true);
    setCurrentSlide(i);
  }, []);

  // In Hebrew (RTL), the arrow pointing in the reading direction (left) advances,
  // and the arrow pointing back (right) goes to previous. Keep icons & physical
  // positions the same; just swap which side triggers which action.
  const onLeftSide = isHe ? next : prev;
  const onRightSide = isHe ? prev : next;

  // The "back" arrow starts disabled until the user navigates once, dictating
  // the natural reading direction. EN: left = prev. HE: right = prev.
  const leftDisabled = !isHe && !hasNavigated;
  const rightDisabled = isHe && !hasNavigated;

  // Escape key to close
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  // Scroll panel into view when opened / switched — but skip the auto-open
  // on initial page load so the page doesn't yank from Hero down to Portfolio.
  useEffect(() => {
    if (!shouldScrollIntoView) return;
    panelRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
    });
  }, [project.id, reducedMotion, shouldScrollIntoView]);

  return (
    <motion.div
      ref={panelRef}
      className={cn(
        "w-full rounded-2xl overflow-hidden scroll-mt-24",
        "bg-brand-dark ring-2 ring-brand-orange",
        "shadow-[0_8px_40px_rgba(230,126,34,0.25)]",
      )}
      // whileInView (not animate) so the default-open panel animates when the
      // user actually scrolls to the section, not silently on initial mount.
      initial={reducedMotion ? false : { opacity: 0, y: 40, scale: 0.97 }}
      whileInView={
        reducedMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.7, ease: EASE },
            }
      }
      exit={
        reducedMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              y: 24,
              transition: { duration: 0.3, ease: EASE },
            }
      }
      viewport={viewport}
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
        <div className="relative rounded-xl overflow-hidden bg-brand-dark">
          <Image
            src={project.screenshots[currentSlide].src}
            width={project.screenshots[currentSlide].width}
            height={project.screenshots[currentSlide].height}
            alt={`${project.name} screenshot ${currentSlide + 1}`}
            loading="lazy"
            className="block w-full h-auto"
            sizes="(min-width: 1024px) 900px, calc(100vw - 80px)"
          />

          {/* Mobile tap zones — invisible halves */}
          {project.screenshots.length > 1 && (
            <>
              <button
                onClick={onLeftSide}
                className="sm:hidden absolute inset-y-0 left-0 w-1/2 z-10"
                aria-label={isHe ? "Next screenshot" : "Previous screenshot"}
              />
              <button
                onClick={onRightSide}
                className="sm:hidden absolute inset-y-0 right-0 w-1/2 z-10"
                aria-label={isHe ? "Previous screenshot" : "Next screenshot"}
              />
            </>
          )}

          {/* Desktop side navigation */}
          {project.screenshots.length > 1 && (
            <>
              <button
                onClick={onLeftSide}
                disabled={leftDisabled}
                className={cn(
                  "hidden sm:flex",
                  "absolute inset-y-0 left-0 w-[5%] min-w-[40px]",
                  "items-center justify-center",
                  "bg-gradient-to-r from-black/50 to-transparent",
                  "transition-all duration-200",
                  leftDisabled
                    ? "opacity-30 cursor-not-allowed text-white/40"
                    : "cursor-pointer hover:from-black/70 text-white/60 hover:text-white",
                )}
                aria-label={isHe ? "Next screenshot" : "Previous screenshot"}
              >
                <Icon icon={chevronLeft} width={22} height={22} />
              </button>
              <button
                onClick={onRightSide}
                disabled={rightDisabled}
                className={cn(
                  "hidden sm:flex",
                  "absolute inset-y-0 right-0 w-[5%] min-w-[40px]",
                  "items-center justify-center",
                  "bg-gradient-to-l from-black/50 to-transparent",
                  "transition-all duration-200",
                  rightDisabled
                    ? "opacity-30 cursor-not-allowed text-white/40"
                    : "cursor-pointer hover:from-black/70 text-white/60 hover:text-white",
                )}
                aria-label={isHe ? "Previous screenshot" : "Next screenshot"}
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
              onClick={onLeftSide}
              className={cn(
                "sm:hidden w-9 h-9 rounded-full shrink-0",
                "flex items-center justify-center",
                "bg-white/10 hover:bg-white/15 active:bg-white/20",
                "text-white/70 hover:text-white transition-all duration-200",
              )}
              aria-label={isHe ? "Next screenshot" : "Previous screenshot"}
            >
              <Icon icon={chevronLeft} width={20} height={20} />
            </button>

            <div className={cn("flex gap-1.5", isHe && "flex-row-reverse")}>
              {project.screenshots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
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
              onClick={onRightSide}
              className={cn(
                "sm:hidden w-9 h-9 rounded-full shrink-0",
                "flex items-center justify-center",
                "bg-white/10 hover:bg-white/15 active:bg-white/20",
                "text-white/70 hover:text-white transition-all duration-200",
              )}
              aria-label={isHe ? "Previous screenshot" : "Next screenshot"}
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
  const reducedMotion = useReducedMotion() ?? false;

  // Phones (< sm / 640px) get a simplified card-as-link UX with no expansion gallery.
  const [isPhone, setIsPhone] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639.98px)");
    setIsPhone(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsPhone(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Pre-open one project so the gallery isn't empty on load (desktop only).
  // EN → Jobizz (id "1"), HE → Guy Barbershop (id "5").
  const defaultProjectId = isPhone ? null : isHe ? "5" : "1";
  const [selectedId, setSelectedId] = useState<string | null>(defaultProjectId);
  const userHasInteractedRef = useRef(false);

  // When locale syncs after hydration (or viewport crosses the phone breakpoint),
  // switch the default — but only if the user hasn't opened/closed anything yet.
  useEffect(() => {
    if (!userHasInteractedRef.current) {
      setSelectedId(defaultProjectId);
    }
  }, [defaultProjectId]);

  const handleSelect = useCallback((id: string) => {
    userHasInteractedRef.current = true;
    setSelectedId(id);
  }, []);
  const closeProject = useCallback(() => {
    userHasInteractedRef.current = true;
    setSelectedId(null);
  }, []);

  // Merge static meta with locale-specific text (still indexed by projectMeta order)
  const projectsById: Project[] = projectMeta.map((meta, i) => ({
    ...meta,
    name: t.portfolio.projects[i].name,
    description: t.portfolio.projects[i].description,
  }));

  // Apply per-locale display order
  const order = isHe ? PROJECT_ORDER_HE : PROJECT_ORDER_EN;
  const projects: Project[] = order
    .map((id) => projectsById.find((p) => p.id === id))
    .filter((p): p is Project => p !== undefined);

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
                shouldScrollIntoView={userHasInteractedRef.current}
              />
            )}
          </AnimatePresence>

          {/* Cards grid — 2+2+1 centered when idle, 2×2 when a project is expanded.
              Idle uses parent-controlled stagger (works on initial mount).
              Selected uses per-card whileInView so cards that mount mid-session
              (the previously-selected card rejoining the grid after a project
              switch) animate themselves in independently — without this, they'd
              stay stuck at the parent's stale "hidden" variant (opacity: 0) and
              leave an empty cell. */}
          {selectedProject ? (
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
              {otherProjects!.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ duration: DUR, ease: EASE }}
                  className="group"
                >
                  <ProjectCard
                    project={project}
                    viewProjectLabel={t.portfolio.viewProject}
                    goToWebsiteLabel={t.portfolio.goToWebsite}
                    isHe={isHe}
                    isPhone={isPhone}
                    onClick={handleSelect}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid gap-5 grid-cols-1 sm:grid-cols-4"
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
                    goToWebsiteLabel={t.portfolio.goToWebsite}
                    isHe={isHe}
                    isPhone={isPhone}
                    onClick={handleSelect}
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
