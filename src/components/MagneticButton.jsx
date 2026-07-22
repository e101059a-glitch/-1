import { useRef } from 'react'

// Button that is gently pulled toward the cursor while hovered.
function MagneticButton({ children, className, onClick, strength = 0.3 }) {
  const ref = useRef(null)

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onMove = (e) => {
    if (prefersReduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }

  return (
    <button
      ref={ref}
      type="button"
      className={className}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: 'transform 0.18s ease-out' }}
    >
      {children}
    </button>
  )
}

export default MagneticButton
