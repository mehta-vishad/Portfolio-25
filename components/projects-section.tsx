"use client"

import { useState } from "react"
import { projects } from "@/data/projects"
import ProjectTile from "./project-tile"
import ProjectModal from "./project-modal"
import type { Project } from "@/data/projects"

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project)
  }

  const handleCloseModal = () => {
    setSelectedProject(null)
  }

  return (
    <section id="projects" className="py-20">
      <div className="w-[90%] max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Previous <span className="text-purple-500">Work</span>
        </h2>

        {/* Desktop grid (12 columns) - reverted to original height */}
        <div className="hidden lg:grid grid-cols-12 gap-2 auto-rows-[200px]">
          {projects.slice(0, 8).map((project, index) => (
            <div key={project.id} className={`project-tile-${index}`}>
              <ProjectTile project={project} onOpenModal={handleOpenModal} />
            </div>
          ))}
        </div>

        {/* Tablet grid (2 columns) */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-2">
          {projects.map((project) => (
            <div key={project.id} className="tablet-project-tile">
              <ProjectTile project={project} onOpenModal={handleOpenModal} />
            </div>
          ))}
        </div>

        {/* Mobile grid (1 column) */}
        <div className="grid md:hidden grid-cols-1 gap-2">
          {projects.map((project) => (
            <div key={project.id} className="mobile-project-tile">
              <ProjectTile project={project} onOpenModal={handleOpenModal} />
            </div>
          ))}
        </div>
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={handleCloseModal} />}
    </section>
  )
}
