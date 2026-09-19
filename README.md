# Vinicius Mota

Portfólio em React, Vite e Motion. Inclui apresentação pessoal, projetos, formação, conhecimentos e contatos.

## Executar

Requer Node.js compatível com Vite 8 (20.19+ ou 22.12+).

```sh
npm ci
npm run dev
```

## Publicar

```sh
npm run build
```

A pasta `dist` contém o site pronto para hospedagem estática. Pode ser usada na Vercel, Netlify ou outro serviço compatível. Não abra `index.html` diretamente pelo sistema de arquivos; use um servidor local ou hospedagem.

## Personalizar

- `src/App.jsx`: página, componentes e interações.
- `src/content.jsx`: projetos, tecnologias, conhecimentos e contatos.
- `src/styles.css`: cores, fontes, composição e regras para celular.
- `public/vinicius-mota.jfif`: retrato original.
- `public/favicon.svg`: ícone do site.

Tipografia: Manrope e Instrument Serif, carregadas pelo Google Fonts. O carregamento dessas fontes requer internet; fontes alternativas estão definidas.

O tema é salvo apenas no navegador. Animações respeitam a preferência de movimento reduzido. Links de projetos abrem os repositórios originais. O contato usa e-mail, GitHub e LinkedIn, sem envio de formulários ou backend.

Direção visual inspirada nas referências fornecidas: Dribbble, SaaS Landing Page e Motion. Conteúdo pessoal, retrato e projetos preservados do material original.

Interações: navegação com seção ativa, detalhes expansíveis dos projetos, painéis de conhecimentos, botões com resposta suave ao mouse, retrato com perspectiva sutil, transições de entrada e cópia de e-mail. Tema claro por padrão, com alternativa escura e preferência salva no navegador.
