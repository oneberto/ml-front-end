# Guia de Scripts — RUN.md

Este documento explica a funcionalidade de cada script disponível no projeto. Utilize estes comandos no terminal, na raiz do projeto.

---

## Scripts Disponíveis

### `npm run dev`

- **Descrição:** Inicia o servidor de desenvolvimento do Next.js.
- **Uso:** Permite visualizar o projeto em tempo real, com recarregamento automático a cada alteração no código.
- **Acesso:** [http://localhost:3000](http://localhost:3000)

---

### `npm run build`

- **Descrição:** Gera o build de produção do projeto.
- **Uso:** Otimiza e transpila o código para ser executado em ambiente de produção.

---

### `npm start`

- **Descrição:** Inicia o servidor Next.js em modo produção.
- **Pré-requisito:** Execute `npm run build` antes.
- **Uso:** Simula o ambiente real de produção localmente.

---

### `npm run lint`

- **Descrição:** Executa o ESLint para verificar problemas de padronização e possíveis erros no código.
- **Uso:** Ajuda a manter o código limpo e consistente.

---

### `npm test`

- **Descrição:** Executa todos os testes unitários do projeto usando Jest e React Testing Library.
- **Uso:** Garante que as funcionalidades implementadas estejam corretas.

---

### `npm run test:watch`

- **Descrição:** Executa os testes em modo "watch", reexecutando automaticamente ao salvar alterações nos arquivos.
- **Uso:** Útil durante o desenvolvimento para feedback rápido sobre os testes.

---

## Observações

- Todos os scripts devem ser executados na raiz do projeto.
- Certifique-se de instalar as dependências (`npm install`) antes de rodar qualquer script.

---
