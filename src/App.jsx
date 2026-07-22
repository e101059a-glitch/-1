import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Portfolio from './components/Portfolio.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import SideNav from './components/SideNav.jsx'
import SocialFloat from './components/SocialFloat.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import ShaderBackground from './components/ShaderBackground.jsx'

function App() {
  const [lang, setLang] = useState('zh')

  return (
    <MotionConfig reducedMotion="user">
      <ShaderBackground />
      <ScrollProgress />
      <SocialFloat />
      <SideNav />
      <Navbar lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Skills lang={lang} />
        <Experience lang={lang} />
        <Portfolio lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </MotionConfig>
  )
}

export default App
