import { useEffect, useRef, useState } from 'react'
import { animate, AnimatePresence, motion, MotionConfig, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Camera, Check, ChevronDown, Code2, Copy, Menu, Moon, Pause, Play, Sun, Terminal, X } from 'lucide-react'
import { SiC, SiCplusplus, SiCss, SiFlask, SiHtml5, SiJavascript, SiPostgresql, SiPython, SiReact, SiVite, SiVuedotjs } from 'react-icons/si'
import { EMAIL, GITHUB, INSTAGRAM, skills } from './content.jsx'
import { contentByLanguage, copy } from './i18n.js'

const easing = [.22, 1, .36, 1]
const skillIcons = {
  Python: SiPython,
  JavaScript: SiJavascript,
  C: SiC,
  'C++': SiCplusplus,
  HTML: SiHtml5,
  CSS: SiCss,
  React: SiReact,
  'Vue 3': SiVuedotjs,
  Flask: SiFlask,
  PostgreSQL: SiPostgresql,
  Vite: SiVite,
}
function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ duration: .7, delay, ease: easing }}>{children}</motion.div>
}

function MagneticLink({ children, className = '', ...props }) {
  const reduced = useReducedMotion()
  const mx = useMotionValue(0), my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 190, damping: 22 })
  const y = useSpring(my, { stiffness: 190, damping: 22 })
  function move(event) {
    if (reduced || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    mx.set((event.clientX - rect.left - rect.width / 2) * .09)
    my.set((event.clientY - rect.top - rect.height / 2) * .12)
  }
  return <motion.a {...props} className={className} style={{ x, y }} onPointerMove={move} onPointerLeave={() => { mx.set(0); my.set(0) }}>{children}</motion.a>
}

function SplitLine({ children, delay = 0 }) {
  const reduced = useReducedMotion()
  return <span className="split-line"><motion.span initial={reduced ? false : { y: '110%', rotate: 2 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: .95, delay, ease: easing }}>{children}</motion.span></span>
}

function WavyText({ text }) {
  const reduced = useReducedMotion()
  return <span className="wavy-text" aria-hidden="true">{[...text].map((character, index) => <motion.span key={`${character}-${index}`} animate={reduced ? undefined : { y: [0, 0, -5, 0, 0], rotate: [0, 0, index % 2 ? 1 : -1, 0, 0] }} transition={{ duration: 2.6, delay: index * .06, times: [0, .28, .46, .64, 1], repeat: Infinity, ease: 'easeInOut' }}>{character === ' ' ? '\u00a0' : character}</motion.span>)}</span>
}

function SplitRevealText({ text }) {
  const reduced = useReducedMotion()
  let characterIndex = 0
  return <span className="split-reveal" aria-label={text}>{text.split(' ').map((word, wordIndex) => <span className="split-reveal-word" aria-hidden="true" key={`${word}-${wordIndex}`}>{[...word].map(character => {
    const index = characterIndex++
    return <span className="split-reveal-mask" key={`${character}-${index}`}><motion.span initial={reduced ? false : { y: '115%', rotate: 5, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }} transition={{ duration: .58, delay: index * .018, ease: easing }}>{character}</motion.span></span>
  })}</span>)}</span>
}

function TypewriterText({ texts, speed = 62, pause = 1450, className = '' }) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [value, setValue] = useState(reduced ? texts[0] : '')
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    if (reduced) { setValue(texts[0]); return }
    const target = texts[index]
    const nextIndex = (index + 1) % texts.length
    const next = texts[nextIndex]
    let common = 0
    while (common < target.length && common < next.length && target[common] === next[common]) common++
    let delay = speed
    let action
    if (!deleting && value !== target) {
      const nextCharacter = target[value.length]
      delay = speed + (/[,.!?]/.test(nextCharacter || '') ? 110 : (value.length % 4) * 8)
      action = () => setValue(target.slice(0, value.length + 1))
    } else if (!deleting) {
      delay = pause
      action = () => setDeleting(true)
    } else if (value.length > common) {
      delay = Math.max(24, speed * .48)
      action = () => setValue(value.slice(0, -1))
    } else {
      delay = 130
      action = () => { setIndex(nextIndex); setDeleting(false) }
    }
    const timer = setTimeout(action, delay)
    return () => clearTimeout(timer)
  }, [deleting, index, pause, reduced, speed, texts, value])
  return <span className={`typewriter ${className}`} aria-label={texts[index]}><span aria-hidden="true">{value}</span><span className="typewriter-cursor" aria-hidden="true"/></span>
}

function MagneticField() {
  const needles = useRef([])
  const fieldFrame = useRef(0)
  const pointer = useRef({ x: 0, y: 0 })
  const reduced = useReducedMotion()
  const filings = Array.from({ length: 168 }, (_, index) => ({
    left: `${1 + ((index * 37) % 98)}%`,
    top: `${2 + ((index * 53) % 96)}%`,
    angle: (index * 23) % 180,
    color: ['#315f9f', '#8fa7b8', '#bbc7b4', '#27313d'][index % 4],
    delay: `${-(index % 9) * .42}s`,
    dx: `${((index * 13) % 30) - 15}px`,
    dy: `${((index * 19) % 26) - 13}px`,
    duration: `${3.2 + (index % 7) * .48}s`,
    size: `${7 + (index % 4) * 2}px`,
    opacity: .22 + (index % 6) * .075,
  }))
  const point = event => {
    if (reduced || event.pointerType !== 'mouse') return
    pointer.current = { x: event.clientX, y: event.clientY }
    if (fieldFrame.current) return
    fieldFrame.current = requestAnimationFrame(() => {
      fieldFrame.current = 0
      needles.current.forEach(node => {
        if (!node) return
        const rect = node.getBoundingClientRect()
        const dx = pointer.current.x - (rect.left + rect.width / 2)
        const dy = pointer.current.y - (rect.top + rect.height / 2)
        const angle = Math.atan2(dy, dx) * 180 / Math.PI
        const pull = Math.max(0, 1 - Math.hypot(dx, dy) / 300) * 18
        node.style.transform = `translate3d(${Math.cos(angle * Math.PI / 180) * pull}px,${Math.sin(angle * Math.PI / 180) * pull}px,0) rotate(${angle}deg)`
      })
    })
  }
  const reset = () => needles.current.forEach((node, index) => { if (node) node.style.transform = `rotate(${filings[index].angle}deg)` })
  useEffect(() => {
    window.addEventListener('pointermove', point, { passive: true })
    window.addEventListener('blur', reset)
    return () => { window.removeEventListener('pointermove', point); window.removeEventListener('blur', reset); cancelAnimationFrame(fieldFrame.current) }
  })
  return <div className="magnetic-field" aria-hidden="true">{filings.map((filing, index) => <span className="filing-drift" key={index} style={{ left: filing.left, top: filing.top, animationDelay: filing.delay, animationDuration: filing.duration, '--drift-x': filing.dx, '--drift-y': filing.dy }}><span ref={node => { needles.current[index] = node }} className="filing-needle" style={{ color: filing.color, width: filing.size, height: filing.size, opacity: filing.opacity, transform: `rotate(${filing.angle}deg)` }}/></span>)}</div>
}

function TerminalPanel({ t }) {
  const [command, setCommand] = useState(null)
  const lines = [
    ['prompt', 'vinicius@portfolio ~ % whoami'],
    ['answer', t.terminalAnswer],
    ['prompt', `vinicius@portfolio ~ % ${t.terminalFocus}`],
  ]
  return <motion.div className="terminal-panel" initial={{ opacity: 0, y: 24, rotateX: -8 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: .65, duration: .8, ease: easing }}>
    <div className="terminal-bar"><span/><span/><span/><div><Terminal size={13}/> terminal — vm</div></div>
    <div className="terminal-body">{lines.map(([kind, text], index) => <motion.div key={text} className={`terminal-line ${kind}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .85 + index * .13 }}>{text}</motion.div>)}<AnimatePresence mode="wait" initial={false}><motion.div key={command || 'auto'} className="terminal-line answer terminal-dynamic" initial={{ opacity: 0, x: -8, filter: 'blur(4px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, x: 8, filter: 'blur(4px)' }} transition={{ duration: .28 }}>{command ? t.terminalResponses[command] : <TypewriterText texts={t.terminalWords} speed={38} pause={1650}/>}</motion.div></AnimatePresence><div className="terminal-commands" aria-label={t.terminalLabel}>{Object.keys(t.terminalCommands).map(item => <button key={item} className={command === item ? 'is-active' : ''} onClick={() => setCommand(command === item ? null : item)}><span>$</span> {t.terminalCommands[item]}</button>)}</div></div>
  </motion.div>
}

function StackCard({ note, position, count, onNext, t }) {
  const x = useMotionValue(0)
  const dragRotate = useTransform(x, [-260, 0, 260], [-12, 0, 12])
  const dragOpacity = useTransform(x, [-280, -160, 0, 160, 280], [.1, .75, 1, .75, .1])
  const dragged = useRef(false)
  const animating = useRef(false)
  const button = useRef(null)
  const top = position === 0
  const dismiss = direction => {
    if (!top || animating.current) return
    animating.current = true
    animate(x, direction * 620, { type: 'spring', stiffness: 220, damping: 25 }).then(() => {
      x.set(0)
      button.current?.blur()
      onNext()
      requestAnimationFrame(() => {
        dragged.current = false
        animating.current = false
      })
    })
  }
  const finish = (_, info) => {
    if (!top) return
    dragged.current = Math.abs(info.offset.x) > 4
    const direction = info.offset.x === 0 ? 1 : Math.sign(info.offset.x)
    const shouldMove = Math.abs(info.offset.x) > 85 || Math.abs(info.velocity.x) > 550
    if (!shouldMove) {
      animate(x, 0, { type: 'spring', stiffness: 420, damping: 32 })
      requestAnimationFrame(() => { dragged.current = false })
      return
    }
    dismiss(direction)
  }
  return <motion.div className="process-card-layer" aria-hidden={!top} animate={{ y: position * 18, x: position * 5, scale: 1 - position * .04, rotate: (position % 2 ? 1 : -1) * position * 1.8, opacity: 1 - position * .18 }} transition={{ type: 'spring', stiffness: 280, damping: 28 }} style={{ zIndex: count - position, pointerEvents: top ? 'auto' : 'none' }}>
    <motion.button ref={button} className="process-card" tabIndex={top ? 0 : -1} drag={top ? 'x' : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={.78} style={{ x, rotate: dragRotate, opacity: top ? dragOpacity : 1 }} whileTap={top ? { scale: .985, cursor: 'grabbing' } : undefined} onDragStart={() => { dragged.current = true }} onDragEnd={finish} onClick={() => { if (top && !dragged.current) dismiss(1) }} aria-label={`${note.title} — ${t.processCardAction}`}>
      <span>{note.number}</span><span className="process-card-title">{note.title}</span><p>{note.text}</p><small>{t.processHint}</small>
    </motion.button>
  </motion.div>
}

function ProcessStack({ notes, t }) {
  const [active, setActive] = useState(0)
  const next = () => setActive(value => (value + 1) % notes.length)
  return <div className="process-stack-wrap">
    <div className="process-stack">{notes.map((note, index) => {
      const position = (index - active + notes.length) % notes.length
      return <StackCard key={note.number} note={note} position={position} count={notes.length} onNext={next} t={t}/>
    })}</div>
    <p className="sr-only" aria-live="polite">{t.currentCard} {notes[active].title}</p>
    <div className="stack-dots" aria-label={t.chooseProcess}>{notes.map((note, index) => <button key={note.number} className={index === active ? 'active' : ''} onClick={() => setActive(index)} aria-label={`${t.showStep} ${index + 1}: ${note.title}`} aria-current={index === active ? 'step' : undefined}/>)}</div>
  </div>
}

function Portrait({ t }) {
  const reduced = useReducedMotion()
  const mx = useMotionValue(0), my = useMotionValue(0)
  const rotateX = useSpring(my, { stiffness: 100, damping: 22 })
  const rotateY = useSpring(mx, { stiffness: 100, damping: 22 })
  return <div className="portrait-stage" onPointerMove={e => {
    if (reduced || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - .5) * 7)
    my.set(-((e.clientY - r.top) / r.height - .5) * 7)
  }} onPointerLeave={() => { mx.set(0); my.set(0) }}>
    <motion.figure className="portrait" style={{ rotateX, rotateY }}>
      <img src="/vinicius-mota.jfif" alt="Vinicius Mota" width="1024" height="1024" fetchPriority="high" />
      <figcaption><span>Vinicius Mota</span><span>{t.portraitRole}</span></figcaption>
    </motion.figure>
    <span className="portrait-caption"><span aria-hidden="true">↳</span> {t.portraitCaption}</span>
  </div>
}

function VideoPreview({ project, t, compact = false }) {
  const video = useRef(null)
  const [playing, setPlaying] = useState(false)
  const reduced = useReducedMotion()
  const tiltX = useMotionValue(0), tiltY = useMotionValue(0)
  const glowX = useMotionValue(0), glowY = useMotionValue(0)
  const rotateX = useSpring(tiltX, { stiffness: 150, damping: 22 })
  const rotateY = useSpring(tiltY, { stiffness: 150, damping: 22 })
  const spotlight = useMotionTemplate`radial-gradient(250px circle at ${glowX}px ${glowY}px, rgba(255,255,255,.22), transparent 64%)`
  const play = () => {
    video.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }
  const pause = () => {
    video.current?.pause()
    setPlaying(false)
  }
  const toggle = () => playing ? pause() : play()
  const move = event => {
    if (reduced || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = event.clientX - rect.left, py = event.clientY - rect.top
    glowX.set(px); glowY.set(py)
    tiltY.set(((px / rect.width) - .5) * 7)
    tiltX.set(-((py / rect.height) - .5) * 7)
  }
  const leave = event => {
    tiltX.set(0); tiltY.set(0)
    if (event.pointerType === 'mouse') pause()
  }
  return <div className="media-interaction" onPointerMove={move} onPointerEnter={event => { if (event.pointerType === 'mouse') play() }} onPointerLeave={leave}><motion.div className="media-tilt" style={{ rotateX, rotateY, transformPerspective: 900 }}><div className={`project-media ${compact ? 'project-media-wide' : ''}`}>
    <video ref={video} src={project.video} poster={project.poster} muted loop playsInline preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label={`${t.videoDemo} ${project.title}`}/>
    <span className="media-wash" aria-hidden="true"/>
    <motion.span className="media-spotlight" style={{ background: spotlight }} aria-hidden="true"/>
    <div className="media-top"><span>{project.number || 'LAB'}</span><span>{project.caption || project.kicker}</span></div>
    {project.href ? <a className="media-open" href={project.href} target="_blank" rel="noreferrer"><span>{t.viewProject}</span><ArrowUpRight size={16}/></a> : <span className="media-open media-open-label"><span>{t.onDisplay}</span></span>}
    <button className="media-control" onClick={toggle} aria-label={`${playing ? t.pauseDemo : t.playDemo} ${project.title}`}>{playing ? <Pause size={16} fill="currentColor"/> : <Play size={16} fill="currentColor"/>}</button>
  </div></motion.div></div>
}

function ProjectCard({ project, index, t }) {
  const [expanded, setExpanded] = useState(false)
  const reduced = useReducedMotion()
  return <Reveal className="project-item" delay={index * .07}>
    <article>
      <VideoPreview project={project} t={t}/>
      <div className="project-heading"><h3><a href={project.href} target="_blank" rel="noreferrer">{project.title}</a></h3><span className="project-number">0{index + 1}</span></div>
      <p className="project-category">{project.category}</p>
      <p className="project-description">{project.description}</p>
      <button className="details-trigger" aria-expanded={expanded} aria-controls={`project-details-${index}`} onClick={() => setExpanded(!expanded)}>{expanded ? t.lessDetails : t.projectTechnologies}<ChevronDown size={16} className={expanded ? 'rotated' : ''}/></button>
      <AnimatePresence initial={false}>{expanded && <motion.div id={`project-details-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduced ? 0 : .32, ease: easing }} className="project-details"><div className="tags">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div><a className="source-link" href={project.href} target="_blank" rel="noreferrer">{t.exploreCode} <ArrowUpRight size={15}/></a></motion.div>}</AnimatePresence>
    </article>
  </Reveal>
}

function ProjectGallery({ projects, visualLab, t }) {
  const showcase = [...projects, visualLab]
  return <div className="project-grid project-grid-four">{showcase.map((project, index) => <ProjectCard key={project.number} project={project} index={index} t={t}/>)}</div>
}

function Knowledge({ areas }) {
  const [open, setOpen] = useState(0)
  const reduced = useReducedMotion()
  return <div className="knowledge-list">{areas.map((area, index) => <div className={`knowledge-item ${open === index ? 'is-open' : ''}`} key={area.label}>
    <h3><button id={`area-trigger-${index}`} className="knowledge-trigger" onClick={() => setOpen(index)} aria-expanded={open === index} aria-controls={`area-panel-${index}`}><span className="area-number">0{index + 1}</span><span>{area.label}</span><span className="area-toggle" aria-hidden="true"><span/><span/></span></button></h3>
    <AnimatePresence initial={false}>{open === index && <motion.div id={`area-panel-${index}`} role="region" aria-labelledby={`area-trigger-${index}`} className="knowledge-panel" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduced ? 0 : .4, ease: easing }}><div className="knowledge-panel-inner"><h4><SplitRevealText text={area.title}/></h4><motion.p initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18, duration: .45 }}>{area.description}</motion.p><div className="tags">{area.topics.map((topic, topicIndex) => <motion.span initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .24 + topicIndex * .055 }} key={topic}>{topic}</motion.span>)}</div></div></motion.div>}</AnimatePresence>
  </div>)}</div>
}

function App() {
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('vm-minimal-theme') || 'light' } catch { return 'light' } })
  const [language, setLanguage] = useState(() => { try { return localStorage.getItem('vm-portfolio-language') === 'en' ? 'en' : 'pt' } catch { return 'pt' } })
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const [copyState, setCopyState] = useState('idle')
  const menuButton = useRef(null), copyTimer = useRef(null), heroRef = useRef(null)
  const reduced = useReducedMotion()
  const t = copy[language]
  const content = contentByLanguage[language]
  const { scrollYProgress } = useScroll()
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30 })
  const fieldY = useTransform(heroProgress, [0, 1], [0, 150])
  const portraitY = useTransform(heroProgress, [0, 1], [0, 90])
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#ffffff' : '#161719')
    try { localStorage.setItem('vm-minimal-theme', theme) } catch { /* Local persistence is optional. */ }
  }, [theme])
  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
    document.title = t.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.metaDescription)
    try { localStorage.setItem('vm-portfolio-language', language) } catch { /* Local persistence is optional. */ }
  }, [language, t])
  useEffect(() => {
    const sections = [...document.querySelectorAll('main > section[id]')]
    let frame = 0
    const update = () => {
      frame = 0
      const marker = window.innerHeight * .3
      const current = sections.filter(section => section.getBoundingClientRect().top <= marker).at(-1)
      setActiveSection(current?.id || 'top')
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [])
  useEffect(() => {
    const handler = event => { if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButton.current?.focus() } }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [menuOpen])
  useEffect(() => () => clearTimeout(copyTimer.current), [])
  async function copyEmail() {
    clearTimeout(copyTimer.current)
    try { await navigator.clipboard.writeText(EMAIL); setCopyState('success') } catch { setCopyState('error') }
    copyTimer.current = setTimeout(() => setCopyState('idle'), 4000)
  }
  return <MotionConfig reducedMotion="user">
    <a href="#conteudo" className="skip-link">{t.skip}</a>
    <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX: reduced ? scrollYProgress : scaleX }}/>
    <div className="page-shell">
    <header className="header"><div className="nav-wrap wrap">
      <a href="#top" className="brand" aria-label={t.home}>vm<span>.</span></a>
      <nav className="desktop-nav" aria-label={t.navigation}>{content.navigation.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}>{activeSection === id && <motion.span className="nav-active" layoutId="active-navigation" transition={{ type: 'spring', stiffness: 300, damping: 32 }}/>}<span>{label}</span></a>)}</nav>
      <div className="nav-actions"><div className="language-switch" role="group" aria-label={t.languageControl}><button type="button" lang="pt-BR" title="Português" aria-label="Português" aria-pressed={language === 'pt'} onClick={() => setLanguage('pt')}>PT</button><button type="button" lang="en" title="English" aria-label="English" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button></div><button className="icon-button" aria-label={theme === 'light' ? t.darkTheme : t.lightTheme} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? <Moon size={18}/> : <Sun size={18}/>}</button><a href="#contato" className="nav-contact">{t.contactNav} <ArrowUpRight size={16}/></a><button ref={menuButton} className="icon-button menu-button" aria-label={menuOpen ? t.closeMenu : t.openMenu} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21}/> : <Menu size={21}/>}</button></div>
    </div><AnimatePresence>{menuOpen && <motion.nav id="mobile-navigation" className="mobile-nav" aria-label={t.mobileNavigation} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .2 }}>{[...content.navigation, ['contato', t.contactNav]].map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={18}/></a>)}</motion.nav>}</AnimatePresence></header>

    <main id="conteudo">
      <section ref={heroRef} className="hero wrap" id="top" aria-labelledby="hero-title"><motion.div className="hero-field-layer" style={{ y: reduced ? 0 : fieldY }}><MagneticField/></motion.div><div className="hero-grid">
        <div className="hero-main"><Reveal><div className="eyebrow"><span className="small-line"/> {t.heroEyebrow}</div></Reveal>
          <h1 id="hero-title" aria-label={`${t.heroLine1} ${t.heroLine2} ${t.heroWords[0]}`}><SplitLine delay={.06}>{t.heroLine1}</SplitLine><SplitLine delay={.16}>{t.heroLine2} <em><TypewriterText key={language} texts={t.heroWords} speed={72} pause={1750}/></em></SplitLine></h1>
          <Reveal delay={.12}><p className="hero-description">{t.heroDescription}</p></Reveal>
          <Reveal className="hero-actions" delay={.18}><MagneticLink href="#projetos" className="button-primary">{t.heroProjects} <ArrowDown size={17}/></MagneticLink><a className="text-link" href="#sobre">{t.heroAbout} <ArrowRight size={16}/></a></Reveal>
          <Reveal className="hero-note" delay={.22}><Code2 size={15}/><span>{t.heroNote}</span></Reveal>
          <TerminalPanel key={language} t={t}/>
        </div><motion.div className="hero-portrait" style={{ y: reduced ? 0 : portraitY }}><Reveal delay={.15}><Portrait t={t}/></Reveal></motion.div>
      </div><div className="hero-bottom"><span>{t.heroBottom}</span><a href="#projetos">{t.heroExplore} <ArrowDown size={14}/></a></div></section>

      <section className="projects section wrap" id="projetos" aria-labelledby="projects-title"><Reveal className="section-heading"><div><span className="eyebrow">{t.projectsEyebrow}</span><h2 id="projects-title">{t.projectsTitle1} <em>{t.projectsTitle2}</em></h2></div><a className="text-link" href={`${GITHUB}?tab=repositories`} target="_blank" rel="noreferrer">{t.allGithub} <ArrowUpRight size={16}/></a></Reveal><ProjectGallery projects={content.projects} visualLab={content.visualLab} t={t}/></section>

      <section className="about section" id="sobre" aria-labelledby="about-title"><div className="wrap about-grid"><Reveal><span className="eyebrow">{t.aboutEyebrow}</span><h2 id="about-title">{t.aboutTitle1}<br/><em>{t.aboutTitle2}</em></h2><a className="text-link" href="https://www.linkedin.com/in/vinicius-mota-4a443a352/" target="_blank" rel="noreferrer">{t.connect} <ArrowUpRight size={16}/></a></Reveal><Reveal className="about-copy"><p className="about-lead">{t.aboutLead}</p><p>{t.aboutParagraph1}</p><p>{t.aboutParagraph2}</p><div className="education"><span>{t.educationLabel}</span><strong>{t.educationDegree}</strong><span>{t.educationStage}</span></div></Reveal></div></section>

      <section className="process section wrap" aria-labelledby="process-title"><Reveal><span className="eyebrow">{t.processEyebrow}</span><h2 id="process-title">{t.processTitle1}<br/><em>{t.processTitle2}</em></h2><p className="section-description">{t.processDescription}</p></Reveal><Reveal><ProcessStack notes={content.processNotes} t={t}/></Reveal></section>

      <section className="knowledge section wrap" id="conhecimentos" aria-labelledby="knowledge-title"><div className="knowledge-grid"><Reveal><span className="eyebrow">{t.knowledgeEyebrow}</span><h2 id="knowledge-title" aria-label={`${t.knowledgeTitle1} ${t.knowledgeTitle2}`}><WavyText text={t.knowledgeTitle1}/><br/><em><WavyText text={t.knowledgeTitle2}/></em></h2><p className="section-description">{t.knowledgeDescription1}<br/>{t.knowledgeDescription2}</p></Reveal><Reveal><Knowledge areas={content.areas}/></Reveal></div><Reveal className="stack"><span className="eyebrow">{t.toolsHeading}</span><ul className="tech-icons" aria-label={t.toolsLabel}>{skills.map((skill) => { const Icon = skillIcons[skill]; return <motion.li className="tech-icon" key={skill} tabIndex={0} aria-label={skill} data-label={skill} title={skill} whileHover={reduced ? undefined : { y: -3 }} transition={{ type: 'spring', stiffness: 360, damping: 24 }}><Icon aria-hidden="true"/></motion.li> })}</ul></Reveal></section>

      <section className="contact section" id="contato" aria-labelledby="contact-title"><div className="wrap"><Reveal><span className="eyebrow">{t.contactEyebrow}</span><h2 id="contact-title">{t.contactTitle1}<br/><em>{t.contactTitle2}</em></h2><p>{t.contactDescription1}<br/>{t.contactDescription2}</p><div className="contact-actions"><MagneticLink href={`mailto:${EMAIL}`} className="button-primary">{t.emailCta} <ArrowUpRight size={18}/></MagneticLink><a className="instagram-link" href={INSTAGRAM} target="_blank" rel="noreferrer"><Camera size={17}/> Instagram <ArrowUpRight size={15}/></a><button className="copy-button" onClick={copyEmail}>{copyState === 'success' ? <Check size={16}/> : <Copy size={16}/>}<span>{copyState === 'success' ? t.copiedEmail : t.copyEmail}</span></button></div><div className="email-caption"><a href={`mailto:${EMAIL}`}>{EMAIL}</a><span role="status" className="copy-feedback">{copyState === 'success' ? t.copied : copyState === 'error' ? t.copyError : ''}</span></div></Reveal></div></section>
    </main>
    </div>
    <footer className="footer-reveal"><div className="wrap footer-inner"><MagneticLink className="footer-cta" href={`mailto:${EMAIL}`}><span>{t.footerQuestion}</span><strong>{t.footerCta}</strong><ArrowUpRight/></MagneticLink><div className="footer-meta"><span>© 2026</span><div className="footer-links"><a href={GITHUB} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a><a href="https://www.linkedin.com/in/vinicius-mota-4a443a352/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14}/></a><a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14}/></a><a href="#top" className="back-top" aria-label={t.backTop}><ArrowUp size={17}/></a></div></div></div></footer>
  </MotionConfig>
}
export default App
