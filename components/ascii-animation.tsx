"use client"

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"

// Dynamically import Three.js and its extensions to avoid SSR issues
const ThreeModule = dynamic(() => import("three"), { ssr: false })
const AsciiEffectModule = dynamic(
  () => import("three/examples/jsm/effects/AsciiEffect").then((mod) => ({ default: mod.AsciiEffect })),
  { ssr: false },
)

export default function AsciiAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    Promise.all([
      import("three"),
      import("three/examples/jsm/effects/AsciiEffect"),
    ]).then(([THREE, { AsciiEffect }]) => {
      if (!containerRef.current) return

      let camera: THREE.PerspectiveCamera,
        scene: THREE.Scene,
        renderer: THREE.WebGLRenderer,
        effect: any,
        sphere: THREE.Mesh

      const start = Date.now()
      const baseRadius = 500 // Base distance from center

      // Initialize
      function init() {
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
        camera.position.y = 150
        camera.position.z = baseRadius

        scene = new THREE.Scene()
        scene.background = new THREE.Color(0, 0, 0)

        const pointLight1 = new THREE.PointLight(0xffffff, 3, 0, 0)
        pointLight1.position.set(500, 500, 500)
        scene.add(pointLight1)

        const pointLight2 = new THREE.PointLight(0xffffff, 1, 0, 0)
        pointLight2.position.set(-500, -500, -500)
        scene.add(pointLight2)

        sphere = new THREE.Mesh(
          new THREE.SphereGeometry(200, 20, 10),
          new THREE.MeshPhongMaterial({ flatShading: true }),
        )
        scene.add(sphere)

        // Plane
        const plane = new THREE.Mesh(
          new THREE.PlaneGeometry(400, 400),
          new THREE.MeshBasicMaterial({ color: 0xe0e0e0 }),
        )
        plane.position.y = -200
        plane.rotation.x = -Math.PI / 2
        scene.add(plane)

        // Create renderer with alpha and optimized parameters
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: false,
          powerPreference: "high-performance"
        })
        renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight)

        // Create ASCII effect with optimized character set
        effect = new AsciiEffect(renderer, " .:-+*=%@#", { 
          invert: true,
          resolution: 0.15 // Lower resolution for better performance
        })
        effect.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight)
        effect.domElement.style.color = "white"
        effect.domElement.style.backgroundColor = "black"

        containerRef.current!.appendChild(effect.domElement)

        window.addEventListener("resize", onWindowResize)
      }

      function onWindowResize() {
        camera.aspect = containerRef.current!.clientWidth / containerRef.current!.clientHeight
        camera.updateProjectionMatrix()

        renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight)
        effect.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight)
      }

      function animate() {
        const timer = Date.now() - start

        // 360-degree rotation
        const angle = (timer * 0.0005) % (Math.PI * 2)
        
        // Subtle zoom effect (5% variation)
        const zoomFactor = Math.sin(timer * 0.001) * 0.1 + 1
        const currentRadius = baseRadius * zoomFactor
        
        // Update camera position with both rotation and zoom
        camera.position.x = Math.cos(angle) * currentRadius
        camera.position.z = Math.sin(angle) * currentRadius
        camera.lookAt(scene.position)

        sphere.position.y = Math.abs(Math.sin(timer * 0.002)) * 150
        sphere.rotation.x = timer * 0.0003
        sphere.rotation.z = timer * 0.0002

        effect.render(scene, camera)

        requestAnimationFrame(animate)
      }

      init()
      animate()

      // Cleanup
      return () => {
        if (containerRef.current && effect.domElement) {
          containerRef.current.removeChild(effect.domElement)
        }
        window.removeEventListener("resize", onWindowResize)
      }
    })
  }, [])

  return <div ref={containerRef} className="w-full h-[60vh] md:h-[70vh]" />
}
