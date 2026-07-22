import { useState, useEffect } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'

function useIsMobile() {
  const query = '(max-width: 768px)'
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return isMobile
}

function ShaderBackground() {
  const isMobile = useIsMobile()

  // Desktop: soft gray-white. Mobile: dark black-white.
  const colors = isMobile
    ? ['#000000', '#1a1a1a', '#333333', '#ffffff']
    : ['#ffffff', '#f0f0f0', '#dcdcdc', '#b4b4b4']

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: -1,
        opacity: isMobile ? 0.95 : 0.8,
      }}
    >
      <MeshGradient
        key={isMobile ? 'mobile' : 'desktop'}
        style={{ width: '100%', height: '100%' }}
        colors={colors}
        speed={1.6}
      />
    </div>
  )
}

export default ShaderBackground
