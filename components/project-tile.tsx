"use client"

import { useState } from "react"
import Image from "next/image"
import type { Project } from "@/data/projects"

interface ProjectTileProps {
  project: Project
  onOpenModal: (project: Project) => void
}

export default function ProjectTile({ project, onOpenModal }: ProjectTileProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative overflow-hidden rounded-lg h-full w-full cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenModal(project)}
    >
      <div className="w-full h-full">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={600}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>

      <div
        className={`absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex items-end transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <h3 className="text-white text-2xl md:text-3xl font-extrabold p-6">{project.title}</h3>
      </div>
    </div>
  )
}
