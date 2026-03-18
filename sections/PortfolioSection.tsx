"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({ subsets: ["latin"] });

/* ─── Data ─────────────────────────────────────────────────────────────── */

interface Project {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  screenshots: string[];
}

const projects: Project[] = [
  {
    id: "1",
    name: "Jobizz - AI-integrated full-stack website",
    description: "A fully functional web application for a tax consulting office that manages client data, appointments, and business operations.",
    thumbnail: "/images/project1.png",
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
    name: "UGC Creator Portfolio Page",
    description: "A modern portfolio website showcasing UGC content, brand collaborations, and creative work.",
    thumbnail: "/images/project2.png",
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
    name: "Software Developer Portfolio Page",
    description: "A software developer portfolio website showcasing projects, technical skills, and real-world applications.",
    thumbnail: "/images/project3.png",
    screenshots: [
      "/images/project3-1.png",
      "/images/project3-2.png",
      "/images/project3-3.png",
      "/images/project3-4.png",
      "/images/project3-5.png",
    ],
  },
];

/* ─── ProjectCard ───────────────────────────────────────────────────────── */

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: (p: Project) => void;
}) {
  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-2xl h-[280px] ring-2 ring-brand-orange shadow-[0_8px_32px_rgba(230,126,34,0.45)]"
      onClick={() => onClick(project)}
    >
      {/* Base image */}
      <div className="relative w-full h-full bg-gray-800">
        <Image
          src={project.thumbnail}
          alt={project.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Hover overlay */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          "bg-gradient-to-b from-brand-orange to-transparent",
          "flex flex-col justify-between p-4"
        )}
      >
        <h3
          className={cn(
            montserrat.className,
            "text-white font-bold text-lg leading-tight"
          )}
        >
          {project.name}
        </h3>

        <div className="flex items-center">
          <span
            className={cn(
              montserrat.className,
              "inline-flex items-center gap-1.5",
              "bg-black border-2 border-brand-orange text-brand-orange",
              "font-semibold text-sm rounded-[18px] px-4 py-2",
              "shadow-[0px_6px_16px_rgba(230,126,34,0.4)]"
            )}
          >
            View Project
            <Icon icon="lucide:external-link" width={14} height={14} />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── ProjectModal ──────────────────────────────────────────────────────── */

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prev = () =>
    setCurrentSlide((i) =>
      i === 0 ? project.screenshots.length - 1 : i - 1
    );
  const next = () =>
    setCurrentSlide((i) =>
      i === project.screenshots.length - 1 ? 0 : i + 1
    );

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  // Reset slide when project changes
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
          "relative bg-brand-dark rounded-2xl max-w-4xl w-full p-5 md:p-7",
          "max-h-[90vh] overflow-hidden"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors duration-200"
          aria-label="Close modal"
        >
          <Icon icon="lucide:x" width={24} height={24} />
        </button>

        {/* Title */}
        <h2
          className={cn(
            montserrat.className,
            "text-brand-orange font-bold text-2xl mb-2 pr-8"
          )}
        >
          {project.name}
        </h2>

        {/* Description */}
        <p className={cn(montserrat.className, "text-white/70 text-sm mb-6")}>
          {project.description}
        </p>

        {/* Screenshot Carousel */}
        <div className="relative overflow-hidden rounded-xl aspect-video bg-black">
          <Image
            src={project.screenshots[currentSlide]}
            alt={`${project.name} screenshot ${currentSlide + 1}`}
            fill
            className="object-contain"
          />

          {project.screenshots.length > 1 && (
            <>
              {/* Prev arrow */}
              <button
                onClick={prev}
                className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2",
                  "w-9 h-9 rounded-full bg-black/50 hover:bg-black/80",
                  "flex items-center justify-center text-white transition-colors duration-200"
                )}
                aria-label="Previous screenshot"
              >
                <Icon icon="lucide:chevron-left" width={20} height={20} />
              </button>

              {/* Next arrow */}
              <button
                onClick={next}
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2",
                  "w-9 h-9 rounded-full bg-black/50 hover:bg-black/80",
                  "flex items-center justify-center text-white transition-colors duration-200"
                )}
                aria-label="Next screenshot"
              >
                <Icon icon="lucide:chevron-right" width={20} height={20} />
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {project.screenshots.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors duration-200",
                      i === currentSlide ? "bg-white" : "bg-white/40"
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const closeModal = useCallback(() => setSelectedProject(null), []);

  return (
    <section
      id="portfolio"
      className={cn(
        "bg-gradient-to-b from-portfolio-dark to-portfolio-warm",
        "min-h-screen lg:h-screen flex flex-col",
        montserrat.className
      )}
    >
      {/* Spacer matching fixed navbar height */}
      <div className="hidden lg:block h-[90px] shrink-0" />

      {/* Content area: 3 rows — top space / grid / bottom space (equal 1fr each side) */}
      <div className="flex-1 grid grid-rows-[1fr_auto_1fr] px-6 pb-6">
        {/* Title — centered in top 1fr = exactly between navbar and grid top */}
        <div className="flex items-center justify-center">
          <h2 className="text-white font-bold text-[36px] leading-none text-center">
            My{" "}
            <span className="text-brand-orange">Portfolio</span>
          </h2>
        </div>

        {/* Grid — auto height, sits right below the title row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-5 w-full max-w-[1200px] mx-auto">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedProject}
            />
          ))}
        </div>

        {/* Bottom spacer — mirrors top 1fr, keeps grid vertically centered */}
        <div />
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
    </section>
  );
}
