import { navigation, projects, visualLab, areas, processNotes } from './content.jsx'

const englishProjects = [
  { category: 'E-commerce + artificial intelligence', description: 'A supplements store that brings together its catalog, checkout, and AI-powered support in a responsive experience.', caption: 'E-commerce / Gemini API' },
  { category: 'Management + database', description: 'A full-stack system for dashboards, members, plans, and enrollments, with search and CRUD operations.', caption: 'Management / Full stack' },
  { category: 'Data + web application', description: 'A Python application for exploring employees, departments, and reports in a straightforward way.', caption: 'Python / Web deployment' },
]

const englishAreas = [
  { title: 'Logic turned into code.', label: 'Programming & fundamentals', description: 'Building a strong foundation in logic, algorithms, and development.', topics: ['Python', 'C', 'C++', 'JavaScript'] },
  { title: 'Making sense of data.', label: 'Artificial Intelligence', description: 'Exploring the connections between data, models, and intelligent applications.', topics: ['Machine Learning', 'Data Science', 'AI & Chatbots'] },
  { title: 'Behind it all.', label: 'Data & infrastructure', description: 'How data is organized, processed, and made available across systems.', topics: ['Databases', 'Data Engineering', 'Cloud'] },
  { title: 'Ideas you can use.', label: 'Web & product', description: 'Turning technical knowledge into real experiences and projects.', topics: ['HTML', 'CSS', 'React', 'APIs'] },
]

const englishNotes = [
  { title: 'Start with the question.', text: 'Before the interface, I look for the problem and the clearest path to a solution.' },
  { title: 'Learn by building.', text: 'Each project becomes a lab for connecting logic, data, product, and experience.' },
  { title: 'Refine until it feels clear.', text: 'Code and design evolve through small iterations until the solution feels natural to use.' },
]

export const contentByLanguage = {
  pt: { navigation, projects, visualLab, areas, processNotes },
  en: {
    navigation: [['projetos', 'Projects'], ['sobre', 'About'], ['conhecimentos', 'Skills']],
    projects: projects.map((project, index) => ({ ...project, ...englishProjects[index] })),
    visualLab: { ...visualLab, category: 'Catalog + digital estimates', kicker: 'Vue / 3D catalog', caption: 'Vue / 3D catalog', description: 'A responsive catalog with 24 products, search, filters, galleries, and WhatsApp estimates for 3D-printed parts.' },
    areas: areas.map((area, index) => ({ ...area, ...englishAreas[index] })),
    processNotes: processNotes.map((note, index) => ({ ...note, ...englishNotes[index] })),
  },
}

export const copy = {
  pt: {
    title: 'Vinicius Mota — IA & Desenvolvimento',
    metaDescription: 'Portfólio de Vinicius Mota — estudante de Tecnologia em Inteligência Artificial, desenvolvimento web, dados e automação.',
    skip: 'Pular para o conteúdo', home: 'Vinicius Mota — início', navigation: 'Navegação principal', mobileNavigation: 'Navegação móvel', languageControl: 'Idioma do site',
    darkTheme: 'Ativar tema escuro', lightTheme: 'Ativar tema claro', contactNav: 'Contato', openMenu: 'Abrir menu', closeMenu: 'Fechar menu',
    heroEyebrow: 'Vinicius Mota · IA & desenvolvimento', heroLine1: 'Curiosidade que', heroLine2: 'vira', heroWords: ['experiência.', 'produto.', 'código.', 'solução.'],
    heroDescription: 'Exploro código, dados e inteligência artificial para transformar o que aprendo em algo que você pode usar.',
    heroProjects: 'Conheça meus projetos', heroAbout: 'Um pouco sobre mim', heroNote: 'Tecnologia em Inteligência Artificial · 3º período',
    portraitRole: 'IA & desenvolvimento', portraitCaption: 'Aprendendo. Experimentando. Criando.', heroBottom: 'Uma ideia de cada vez.', heroExplore: 'Explore',
    terminalAnswer: 'estudante de IA + desenvolvedor', terminalFocus: 'foco --agora', terminalLabel: 'Explorar o terminal',
    terminalCommands: { projects: 'projetos', stack: 'stack', contact: 'contato' },
    terminalResponses: { projects: '04 projetos publicados · do Python ao Vue', stack: 'python · javascript · c · c++ · html · css', contact: 'vmota287@gmail.com · @yxcosta_o' },
    terminalWords: ['web · dados · experiências úteis', 'interfaces que explicam o produto', 'código que vira experiência', 'IA aplicada a problemas reais'],
    projectsEyebrow: '01 — Projetos selecionados', projectsTitle1: 'O código em', projectsTitle2: 'movimento.', allGithub: 'Todos no GitHub',
    videoDemo: 'Demonstração do projeto', viewProject: 'Ver projeto', onDisplay: 'Em exibição', pauseDemo: 'Pausar demonstração de', playDemo: 'Reproduzir demonstração de',
    lessDetails: 'Menos detalhes', projectTechnologies: 'Tecnologias do projeto', exploreCode: 'Explorar o código',
    aboutEyebrow: '02 — Sobre mim', aboutTitle1: 'Gosto de entender.', aboutTitle2: 'Mais ainda de criar.', connect: 'Vamos nos conectar',
    aboutLead: 'O melhor jeito de aprender, para mim, é construir.',
    aboutParagraph1: 'Sou estudante de Tecnologia em Inteligência Artificial, no 3º período. Minha curiosidade passa por todo o caminho: da lógica à interface, dos dados à experiência.',
    aboutParagraph2: 'Estou desenvolvendo minha base técnica com projetos acadêmicos e aplicações práticas de IA. Gosto de entender o porquê de cada escolha — e o que acontece quando as ideias saem do papel.',
    educationLabel: 'Formação em andamento', educationDegree: 'Tecnologia em Inteligência Artificial', educationStage: '3º período · IA aplicada + desenvolvimento',
    processEyebrow: 'Processo em movimento', processTitle1: 'Ideias que se', processTitle2: 'empilham e evoluem.', processDescription: 'Uma pilha interativa sobre como transformo curiosidade em projeto.',
    processCardAction: 'arraste ou clique para mostrar o próximo cartão', processHint: 'Arraste para o lado ou clique', currentCard: 'Cartão atual:', chooseProcess: 'Escolher etapa do processo', showStep: 'Mostrar etapa',
    knowledgeEyebrow: '03 — Conhecimentos', knowledgeTitle1: 'Conectando', knowledgeTitle2: 'os pontos.', knowledgeDescription1: 'Uma base que cresce com cada projeto.', knowledgeDescription2: 'Explore minhas áreas de estudo.',
    toolsHeading: 'Ferramentas em construção', toolsLabel: 'Tecnologias e ferramentas',
    contactEyebrow: '04 — Vamos conversar', contactTitle1: 'Algo em mente?', contactTitle2: 'Vamos dar o primeiro passo.', contactDescription1: 'Projetos, tecnologia ou uma oportunidade de aprendizado.', contactDescription2: 'Estou por aqui.',
    emailCta: 'Me mande um oi', copiedEmail: 'E-mail copiado', copyEmail: 'Copiar e-mail', copied: 'Copiado!', copyError: 'Selecione o endereço acima para copiar.',
    footerQuestion: 'Tem uma ideia?', footerCta: 'Vamos conversar.', backTop: 'Voltar ao topo',
  },
  en: {
    title: 'Vinicius Mota — AI & Development',
    metaDescription: 'Vinicius Mota’s portfolio — AI technology student exploring web development, data, and automation.',
    skip: 'Skip to content', home: 'Vinicius Mota — home', navigation: 'Main navigation', mobileNavigation: 'Mobile navigation', languageControl: 'Site language',
    darkTheme: 'Switch to dark theme', lightTheme: 'Switch to light theme', contactNav: 'Contact', openMenu: 'Open menu', closeMenu: 'Close menu',
    heroEyebrow: 'Vinicius Mota · AI & development', heroLine1: 'Curiosity turns', heroLine2: 'into', heroWords: ['experience.', 'products.', 'code.', 'solutions.'],
    heroDescription: 'I explore code, data, and artificial intelligence to turn what I learn into something you can use.',
    heroProjects: 'Explore my projects', heroAbout: 'A little about me', heroNote: 'Artificial Intelligence Technology · 3rd semester',
    portraitRole: 'AI & development', portraitCaption: 'Learning. Experimenting. Building.', heroBottom: 'One idea at a time.', heroExplore: 'Explore',
    terminalAnswer: 'AI student + developer', terminalFocus: 'focus --now', terminalLabel: 'Explore the terminal',
    terminalCommands: { projects: 'projects', stack: 'stack', contact: 'contact' },
    terminalResponses: { projects: '04 published projects · from Python to Vue', stack: 'python · javascript · c · c++ · html · css', contact: 'vmota287@gmail.com · @yxcosta_o' },
    terminalWords: ['web · data · useful experiences', 'interfaces that explain the product', 'code that becomes experience', 'AI applied to real problems'],
    projectsEyebrow: '01 — Selected projects', projectsTitle1: 'Code in', projectsTitle2: 'motion.', allGithub: 'All on GitHub',
    videoDemo: 'Project demo:', viewProject: 'View project', onDisplay: 'On display', pauseDemo: 'Pause demo:', playDemo: 'Play demo:',
    lessDetails: 'Fewer details', projectTechnologies: 'Project technologies', exploreCode: 'Explore the code',
    aboutEyebrow: '02 — About me', aboutTitle1: 'I love to understand.', aboutTitle2: 'And even more to create.', connect: 'Let’s connect',
    aboutLead: 'The best way to learn, for me, is to build.',
    aboutParagraph1: 'I’m in the third semester of an Artificial Intelligence Technology degree. My curiosity follows the whole journey: from logic to interface, from data to experience.',
    aboutParagraph2: 'I’m building my technical foundation through academic projects and practical AI applications. I like to understand why each choice matters — and what happens when ideas become real.',
    educationLabel: 'Education in progress', educationDegree: 'Artificial Intelligence Technology', educationStage: '3rd semester · applied AI + development',
    processEyebrow: 'Process in motion', processTitle1: 'Ideas that', processTitle2: 'stack and evolve.', processDescription: 'An interactive stack showing how I turn curiosity into projects.',
    processCardAction: 'drag or click to show the next card', processHint: 'Drag sideways or click', currentCard: 'Current card:', chooseProcess: 'Choose a process step', showStep: 'Show step',
    knowledgeEyebrow: '03 — Skills', knowledgeTitle1: 'Connecting', knowledgeTitle2: 'the dots.', knowledgeDescription1: 'A foundation that grows with every project.', knowledgeDescription2: 'Explore what I’m learning.',
    toolsHeading: 'Tools I’m exploring', toolsLabel: 'Technologies and tools',
    contactEyebrow: '04 — Let’s talk', contactTitle1: 'Have something in mind?', contactTitle2: 'Let’s take the first step.', contactDescription1: 'Projects, technology, or an opportunity to learn.', contactDescription2: 'I’m here.',
    emailCta: 'Say hello', copiedEmail: 'Email copied', copyEmail: 'Copy email', copied: 'Copied!', copyError: 'Select the email address above to copy it.',
    footerQuestion: 'Have an idea?', footerCta: 'Let’s talk.', backTop: 'Back to top',
  },
}
