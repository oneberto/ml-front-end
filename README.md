# Mercado Livre Front-end Clone

Este projeto é um clone da página de detalhes de produto do Mercado Livre.

## 📚 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Stack Utilizada](#stack-utilizada)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Testes](#testes)
- [Configurações e Convenções](#configurações-e-convenções)
- [Licença](#licença)

---

## Sobre o Projeto

Este repositório implementa uma interface de detalhes de produto inspirada na [página do iPhone 17 no Mercado Livre](https://www.mercadolivre.com.br/iphone-17-de-256gb-lavanda-distribuidor-autorizado/p/MLB1055308835). O objetivo é demonstrar habilidades com React, Next.js, TypeScript, Tailwind CSS e testes automatizados.

---

## Stack Utilizada

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [ESLint](https://eslint.org/)

---

## Como Rodar o Projeto

Mais informações no arquivo [RUN.md](RUN.md)

1. **Instale as dependências:**

   ```sh
   npm install
   ```

2. **Inicie o servidor de desenvolvimento:**

   ```sh
   npm run dev
   ```

---

## Scripts Disponíveis

- `npm run dev`: Inicie o servidor de desenvolvimento.
- `npm run dev`: Inicie o servidor de produção.
- `npm run build`: Construa o projeto para produção.
- `npm run test`: Execute os testes automatizados.

---

## Estrutura de Pastas

- `src`: Pasta principal do projeto.
  - `app`: Rotas do App Router.
  - `components`: Componentes reutilizáveis.
  - `lib`: Bibliotecas e funções úteis.
  - `styles`: Estilos e temas.

---

## Testes

Os testes automatizados são executados com Jest e React Testing Library.

---

## Configurações e Convenções

- A estrutura de pastas é baseada no padrão de arquitetura de projetos React.
- O projeto utiliza o App Router do Next.js.
- As rotas são definidas no App Router.
- Os componentes são reutilizáveis.
- Os testes são executados com Jest e React Testing Library.
- Componentes específicos para rotas (que não serão utilizados em outros lugares) devem ficar dentro de uma pasta chamada `components` na pasta da rota
