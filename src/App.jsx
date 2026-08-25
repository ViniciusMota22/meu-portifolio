import { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Check,
  Cloud,
  Code2,
  Copy,
  Database,
  User,
  Mail,
  Menu,
  Moon,
  Sparkles,
  Sun,
  X,
} from 'lucide-react'

const knowledgeAreas = [
  {
    number: '01',
    title: 'Programação & fundamentos',
    description: 'Construindo uma base sólida em lógica, algoritmos e desenvolvimento.',
    topics: ['Python', 'C', 'C++', 'JavaScript'],
  },
  {
    number: '02',
    title: 'Inteligência Artificial',
    description: 'Estudando os fundamentos que conectam dados, modelos e aplicações inteligentes.',
    topics: ['Machine Learning', 'Ciência de Dados', 'IA & Chatbots'],
  },
  {
    number: '03',
    title: 'Dados & infraestrutura',
    description: 'Entendendo como dados são organizados, processados e disponibilizados em sistemas.',
    topics: ['Banco de Dados', 'Engenharia de Dados', 'Cloud'],
  },
  {
    number: '04',
    title: 'Web & produto',
    description: 'Usando a web para transformar conhecimento técnico em experiências e projetos reais.',
    topics: ['HTML', 'CSS', 'React', 'APIs'],
  },
]

const skills = [
  { name: 'Python', level: 'base', icon: Code2 },
  { name: 'C', level: 'base', icon: Code2 },
  { name: 'C++', level: 'base', icon: Code2 },
  { name: 'HTML', level: 'base', icon: Code2 },
  { name: 'CSS', level: 'base', icon: Code2 },
  { name: 'JavaScript', level: 'base', icon: Code2 },
  { name: 'Banco de Dados', level: 'base', icon: Database },
  { name: 'Machine Learning', level: 'estudando', icon: BrainCircuit },
  { name: 'Chatbots & IA', level: 'estudando', icon: Bot },
  { name: 'Cloud', level: 'estudando', icon: Cloud },
  { name: 'React', level: 'em aprendizado', icon: Sparkles },
  { name: 'Vue', level: 'explorando', icon: Sparkles },
]

const projects = [
  {
    number: '01',
    title: 'IRONDARK V11',
    eyebrow: 'E-commerce + IA',
    description:
      'Plataforma acadêmica de suplementos com catálogo, carrinho, checkout e chatbot integrado ao Google Gemini.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'Gemini API'],
    href: 'https://github.com/ViniciusMota22/mini-produto-suplementos',
    mark: 'ID',
  },
  {
    number: '02',
    title: 'Sistema Academia',
    eyebrow: 'Gestão web',
    description:
      'Sistema para gerenciamento de academia com dashboard, CRUD de alunos e planos, matrículas, busca e tema claro/escuro.',
    tech: ['Python', 'Flask', 'PostgreSQL', 'SQLAlchemy', 'JavaScript'],
    href: 'https://github.com/ViniciusMota22/sistema_academia',
    mark: 'GY',
  },
  {
    number: '03',
    title: 'Projeto Render',
    eyebrow: 'Backend / Deploy',
    description:
      'Projeto público com estrutura em Python, templates e camada de dados, organizado para execução e deploy em ambiente web.',
    tech: ['Python', 'Templates', 'Models', 'Render'],
    href: 'https://github.com/ViniciusMota22/projeto-render',
    mark: 'PY',
  },
]

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

function SectionHeading({ index, eyebrow, title, copy }) {
  return (
    <motion.div
      className="section-heading"
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="section-kicker"><span>{index}</span>{eyebrow}</div>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </motion.div>
  )
}

function App() {
  const [theme, setTheme] = useState('dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 26, mass: 0.25 })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const onMove = (event) => {
      document.documentElement.style.setProperty('--mx', `${event.clientX}px`)
      document.documentElement.style.setProperty('--my', `${event.clientY}px`)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const marquee = useMemo(
    () => ['INTELIGÊNCIA ARTIFICIAL', 'DESENVOLVIMENTO WEB', 'DADOS', 'AUTOMAÇÃO', 'APRENDIZADO CONTÍNUO'],
    [],
  )

  async function copyEmail() {
    await navigator.clipboard.writeText('vmota287@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <div className="pointer-glow" aria-hidden="true" />
      <div className="grid-noise" aria-hidden="true" />

      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="Início">
          <span className="brand-mark">VM</span>
          <span className="brand-text">VINICIUS MOTA</span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#sobre">Sobre</a>
          <a href="#conhecimentos">Conhecimentos</a>
          <a href="#projetos">Projetos</a>
          <a href="#contato">Contato</a>
        </nav>

        <div className="nav-actions">
          <button
            className="icon-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="icon-btn mobile-only" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <motion.div className="mobile-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          {['sobre', 'conhecimentos', 'projetos', 'contato'].map((item) => (
            <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
        </motion.div>
      )}

      <main>
        <section className="hero section" id="top">
          <div className="hero-copy">
            <motion.div className="status-pill" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
              <span className="status-dot" /> Tecnólogo em IA · 3º período
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
              }}
            >
              <motion.span variants={fade}>Código, dados</motion.span>
              <motion.span variants={fade}>e inteligência</motion.span>
              <motion.span className="accent-line" variants={fade}>em movimento.</motion.span>
            </motion.h1>

            <motion.p className="hero-lead" variants={fade} initial="hidden" animate="show" transition={{ delay: 0.5 }}>
              Sou Vinicius Mota. Estou construindo minha base em Inteligência Artificial e desenvolvimento, transformando estudo em projetos práticos e experiências digitais.
            </motion.p>

            <motion.div className="hero-cta" variants={fade} initial="hidden" animate="show" transition={{ delay: 0.62 }}>
              <a className="btn btn-primary" href="#projetos">Ver projetos <ArrowDown size={17} /></a>
              <a className="btn btn-ghost" href="https://github.com/ViniciusMota22" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={17} /></a>
            </motion.div>

            <motion.div className="hero-meta" variants={fade} initial="hidden" animate="show" transition={{ delay: 0.72 }}>
              <span>PY / C / C++</span>
              <span>HTML / CSS / JS</span>
              <span>DB / AI / CLOUD</span>
            </motion.div>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="photo-frame">
              <img src="/vinicius-mota.jfif" alt="Vinicius Mota" />
              <div className="photo-overlay" />
              <span className="photo-code">VM — 2026</span>
            </div>
            <motion.div className="float-card float-a" animate={{ y: [0, -9, 0] }} transition={{ duration: 4.8, repeat: Infinity }}>
              <BrainCircuit size={18} /><span>IA</span>
            </motion.div>
            <motion.div className="float-card float-b" animate={{ y: [0, 10, 0] }} transition={{ duration: 5.3, repeat: Infinity }}>
              <Code2 size={18} /><span>DEV</span>
            </motion.div>
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
          </motion.div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...marquee, ...marquee].map((item, i) => <span key={`${item}-${i}`}>{item}<b>✦</b></span>)}
          </div>
        </div>

        <section className="section about" id="sobre">
          <SectionHeading
            index="01"
            eyebrow="Sobre"
            title="Aprendendo por construção."
            copy="Minha formação está focada em Inteligência Artificial, mas eu gosto de entender o caminho completo: lógica, programação, dados, web, cloud e como tudo isso se conecta em um produto real."
          />

          <div className="about-grid">
            <motion.article className="statement-card" variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <span className="mono-label">FORMAÇÃO ATUAL</span>
              <strong>Tecnologia em Inteligência Artificial</strong>
              <p>3º período · formação em andamento</p>
            </motion.article>
            <motion.article className="statement-card" variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.08 }}>
              <span className="mono-label">FOCO</span>
              <strong>IA aplicada + desenvolvimento</strong>
              <p>Projetos acadêmicos e evolução constante da base técnica.</p>
            </motion.article>
            <motion.article className="statement-card wide" variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.12 }}>
              <span className="mono-label">STACK EM CONSTRUÇÃO</span>
              <div className="skill-cloud">
                {skills.map(({ name, level, icon: Icon }) => (
                  <span className="skill-chip" key={name}><Icon size={14} />{name}<small>{level}</small></span>
                ))}
              </div>
            </motion.article>
          </div>
        </section>

        <section className="section knowledge" id="conhecimentos">
          <SectionHeading
            index="02"
            eyebrow="Conhecimentos"
            title="Áreas que estou aprofundando."
            copy="Em vez de listar cada disciplina da graduação, organizei aqui os conhecimentos que realmente estão formando minha base técnica hoje."
          />

          <div className="knowledge-list">
            {knowledgeAreas.map((area, index) => (
              <motion.article
                key={area.number}
                className="knowledge-row"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-35px' }}
                transition={{ duration: 0.48, delay: index * 0.05 }}
              >
                <span className="knowledge-index">{area.number}</span>
                <div className="knowledge-copy">
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </div>
                <div className="knowledge-topics">
                  {area.topics.map((topic) => <span key={topic}>{topic}</span>)}
                </div>
              </motion.article>
            ))}
          </div>

          <div className="academic-note">
            <span className="mono-label">FORMAÇÃO EM ANDAMENTO</span>
            <p>Também fazem parte da graduação Matemática e Estatística para IA, Metodologias Ágeis e Empreendedorismo.</p>
          </div>
        </section>

        <section className="section projects" id="projetos">
          <SectionHeading
            index="03"
            eyebrow="Projetos"
            title="Do estudo para algo que funciona."
            copy="Alguns projetos públicos que mostram minha evolução em web, backend, banco de dados e integração com IA."
          />

          <div className="projects-list">
            {projects.map((project) => (
              <motion.a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="project-card"
                key={project.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                whileHover="hover"
              >
                <div className="project-index">{project.number}</div>
                <div className="project-mark">{project.mark}</div>
                <div className="project-main">
                  <span className="mono-label">{project.eyebrow}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tech-row">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
                </div>
                <motion.div className="project-arrow" variants={{ hover: { x: 5, y: -5 } }}><ArrowUpRight /></motion.div>
              </motion.a>
            ))}
          </div>

          <a className="text-link" href="https://github.com/ViniciusMota22?tab=repositories" target="_blank" rel="noreferrer">
            Ver todos os repositórios <ArrowUpRight size={16} />
          </a>
        </section>

        <section className="section contact" id="contato">
          <motion.div className="contact-panel" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="contact-copy">
              <span className="section-kicker"><span>04</span>Contato</span>
              <h2>Vamos transformar uma ideia em projeto.</h2>
              <p>Quer conversar sobre tecnologia, projeto acadêmico, desenvolvimento ou uma oportunidade de aprendizado?</p>
            </div>

            <div className="contact-actions">
              <a className="contact-link" href="mailto:vmota287@gmail.com"><Mail size={18} /><span><small>E-mail</small>vmota287@gmail.com</span><ArrowUpRight size={18} /></a>
              <a className="contact-link" href="https://github.com/ViniciusMota22" target="_blank" rel="noreferrer"><Code2 size={18} /><span><small>GitHub</small>@ViniciusMota22</span><ArrowUpRight size={18} /></a>
              <a className="contact-link" href="https://www.linkedin.com/in/vinicius-mota-4a443a352/" target="_blank" rel="noreferrer"><User size={18} /><span><small>LinkedIn</small>Vinicius Mota</span><ArrowUpRight size={18} /></a>
              <button className="contact-link copy-link" onClick={copyEmail}>
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <span><small>Atalho</small>{copied ? 'E-mail copiado!' : 'Copiar e-mail'}</span>
                <span className="shortcut">CTRL+C</span>
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      <footer>
        <span>© 2026 Vinicius Mota</span>
        <span>React + JavaScript + Motion</span>
        <a href="#top">Voltar ao topo ↑</a>
      </footer>
    </div>
  )
}

export default App
