"use client"

import { useState } from "react"

interface TimelineItem {
  title: string
  company: string
  date: string
  degree?: string
  description: string
}

const timelineData: TimelineItem[] = [
  {
    "title": "Software Engineering Systems Graduate",
    "company": "Northeastern University",
    "date": "September 2023 - August 2025",
    "degree": "MS in Software Engineering Systems",
    "description": "Pursuing a Master's degree with a focus on software engineering, system design, and advanced algorithms. Maintaining a GPA of 4.0."
  },
  {
    "title": "Full-Stack Engineer Co-op",
    "company": "Sycamore Informatics, Waltham, MA",
    "date": "July 2024 - December 2024",
    "description": "Spearheaded a full-stack AI-powered semantic search system using Django, React, and Docker on EC2, leveraging MeiliSearch's vector search with HuggingFace embeddings. Automated daily vector updates and zero-downtime deployment, reducing clinical study creation time by 80%. Resolved 15+ critical bugs in a Rails legacy codebase, improving audit logging and permission logic using Semaphore CI for 100% test coverage."
  },
  {
    "title": "Research Intern",
    "company": "King Faisal University, Remote",
    "date": "April 2022 - October 2022",
    "description": "Developed drone-based crack detection algorithms with 99.28% accuracy and 20% fewer false positives. Co-authored a paper on shallow CNNs for drone-assisted structural assessments, presented at SMARTCOM 2023."
  },
  {
    "title": "Software/Data Engineer Intern",
    "company": "Discite Analytics and AI (a DynPro Company), Bangalore, India",
    "date": "October 2021 - October 2022",
    "description": "Engineered and optimized dashboards and chatbots for 4+ clients. Developed an automated data acquisition system, attracting 3 major clients with $1M+ revenue each. Launched an AWS Lex chatbot for IoT device control and an NLP-driven resume parser, increasing candidate identification efficiency by 50%."
  },
  {
    "title": "Application Developer",
    "company": "Freelancer, Gujarat, India",
    "date": "January 2022 - March 2022",
    "description": "Developed and implemented a Human Resource Management App using Flutter and Firebase, revolutionizing SME operations by eliminating paper-based processes and saving 20 human hours monthly for a local gas station chain."
  },
  {
    "title": "Computer Science Engineering Undergraduate",
    "company": "SRM University",
    "date": "June 2019 - May 2023",
    "degree": "B.Tech in Computer Science and Engineering, specialization in Cloud Computing",
    "description": "Completed undergraduate studies with a focus on cloud computing and security, achieving a GPA of 9.3/10."
  }
]

export default function Timeline() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedItems(newExpanded)
  }

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <section id="experience" className="py-20 bg-black">
      <div className="w-[90%] max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          <span className="text-purple-500">Experience</span>
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-0.5 h-full bg-white"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:items-center`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-purple-500 border-4 border-black rounded-full z-10 shadow-lg"></div>

                {/* Content card */}
                <div
                  className={`ml-12 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  } md:w-5/12 bg-gray-900 border border-gray-700 rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-purple-500/50`}
                >
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-purple-400 font-semibold mb-1">
                      {item.company}
                    </p>
                    <p className="text-gray-400 text-sm mb-2">
                      {item.date}
                    </p>
                    {item.degree && (
                      <p className="text-purple-300 text-sm font-medium mb-2">
                        {item.degree}
                      </p>
                    )}
                  </div>
                  
                  <div className="text-gray-300 text-sm leading-relaxed">
                    {expandedItems.has(index) ? (
                      <p>{item.description}</p>
                    ) : (
                      <p>{truncateText(item.description)}</p>
                    )}
                    
                    {item.description.length > 150 && (
                      <button
                        onClick={() => toggleExpanded(index)}
                        className="mt-2 text-purple-400 hover:text-purple-300 text-xs font-medium transition-colors duration-200"
                      >
                        {expandedItems.has(index) ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 