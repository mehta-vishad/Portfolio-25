"use client"

import { useEffect, useRef, useState } from "react"

export default function AsciiAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)
  const animationRef = useRef<number | undefined>(undefined)
  const cleanupRef = useRef<(() => void) | null>(null)
  const lastFrameTime = useRef<number>(0)

  useEffect(() => {
    let isMounted = true

    const loadAnimation = async () => {
      try {
        const [THREE, { AsciiEffect }] = await Promise.all([
          import("three"),
          import("three/addons/effects/AsciiEffect.js"),
        ])

        if (!isMounted || !containerRef.current) return

        let camera: InstanceType<typeof THREE.PerspectiveCamera>,
          scene: InstanceType<typeof THREE.Scene>,
          renderer: InstanceType<typeof THREE.WebGLRenderer>,
          effect: any,
          sphere: InstanceType<typeof THREE.Mesh>

        const startTime = performance.now()
        const baseRadius = 500
        const targetFPS = 60
        const frameInterval = 1000 / targetFPS

        // Initialize with better error handling
        function init() {
          try {
            // Camera setup
            camera = new THREE.PerspectiveCamera(
              70, 
              containerRef.current!.clientWidth / containerRef.current!.clientHeight, 
              1, 
              1000
            )
            camera.position.y = 150
            camera.position.z = baseRadius

            // Scene setup
            scene = new THREE.Scene()
            scene.background = new THREE.Color(0, 0, 0)

            // Lighting - optimized for smoother rendering
            const pointLight1 = new THREE.PointLight(0xffffff, 2.5, 0, 0)
            pointLight1.position.set(500, 500, 500)
            scene.add(pointLight1)

            const pointLight2 = new THREE.PointLight(0xffffff, 0.8, 0, 0)
            pointLight2.position.set(-500, -500, -500)
            scene.add(pointLight2)

            // Sphere with optimized geometry
            sphere = new THREE.Mesh(
              new THREE.SphereGeometry(200, 16, 12), // Reduced segments for better performance
              new THREE.MeshPhongMaterial({ flatShading: true })
            )
            scene.add(sphere)

            // Plane
            const plane = new THREE.Mesh(
              new THREE.PlaneGeometry(400, 400),
              new THREE.MeshBasicMaterial({ color: 0xe0e0e0 })
            )
            plane.position.y = -200
            plane.rotation.x = -Math.PI / 2
            scene.add(plane)

            // Renderer with smooth settings
            renderer = new THREE.WebGLRenderer({
              alpha: true,
              antialias: false,
              powerPreference: "high-performance",
              preserveDrawingBuffer: false,
              failIfMajorPerformanceCaveat: false
            })
            renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

            // ASCII effect with smooth settings
            effect = new AsciiEffect(renderer, " .:-+*=%@#", { 
              invert: true,
              resolution: 0.18 // Optimized for smoothness
            })
            
            effect.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight)
            
            // Ensure proper styling for smooth rendering
            if (effect.domElement) {
              effect.domElement.style.color = "white"
              effect.domElement.style.backgroundColor = "black"
              effect.domElement.style.fontFamily = "monospace"
              effect.domElement.style.lineHeight = "1"
              effect.domElement.style.letterSpacing = "0"
              effect.domElement.style.overflow = "hidden"
              effect.domElement.style.willChange = "transform" // GPU acceleration hint
              containerRef.current!.appendChild(effect.domElement)
            }

            // Mark as ready after successful initialization
            setIsReady(true)

          } catch (error) {
            console.error("Failed to initialize ASCII animation:", error)
            setIsReady(true) // Still mark as ready to prevent infinite loading
          }
        }

        function onWindowResize() {
          if (!camera || !renderer || !effect || !containerRef.current) return
          
          try {
            camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
            effect.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
          } catch (error) {
            console.error("Resize error:", error)
          }
        }

        function animate(currentTime: number) {
          if (!isMounted || !scene || !camera || !effect || !sphere) return

          // Frame rate limiting for smoother animation
          if (currentTime - lastFrameTime.current < frameInterval) {
            animationRef.current = requestAnimationFrame(animate)
            return
          }

          try {
            const elapsed = (currentTime - startTime) * 0.001 // Convert to seconds

            // Smoother, interpolated animations
            const rotationSpeed = 0.15 // Slower rotation for smoothness
            const angle = (elapsed * rotationSpeed) % (Math.PI * 2)
            
            // Gentler zoom with easing
            const zoomSpeed = 0.4
            const zoomAmount = 0.03 // Reduced zoom variation
            const zoomFactor = Math.sin(elapsed * zoomSpeed) * zoomAmount + 1
            const currentRadius = baseRadius * zoomFactor
            
            // Smooth camera movement with interpolation
            camera.position.x = Math.cos(angle) * currentRadius
            camera.position.z = Math.sin(angle) * currentRadius
            camera.lookAt(scene.position)

            // Smoother sphere animation
            const bounceSpeed = 0.5
            const bounceHeight = 80 // Reduced bounce height
            sphere.position.y = Math.abs(Math.sin(elapsed * bounceSpeed)) * bounceHeight
            
            // Slower rotation for smoother look
            sphere.rotation.x = elapsed * 0.1
            sphere.rotation.z = elapsed * 0.08

            effect.render(scene, camera)
            lastFrameTime.current = currentTime
            
            if (isMounted) {
              animationRef.current = requestAnimationFrame(animate)
            }
          } catch (error) {
            console.error("Animation error:", error)
          }
        }

        // Setup cleanup function
        cleanupRef.current = () => {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
          }
          
          if (containerRef.current && effect?.domElement) {
            try {
              containerRef.current.removeChild(effect.domElement)
            } catch (e) {
              // Element might already be removed
            }
          }
          
          // Dispose of Three.js objects
          if (renderer) {
            renderer.dispose()
          }
          if (scene) {
            scene.clear()
          }
          
          window.removeEventListener("resize", onWindowResize)
        }

        // Initialize and start animation
        init()
        // Start animation loop with performance.now() for better timing
        animationRef.current = requestAnimationFrame(animate)
        
        window.addEventListener("resize", onWindowResize)

      } catch (error) {
        console.error("Failed to load Three.js modules:", error)
        setIsReady(true)
      }
    }

    // Start loading animation after a brief delay
    const timer = setTimeout(loadAnimation, 200)

    return () => {
      isMounted = false
      clearTimeout(timer)
      if (cleanupRef.current) {
        cleanupRef.current()
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[60vh] md:h-[70vh] bg-black"
      style={{ 
        minHeight: "400px",
        overflow: "hidden",
        position: "relative",
        opacity: isReady ? 1 : 0,
        transition: "opacity 0.5s ease-in-out"
      }}
    />
  )
}
