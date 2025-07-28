"use client"

import { useEffect, useRef, useState } from "react"

export default function AsciiAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const animationRef = useRef<number | undefined>(undefined)
  const cleanupRef = useRef<{(): void; handleResize?: () => void} | null>(null)

  // ResizeObserver to track container size changes
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      console.log("Container size updated:", width, height)
      setContainerSize({ width, height })
    })

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  // Initialize animation only after proper DOM paint
  useEffect(() => {
    let isMounted = true
    let camera: any, renderer: any, effect: any

    const loadAnimation = async () => {
      if (!containerRef.current) return
      
      const { clientWidth, clientHeight } = containerRef.current
      console.log("Loading animation with container size:", clientWidth, clientHeight)
      
      // Wait for container to be properly measured
      if (clientWidth === 0 || clientHeight === 0) {
        console.log("Container not ready, retrying...")
        setTimeout(() => {
          if (isMounted) loadAnimation()
        }, 100)
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
            console.log("Initializing with final container size:", container.clientWidth, container.clientHeight)
            
            // Camera setup - using container dimensions
            camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 1, 1000)
            camera.position.y = 150
            camera.position.z = 500

            // Scene setup
            scene = new THREE.Scene()
            scene.background = new THREE.Color(0, 0, 0)

            // CRITICAL: Add fullscreen black quad to fill framebuffer
            const blackPlane = new THREE.Mesh(
              new THREE.PlaneGeometry(2000, 2000),
              new THREE.MeshBasicMaterial({ 
                color: 0x000000, 
                depthTest: false,
                alphaTest: 1.0,
                opacity: 1,
                transparent: false
              })
            )
            blackPlane.position.z = -999 // Put it far behind everything
            scene.add(blackPlane)

            // Lighting - exactly like the official example
            const pointLight1 = new THREE.PointLight(0xffffff, 3, 0, 0)
            pointLight1.position.set(500, 500, 500)
            scene.add(pointLight1)

            const pointLight2 = new THREE.PointLight(0xffffff, 1, 0, 0)
            pointLight2.position.set(-500, -500, -500)
            scene.add(pointLight2)

            // Sphere - same geometry as official example, NO transparency
            sphere = new THREE.Mesh(
              new THREE.SphereGeometry(200, 20, 10),
              new THREE.MeshPhongMaterial({ 
                flatShading: true,
                transparent: false,
                alphaTest: 1.0,
                opacity: 1
              })
            )
            scene.add(sphere)

            // Plane - NO transparency
            const plane = new THREE.Mesh(
              new THREE.PlaneGeometry(400, 400),
              new THREE.MeshBasicMaterial({ 
                color: 0xe0e0e0,
                transparent: false,
                alphaTest: 1.0,
                opacity: 1
              })
            )
            plane.position.y = -200
            plane.rotation.x = -Math.PI / 2
            scene.add(plane)

            // CRITICAL: Force all materials to be fully opaque
            scene.traverse((obj: any) => {
              if (obj.isMesh && obj.material) {
                obj.material.alphaTest = 1.0
                obj.material.opacity = 1
                obj.material.transparent = false
              }
            })

            // CRITICAL: Production-stable renderer settings
            renderer = new THREE.WebGLRenderer({
              antialias: false,
              alpha: false, // No alpha transparency
              powerPreference: "default",
              preserveDrawingBuffer: false, // Prevents stale pixels from being read
            })
            
            // CRITICAL: WebGL framebuffer fixes
            renderer.autoClear = false // Manual clearing control
            renderer.setClearColor(0x000000, 1) // Force black clear color
            renderer.setSize(container.clientWidth, container.clientHeight)
            renderer.setPixelRatio(1) // Fixed pixel ratio for consistency

            // DIAGNOSTIC: Use plain renderer instead of AsciiEffect
            console.log("🧪 DIAGNOSTIC MODE: Using plain renderer instead of AsciiEffect")
            container.appendChild(renderer.domElement)
            
            // ASCII effect setup (commented out for diagnostic)
            /*
            effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true })
            effect.setSize(container.clientWidth, container.clientHeight)
            
            // Debug logging for size verification
            console.log("Effect size:", container.clientWidth, container.clientHeight)
            console.log("Renderer size:", renderer.getSize(new THREE.Vector2()))
            
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

            // CRITICAL: Pre-warm the effect with a clear dummy frame
            console.log("Pre-warming effect with dummy clear frame...")
            renderer.clear()
            const dummyScene = new THREE.Scene()
            dummyScene.background = new THREE.Color(0, 0, 0)
            const dummyCamera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 1, 1000)
            effect.render(dummyScene, dummyCamera)
            */
            
            console.log("🧪 DIAGNOSTIC: Plain WebGL renderer initialized successfully")
            setIsReady(true)

          } catch (error) {
            console.error("Failed to initialize ASCII animation:", error)
            setIsReady(true)
          }
        }

        // DIAGNOSTIC: Plain renderer animate function
        function animate() {
          if (!isMounted || !scene || !camera || !renderer || !sphere) return

          try {
            const timer = Date.now() - start

            // Animation exactly like the official example
            camera.position.x = Math.cos(timer * 0.0005) * 500
            camera.position.z = Math.sin(timer * 0.0005) * 500
            camera.lookAt(scene.position)

            sphere.position.y = Math.abs(Math.sin(timer * 0.002)) * 150
            sphere.rotation.x = timer * 0.0003
            sphere.rotation.z = timer * 0.0002

            // DIAGNOSTIC: Use plain renderer instead of AsciiEffect
            renderer.clear()
            renderer.render(scene, camera)
            
            if (isMounted) {
              animationRef.current = requestAnimationFrame(animate)
            }
          } catch (error) {
            console.error("Animation error:", error)
          }
        }

        // Resize handler
        function handleResize() {
          if (!camera || !renderer || !containerRef.current) return
          
          try {
            const container = containerRef.current
            console.log("Resizing to:", container.clientWidth, container.clientHeight)
            
            // Update camera
            camera.aspect = container.clientWidth / container.clientHeight
            camera.updateProjectionMatrix()
            
            // Update renderer
            renderer.setSize(container.clientWidth, container.clientHeight)
            
            // Update effect (commented out for diagnostic)
            // effect.setSize(container.clientWidth, container.clientHeight)
            
            console.log("After resize - Renderer size:", renderer.getSize(new THREE.Vector2()))
            
          } catch (error) {
            console.error("Resize error:", error)
          }
        }

        // Setup cleanup function with resize handler
        const cleanup = () => {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
          }
          
          if (containerRef.current && renderer?.domElement) {
            try {
              containerRef.current.removeChild(renderer.domElement)
            } catch (e) {
              console.log("Renderer element already removed")
            }
          }
          
          if (renderer) {
            renderer.dispose()
          }
          if (scene) {
            scene.clear()
          }
        }
        cleanup.handleResize = handleResize
        cleanupRef.current = cleanup

        // CRITICAL: Initialize first, then delay animate() to let GPU stabilize
        init()
        console.log("🧪 DIAGNOSTIC: Delaying animation start for GPU stabilization...")
        setTimeout(() => {
          if (isMounted) {
            console.log("🧪 DIAGNOSTIC: Starting plain renderer animation")
            animate()
          }
        }, 50)

      } catch (error) {
        console.error("Failed to load Three.js modules:", error)
        setIsReady(true)
      }
    }

    // DEFINITIVE FIX: Double requestAnimationFrame for proper DOM paint timing
    const startAfterPaint = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (isMounted) {
            console.log("Starting animation after DOM paint")
            loadAnimation()
          }
        })
      })
    }

    startAfterPaint()

    return () => {
      isMounted = false
      if (cleanupRef.current) {
        cleanupRef.current()
      }
    }
  }, [])

  // Handle container size changes
  useEffect(() => {
    if (containerSize.width > 0 && containerSize.height > 0 && isReady && cleanupRef.current?.handleResize) {
      console.log("Container size changed, updating animation:", containerSize)
      cleanupRef.current.handleResize()
    }
  }, [containerSize, isReady])

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%',
        height: '60vh',
        minHeight: '400px',
        minWidth: '100px',
        overflow: "hidden",
        position: "relative",
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
        backgroundColor: 'black' // Ensure black background during load
      }}
    />
  )
}
