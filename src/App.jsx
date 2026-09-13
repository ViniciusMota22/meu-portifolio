import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, MotionConfig, useMotionValue, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Check, ChevronDown, Code2, Copy, Menu, Moon, Sun, X } from 'lucide-react'
import { EMAIL, GITHUB, navigation, projects, areas, skills } from './content.jsx'

const easing = [.22, 1, .36, 1]

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

function Portrait() {
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
      <figcaption><span>Vinicius Mota</span><span>IA & desenvolvimento</span></figcaption>
    </motion.figure>
    <span className="portrait-caption"><span aria-hidden="true">↳</span> Aprendendo. Experimentando. Criando.</span>
  </div>
}

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false)
  const reduced = useReducedMotion()
  return <Reveal className="project-item" delay={index * .07}>
    <article>
      <a className={`project-cover cover-${project.style}`} href={project.href} target="_blank" rel="noreferrer" aria-label={`Ver ${project.title} no GitHub`}>
        <span className="cover-index">0{index + 1} /</span>
        <span className="cover-mark" aria-hidden="true">{index === 0 ? <>iron<span>dark</span><small>V11</small></> : index === 1 ? <>gym<span className="gym-dot">.</span></> : <><span className="code-bracket">(</span>py<span className="code-bracket">)</span></>}</span>
        <span className="cover-bottom"><span>{['Comércio + IA', 'Gestão + dados', 'Python + deploy'][index]}</span><span className="cover-action"><ArrowUpRight size={19}/></span></span>
        <span className="cover-shine" aria-hidden="true"/>
      </a>
      <div className="project-heading"><h3><a href={project.href} target="_blank" rel="noreferrer">{project.title}</a></h3><span className="project-number">0{index + 1}</span></div>
      <p className="project-category">{project.category}</p>
      <p className="project-description">{project.description}</p>
      <button className="details-trigger" aria-expanded={expanded} aria-controls={`project-details-${index}`} onClick={() => setExpanded(!expanded)}>{expanded ? 'Menos detalhes' : 'Tecnologias do projeto'}<ChevronDown size={16} className={expanded ? 'rotated' : ''}/></button>
      <AnimatePresence initial={false}>{expanded && <motion.div id={`project-details-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduced ? 0 : .32, ease: easing }} className="project-details"><div className="tags">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div><a className="source-link" href={project.href} target="_blank" rel="noreferrer">Explorar o código <ArrowUpRight size={15}/></a></motion.div>}</AnimatePresence>
    </article>
  </Reveal>
}

function Knowledge() {
  const [open, setOpen] = useState(0)
  const reduced = useReducedMotion()
  return <div className="knowledge-list">{areas.map((area, index) => <div className={`knowledge-item ${open === index ? 'is-open' : ''}`} key={area.label}>
    <h3><button id={`area-trigger-${index}`} className="knowledge-trigger" onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index} aria-controls={`area-panel-${index}`}><span className="area-number">0{index + 1}</span><span>{area.label}</span><span className="area-toggle" aria-hidden="true"><span/><span/></span></button></h3>
    <AnimatePresence initial={false}>{open === index && <motion.div id={`area-panel-${index}`} role="region" aria-labelledby={`area-trigger-${index}`} className="knowledge-panel" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduced ? 0 : .4, ease: easing }}><div className="knowledge-panel-inner"><p>{area.description}</p><div className="tags">{area.topics.map(topic => <span key={topic}>{topic}</span>)}</div></div></motion.div>}</AnimatePresence>
  </div>)}</div>
}

function App() {
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('vm-minimal-theme') || 'light' } catch { return 'light' } })
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const [copyState, setCopyState] = useState('idle')
  const menuButton = useRef(null), copyTimer = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30 })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#ffffff' : '#161719')
    try { localStorage.setItem('vm-minimal-theme', theme) } catch { /* Local persistence is optional. */ }
  }, [theme])
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
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX: reduced ? scrollYProgress : scaleX }}/>
    <header className="header"><div className="nav-wrap wrap">
      <a href="#top" className="brand" aria-label="Vinicius Mota — início">vm<span>.</span></a>
      <nav className="desktop-nav" aria-label="Navegação principal">{navigation.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}>{activeSection === id && <motion.span className="nav-active" layoutId="active-navigation" transition={{ type: 'spring', stiffness: 300, damping: 32 }}/>}<span>{label}</span></a>)}</nav>
      <div className="nav-actions"><button className="icon-button" aria-label={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? <Moon size={18}/> : <Sun size={18}/>}</button><a href="#contato" className="nav-contact">Contato <ArrowUpRight size={16}/></a><button ref={menuButton} className="icon-button menu-button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21}/> : <Menu size={21}/>}</button></div>
    </div><AnimatePresence>{menuOpen && <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Navegação móvel" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .2 }}>{[...navigation, ['contato', 'Contato']].map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={18}/></a>)}</motion.nav>}</AnimatePresence></header>

    <main id="conteudo">
      <section className="hero wrap" id="top" aria-labelledby="hero-title"><div className="hero-grid">
        <div className="hero-main"><Reveal><div className="eyebrow"><span className="small-line"/> Vinicius Mota · IA & desenvolvimento</div></Reveal>
          <Reveal delay={.06}><h1 id="hero-title">Curiosidade que<br/>vira <em>experiência.</em></h1></Reveal>
          <Reveal delay={.12}><p className="hero-description">Exploro código, dados e inteligência artificial para transformar o que aprendo em algo que você pode usar.</p></Reveal>
          <Reveal className="hero-actions" delay={.18}><MagneticLink href="#projetos" className="button-primary">Conheça meus projetos <ArrowDown size={17}/></MagneticLink><a className="text-link" href="#sobre">Um pouco sobre mim <ArrowRight size={16}/></a></Reveal>
          <Reveal className="hero-note" delay={.22}><Code2 size={15}/><span>Tecnologia em Inteligência Artificial · 3º período</span></Reveal>
        </div><Reveal className="hero-portrait" delay={.15}><Portrait/></Reveal>
      </div><div className="hero-bottom"><span>Uma ideia de cada vez.</span><a href="#projetos">Explore <ArrowDown size={14}/></a></div></section>

      <section className="projects section wrap" id="projetos" aria-labelledby="projects-title"><Reveal className="section-heading"><div><span className="eyebrow">01 — Projetos selecionados</span><h2 id="projects-title">Aprender. Fazer. <em>Evoluir.</em></h2></div><a className="text-link" href={`${GITHUB}?tab=repositories`} target="_blank" rel="noreferrer">Todos no GitHub <ArrowUpRight size={16}/></a></Reveal><div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.number} project={project} index={index}/>)}</div></section>

      <section className="about section" id="sobre" aria-labelledby="about-title"><div className="wrap about-grid"><Reveal><span className="eyebrow">02 — Sobre mim</span><h2 id="about-title">Gosto de entender.<br/><em>Mais ainda de criar.</em></h2><a className="text-link" href="https://www.linkedin.com/in/vinicius-mota-4a443a352/" target="_blank" rel="noreferrer">Vamos nos conectar <ArrowUpRight size={16}/></a></Reveal><Reveal className="about-copy"><p className="about-lead">O melhor jeito de aprender, para mim, é construir.</p><p>Sou estudante de Tecnologia em Inteligência Artificial, no 3º período. Minha curiosidade passa por todo o caminho: da lógica à interface, dos dados à experiência.</p><p>Estou desenvolvendo minha base técnica com projetos acadêmicos e aplicações práticas de IA. Gosto de entender o porquê de cada escolha — e o que acontece quando as ideias saem do papel.</p><div className="education"><span>Formação em andamento</span><strong>Tecnologia em Inteligência Artificial</strong><span>3º período · IA aplicada + desenvolvimento</span></div></Reveal></div></section>

      <section className="knowledge section wrap" id="conhecimentos" aria-labelledby="knowledge-title"><div className="knowledge-grid"><Reveal><span className="eyebrow">03 — Conhecimentos</span><h2 id="knowledge-title">Conectando<br/><em>os pontos.</em></h2><p className="section-description">Uma base que cresce com cada projeto.<br/>Explore minhas áreas de estudo.</p></Reveal><Reveal><Knowledge/></Reveal></div><Reveal className="stack"><span className="eyebrow">Ferramentas em construção</span><div className="stack-list">{skills.map(([skill, level]) => <span className="stack-item" key={skill}>{skill}<small>{level}</small></span>)}</div><p className="academic-note">Na graduação: Matemática e Estatística para IA, Metodologias Ágeis e Empreendedorismo.</p></Reveal></section>

      <section className="contact section" id="contato" aria-labelledby="contact-title"><div className="wrap"><Reveal><span className="eyebrow">04 — Vamos conversar</span><h2 id="contact-title">Algo em mente?<br/><em>Vamos dar o primeiro passo.</em></h2><p>Projetos, tecnologia ou uma oportunidade de aprendizado.<br/>Estou por aqui.</p><div className="contact-actions"><MagneticLink href={`mailto:${EMAIL}`} className="button-primary">Me mande um oi <ArrowUpRight size={18}/></MagneticLink><button className="copy-button" onClick={copyEmail}>{copyState === 'success' ? <Check size={16}/> : <Copy size={16}/>}<span>{copyState === 'success' ? 'E-mail copiado' : 'Copiar e-mail'}</span></button></div><div className="email-caption"><a href={`mailto:${EMAIL}`}>{EMAIL}</a><span role="status" className="copy-feedback">{copyState === 'success' ? 'Copiado!' : copyState === 'error' ? 'Selecione o endereço acima para copiar.' : ''}</span></div></Reveal></div></section>
    </main>
    <footer className="footer wrap"><a className="brand" href="#top" aria-label="Voltar ao início">vm<span>.</span></a><span>© 2026 Vinicius Mota</span><div className="footer-links"><a href={GITHUB} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a><a href="https://www.linkedin.com/in/vinicius-mota-4a443a352/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14}/></a><a href="#top" className="back-top" aria-label="Voltar ao topo"><ArrowUp size={17}/></a></div></footer>
  </MotionConfig>
}
export default App
