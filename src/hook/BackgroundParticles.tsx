'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useMousePosition } from '@/hook/Mouse-position'

interface Circle {
  x: number
  y: number
  translateX: number
  translateY: number
  size: number
  alpha: number
  targetAlpha: number
  dx: number
  dy: number
  magnetism: number
}

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
}

const FIXED_COLOR = "82, 49, 158"

export default function Particles({
  className = '',
  quantity = 30,
  staticity = 50,
  ease = 50,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const circlesRef = useRef<Circle[]>([])
  const animationFrameRef = useRef<number>(0)
  
  const mousePosition = useMousePosition()
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const canvasSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1

  const circleParams = useCallback((): Circle => ({
    x: Math.floor(Math.random() * canvasSizeRef.current.w),
    y: Math.floor(Math.random() * canvasSizeRef.current.h),
    translateX: 0,
    translateY: 0,
    size: Math.floor(Math.random() * 2) + 1,
    alpha: 0,
    targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
    dx: (Math.random() - 0.5) * 0.2,
    dy: (Math.random() - 0.5) * 0.2,
    magnetism: 0.1 + Math.random() * 4
  }), [])

  const drawCircle = useCallback((circle: Circle, update = false) => {
    const ctx = contextRef.current
    if (!ctx) return

    const { x, y, translateX, translateY, size, alpha } = circle
    
    ctx.save()
    ctx.translate(translateX, translateY)
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${FIXED_COLOR}, ${alpha})`
    ctx.fill()
    ctx.restore()

    if (!update) {
      circlesRef.current.push(circle)
    }
  }, [])

  const clearContext = useCallback(() => {
    const ctx = contextRef.current
    if (ctx) {
      ctx.clearRect(0, 0, canvasSizeRef.current.w, canvasSizeRef.current.h)
    }
  }, [])

  const resizeCanvas = useCallback(() => {
    if (!canvasContainerRef.current || !canvasRef.current) return

    circlesRef.current = []
    const container = canvasContainerRef.current
    const canvas = canvasRef.current
    
    canvasSizeRef.current.w = container.offsetWidth
    canvasSizeRef.current.h = container.offsetHeight
    
    canvas.width = canvasSizeRef.current.w * dpr
    canvas.height = canvasSizeRef.current.h * dpr
    canvas.style.width = `${canvasSizeRef.current.w}px`
    canvas.style.height = `${canvasSizeRef.current.h}px`
    
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
      contextRef.current = ctx
    }
  }, [dpr])

  const onMouseMove = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const { w, h } = canvasSizeRef.current
    const x = mousePosition.x - rect.left - w / 2
    const y = mousePosition.y - rect.top - h / 2
    const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2
    
    if (inside) {
      mouseRef.current = { x, y }
    }
  }, [mousePosition.x, mousePosition.y])

  const drawParticles = useCallback(() => {
    clearContext()
    for (let i = 0; i < quantity; i++) {
      drawCircle(circleParams())
    }
  }, [quantity, circleParams, drawCircle, clearContext])

  const initCanvas = useCallback(() => {
    resizeCanvas()
    drawParticles()
  }, [resizeCanvas, drawParticles])

  const animate = useCallback(() => {
    clearContext()
    const circles = circlesRef.current
    
    for (let i = circles.length - 1; i >= 0; i--) {
      const circle = circles[i]
      
      const edges = [
        circle.x + circle.translateX - circle.size,
        canvasSizeRef.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSizeRef.current.h - circle.y - circle.translateY - circle.size,
      ]
      
      const closestEdge = Math.min(...edges)
      const remapClosestEdge = ((closestEdge - 0) * (1 - 0)) / (20 - 0) + 0
      const clampedEdge = Math.max(0, remapClosestEdge)
      const finalEdge = parseFloat(clampedEdge.toFixed(2))
      
      if (finalEdge > 1) {
        circle.alpha = Math.min(circle.alpha + 0.02, circle.targetAlpha)
      } else {
        circle.alpha = circle.targetAlpha * finalEdge
      }
      
      circle.x += circle.dx
      circle.y += circle.dy
      circle.translateX += (mouseRef.current.x / (staticity / circle.magnetism) - circle.translateX) / ease
      circle.translateY += (mouseRef.current.y / (staticity / circle.magnetism) - circle.translateY) / ease
      
      if (
        circle.x < -circle.size ||
        circle.x > canvasSizeRef.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSizeRef.current.h + circle.size
      ) {
        circles.splice(i, 1)
        drawCircle(circleParams())
      } else {
        drawCircle({ ...circle }, true)
      }
    }
    
    animationFrameRef.current = requestAnimationFrame(animate)
  }, [staticity, ease, circleParams, drawCircle, clearContext])

  useEffect(() => {
    const handleResize = () => {
      cancelAnimationFrame(animationFrameRef.current)
      initCanvas()
      animate()
    }
    
    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [initCanvas, animate])

  useEffect(() => {
    onMouseMove()
  }, [onMouseMove])

  useEffect(() => {
    if (canvasRef.current) {
      contextRef.current = canvasRef.current.getContext('2d')
      initCanvas()
      animate()
    }
    
    return () => {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [initCanvas, animate])

  return (
    <div 
      className={className} 
      ref={canvasContainerRef} 
      aria-hidden="true"
    >
      <canvas className='p-events-none u-select-none' ref={canvasRef} />
    </div>
  )
}