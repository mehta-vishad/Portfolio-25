"use client"

import { useEffect, useRef, useState } from "react"

export default function AsciiAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)
  const animationRef = useRef<number | undefined>(undefined)
  const cleanupRef = useRef<(() => void) | null>(null)

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

        const start = Date.now()

        function init() {
          try {
            const container = containerRef.current!
            
            // Camera setup - exact same as Three.js example
            camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
            camera.position.y = 150
            camera.position.z = 500

            // Scene setup
            scene = new THREE.Scene()
            scene.background = new THREE.Color(0, 0, 0)

            // Lighting - exactly like the official example
            const pointLight1 = new THREE.PointLight(0xffffff, 3, 0, 0)
            pointLight1.position.set(500, 500, 500)
            scene.add(pointLight1)

            const pointLight2 = new THREE.PointLight(0xffffff, 1, 0, 0)
            pointLight2.position.set(-500, -500, -500)
            scene.add(pointLight2)

            // Sphere - same geometry as official example
            sphere = new THREE.Mesh(
              new THREE.SphereGeometry(200, 20, 10),
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

            // Renderer - production-stable settings
            renderer = new THREE.WebGLRenderer({
              antialias: false,
              alpha: false,
              powerPreference: "default"
            })
            renderer.setSize(container.clientWidth, container.clientHeight)
            renderer.setPixelRatio(1) // Fixed pixel ratio for consistency

            // ASCII effect - using exact same settings as official example
            effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true })
            effect.setSize(container.clientWidth, container.clientHeight)
            
            // Critical: Apply exact same styling as official example
            effect.domElement.style.color = 'white'
            effect.domElement.style.backgroundColor = 'black'
            effect.domElement.style.fontFamily = 'Courier, monospace'
            effect.domElement.style.fontWeight = 'normal'
            effect.domElement.style.fontSize = '12px'
            effect.domElement.style.lineHeight = '1'
            effect.domElement.style.letterSpacing = '0'
            effect.domElement.style.whiteSpace = 'pre'
            effect.domElement.style.margin = '0'
            effect.domElement.style.padding = '0'
            effect.domElement.style.border = 'none'
            effect.domElement.style.outline = 'none'
            effect.domElement.style.textAlign = 'left'
            effect.domElement.style.verticalAlign = 'top'

            container.appendChild(effect.domElement)
            setIsReady(true)

          } catch (error) {
            console.error("Failed to initialize ASCII animation:", error)
            setIsReady(true)
          }
        }

        function onWindowResize() {
          if (!camera || !renderer || !effect || !containerRef.current) return
          
          try {
            const container = containerRef.current
            camera.aspect = container.clientWidth / container.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(container.clientWidth, container.clientHeight)
            effect.setSize(container.clientWidth, container.clientHeight)
          } catch (error) {
            console.error("Resize error:", error)
          }
        }

        function animate() {
          if (!isMounted || !scene || !camera || !effect || !sphere) return

          try {
            const timer = Date.now() - start

            // Animation exactly like the official example
            camera.position.x = Math.cos(timer * 0.0005) * 500
            camera.position.z = Math.sin(timer * 0.0005) * 500
            camera.lookAt(scene.position)

            sphere.position.y = Math.abs(Math.sin(timer * 0.002)) * 150
            sphere.rotation.x = timer * 0.0003
            sphere.rotation.z = timer * 0.0002

            effect.render(scene, camera)
            
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
          
          if (renderer) {
            renderer.dispose()
          }
          if (scene) {
            scene.clear()
          }
          
          window.removeEventListener("resize", onWindowResize)
        }

        // Initialize and start - exactly like official example
        init()
        animate()
        
        window.addEventListener("resize", onWindowResize)

      } catch (error) {
        console.error("Failed to load Three.js modules:", error)
        setIsReady(true)
      }
    }

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
