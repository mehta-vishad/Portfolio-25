"use client"

import { useEffect, useRef, useState } from "react"

export default function AsciiAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)
  const animationRef = useRef<number | undefined>(undefined)
  const cleanupRef = useRef<(() => void) | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    let isMounted = true
    let camera: any, renderer: any, effect: any

    const loadAnimation = async () => {
      if (!containerRef.current) return
      
      const { clientWidth, clientHeight } = containerRef.current
      console.log("Container size:", clientWidth, clientHeight)
      
      // Wait for container to be properly measured
      if (clientWidth === 0 || clientHeight === 0) {
        console.log("Container not ready, retrying...")
        setTimeout(loadAnimation, 100)
        return
      }

      try {
        const [THREE, { AsciiEffect }] = await Promise.all([
          import("three"),
          import("three/addons/effects/AsciiEffect.js"),
        ])

        if (!isMounted || !containerRef.current) return

        let scene: InstanceType<typeof THREE.Scene>,
          sphere: InstanceType<typeof THREE.Mesh>

        const start = Date.now()

        function init() {
          try {
            const container = containerRef.current!
            console.log("Initializing with container size:", container.clientWidth, container.clientHeight)
            
            // Camera setup - using container dimensions
            camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 1, 1000)
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
            console.log("ASCII animation initialized successfully")
            setIsReady(true)

          } catch (error) {
            console.error("Failed to initialize ASCII animation:", error)
            setIsReady(true)
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
              console.log("Effect element already removed")
            }
          }
          
          if (renderer) {
            renderer.dispose()
          }
          if (scene) {
            scene.clear()
          }
        }

        // Initialize and start - exactly like official example
        init()
        animate()

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

  // ResizeObserver for robust resize handling
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        console.log("ResizeObserver triggered:", width, height)
        
        if (width > 0 && height > 0) {
          // Get the current camera, renderer, and effect from the closure
          const container = containerRef.current
          if (container && isReady) {
            // We need to access these from the animation scope
            // This is a bit tricky with the current structure, so let's use a different approach
            const event = new CustomEvent('ascii-resize', { 
              detail: { width, height } 
            })
            container.dispatchEvent(event)
          }
        }
      }
    })

    observer.observe(containerRef.current)
    resizeObserverRef.current = observer

    return () => {
      observer.disconnect()
      resizeObserverRef.current = null
    }
  }, [isReady])

  // Handle custom resize events
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleResize = (event: any) => {
      const { width, height } = event.detail
      console.log("Handling resize:", width, height)
      
      // Find the Three.js elements in the DOM
      const canvas = container.querySelector('canvas')
      const asciiElement = container.querySelector('div')
      
      if (canvas && asciiElement) {
        // Update canvas size
        canvas.width = width
        canvas.height = height
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
        
        // Update ASCII element size
        asciiElement.style.width = `${width}px`
        asciiElement.style.height = `${height}px`
      }
    }

    container.addEventListener('ascii-resize', handleResize)

    return () => {
      container.removeEventListener('ascii-resize', handleResize)
    }
  }, [isReady])

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[60vh] md:h-[70vh] bg-black"
      style={{ 
        minHeight: "400px",
        overflow: "hidden",
        position: "relative",
        opacity: isReady ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
        // Ensure the container is never 0x0
        minWidth: "100px"
      }}
    />
  )
}
