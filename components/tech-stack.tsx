'use client'

import Image from 'next/image'
import './tech-stack.css'

const techImages = [
  { src: '/images/tech/html.png', alt: 'HTML' },
  { src: '/images/tech/css.png', alt: 'CSS' },
  { src: '/images/tech/js.png', alt: 'JavaScript' },
  { src: '/images/tech/React.png', alt: 'React' },
  { src: '/images/tech/angular.png', alt: 'Angular' },
  { src: '/images/tech/figma.png', alt: 'Figma' },
  { src: '/images/tech/ts.webp', alt: 'typescript' },
  { src: '/images/tech/node.png', alt: 'node' },
  { src: '/images/tech/python.png', alt: 'python' },
  { src: '/images/tech/c++.png', alt: 'C++' },
  { src: '/images/tech/java.png', alt: 'java' },
  { src: '/images/tech/sql.png', alt: 'sql' },
  { src: '/images/tech/pytorch.png', alt: 'pytorch' },
  { src: '/images/tech/tensorflow.png', alt: 'tensorflow' },
  { src: '/images/tech/git.png', alt: 'git' },
  { src: '/images/tech/mongo.webp', alt: 'mongo' },
  { src: '/images/tech/flutter.png', alt: 'flutter' },
  { src: '/images/tech/firebase.png', alt: 'firebase' },
]

export default function TechStack() {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="tech-stack">
          <div className="tech-stack-track">
            {[...techImages, ...techImages].map((image, index) => (
              <div key={index} className="tech-stack-image relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={80}
                  height={80}
                  className="object-contain"
                  priority={index < 10}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 