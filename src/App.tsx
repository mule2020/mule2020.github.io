import { useRevealObserver, useActiveSection } from './hooks'
import Dock from './components/Dock'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { SECTIONS } from './data/sections'

const IDS = SECTIONS.map((s) => s.id)

export default function App() {
  useRevealObserver()
  const active = useActiveSection(IDS)

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-bone"
      >
        Skip to content
      </a>
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
      <Dock active={active} />
    </>
  )
}
