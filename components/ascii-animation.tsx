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
            scene.background = new THREE.Color(0x000000) // Safety net

            // CRITICAL: Add giant black backdrop to flush framebuffer completely
            const backdrop = new THREE.Mesh(
              new THREE.PlaneGeometry(5000, 5000),
              new THREE.MeshBasicMaterial({ 
                color: 0x000000, 
                depthTest: false,
                transparent: false,
                opacity: 1,
                alphaTest: 1.0
              })
            )
            backdrop.position.z = -999
            scene.add(backdrop)

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
                opacity: 1,
                alphaTest: 1.0
              })
            )
            scene.add(sphere)

            // Plane - NO transparency
            const plane = new THREE.Mesh(
              new THREE.PlaneGeometry(400, 400),
              new THREE.MeshBasicMaterial({ 
                color: 0xe0e0e0,
                transparent: false,
                opacity: 1,
                alphaTest: 1.0
              })
            )
            plane.position.y = -200
            plane.rotation.x = -Math.PI / 2
            scene.add(plane)

            // CRITICAL: Production-stable renderer settings with preserveDrawingBuffer fallback
            renderer = new THREE.WebGLRenderer({
              antialias: false,
              alpha: false, // No alpha transparency
              powerPreference: "default",
              preserveDrawingBuffer: true, // Last resort fallback for consistent framebuffer
            })
            
            // CRITICAL: WebGL framebuffer fixes
            renderer.autoClear = false // Manual clearing control
            renderer.setClearColor(0x000000, 1) // Force black clear color
            renderer.setSize(container.clientWidth, container.clientHeight)
            renderer.setPixelRatio(1) // Fixed pixel ratio for consistency

            // ASCII effect - using exact same settings as official example
            effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true })
            effect.setSize(container.clientWidth, container.clientHeight)
            
            // Debug logging for size verification
            console.log("Effect size:", container.clientWidth, container.clientHeight)
            console.log("Renderer size:", renderer.getSize(new THREE.Vector2()))
            
            // CRITICAL: Enhanced DOM styling to prevent blend artifacts
            effect.domElement.style.color = 'white'
            effect.domElement.style.backgroundColor = 'black'
            effect.domElement.style.background = 'black' // Additional fallback
            effect.domElement.style.opacity = '1.0' // Explicit opacity
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

            // CRITICAL: Offscreen dummy render to warm up GPU on Vercel
            console.log("Performing offscreen dummy render for GPU warmup...")
            const dummyTarget = new THREE.WebGLRenderTarget(32, 32)
            renderer.setRenderTarget(dummyTarget)
            renderer.clearColor()
            renderer.clearDepth() 
            renderer.clear()
            renderer.render(scene, camera)
            renderer.setRenderTarget(null)
            dummyTarget.dispose() // Clean up

            container.appendChild(effect.domElement)

            // CRITICAL: Force one clean render with full buffer clearing
            console.log("Pre-warming AsciiEffect with full buffer clear...")
            renderer.clearColor()
            renderer.clearDepth()
            renderer.clear()
            effect.render(scene, camera)

            // CRITICAL: Force all materials to be opaque (traverse after all objects added)
            scene.traverse((obj: any) => {
              if (obj.isMesh && obj.material) {
                obj.material.transparent = false
                obj.material.opacity = 1
                obj.material.alphaTest = 1.0
                console.log("Enforced opacity on:", obj.material.type)
              }
            })
            
            console.log("ASCII animation initialized successfully with all fixes")
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

            // 🔥 CRITICAL: Full framebuffer reset - all 3 clear methods
            renderer.clearColor()
            renderer.clearDepth()
            renderer.clear()

            effect.render(scene, camera)
            
            if (isMounted) {
              animationRef.current = requestAnimationFrame(animate)
            }
          } catch (error) {
            console.error("Animation error:", error)
          }
        }

        // Resize handler
        function handleResize() {
          if (!camera || !renderer || !effect || !containerRef.current) return
          
          try {
            const container = containerRef.current
            console.log("Resizing to:", container.clientWidth, container.clientHeight)
            
            // Update camera
            camera.aspect = container.clientWidth / container.clientHeight
            camera.updateProjectionMatrix()
            
            // Update renderer
            renderer.setSize(container.clientWidth, container.clientHeight)
            
            // Update effect
            effect.setSize(container.clientWidth, container.clientHeight)
            
            // Debug logging after resize
            console.log("After resize - Effect size:", container.clientWidth, container.clientHeight)
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
        cleanup.handleResize = handleResize
        cleanupRef.current = cleanup

        // CRITICAL: Initialize first, then delay animate() to let framebuffer settle
        init()
        console.log("Delaying animation start for framebuffer stabilization...")
        setTimeout(() => {
          if (isMounted) {
            console.log("Starting AsciiEffect animation with full buffer clearing")
            animate()
          }
        }, 50) // Wait 50ms to let framebuffer settle

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
