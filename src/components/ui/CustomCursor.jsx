import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// A small dot + trailing ring that replaces the system cursor on fine-pointer
// desktops. Entirely inert on touch devices and for prefers-reduced-motion —
// in both cases the component renders nothing and the native cursor is used.
//
// Any element with `data-cursor-label="View Project"` expands the ring into
// a small pill showing that text — used on project visuals so the cursor
// itself signals "this is clickable" before the pointer reaches a link.
function CustomCursor() {
  const shouldReduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState(null)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    setEnabled(isFinePointer && !shouldReduceMotion)
  }, [shouldReduceMotion])

  useEffect(() => {
    if (!enabled) return undefined

    document.documentElement.classList.add('custom-cursor')

    let frame
    const move = (e) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
      ring.current.targetX = e.clientX
      ring.current.targetY = e.clientY
    }

    const animateRing = () => {
      const target = ring.current
      target.x += ((target.targetX ?? target.x) - target.x) * 0.18
      target.y += ((target.targetY ?? target.y) - target.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`
      }
      frame = requestAnimationFrame(animateRing)
    }

    const setHoverState = (e) => {
      const labelEl = e.target.closest('[data-cursor-label]')
      const hoverEl = e.target.closest('a, button, [role="button"], input, textarea, [data-cursor-hover]')
      setLabel(labelEl ? labelEl.getAttribute('data-cursor-label') : null)
      setHovering(Boolean(hoverEl || labelEl))
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', setHoverState)
    frame = requestAnimationFrame(animateRing)

    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', setHoverState)
      cancelAnimationFrame(frame)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed left-0 top-0 z-[200] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent will-change-transform transition-opacity duration-200 ${
          label ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed left-0 top-0 z-[200] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border will-change-transform transition-[width,height,border-color,background-color] duration-200 ease-out ${
          label
            ? 'h-16 w-16 border-accent bg-bg/90 backdrop-blur-sm'
            : hovering
              ? 'h-10 w-10 border-accent'
              : 'h-6 w-6 border-ink/40'
        }`}
      >
        {label && (
          <span className="font-mono text-[9px] uppercase tracking-wide text-accent text-center leading-tight px-1">
            {label}
          </span>
        )}
      </div>
    </>
  )
}

export default CustomCursor
