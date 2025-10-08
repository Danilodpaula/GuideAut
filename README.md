# GuideAut

Repositório **frontend** do **GUIDEAUT**, um suporte tecnológico ao **ProAut** — processo para apoiar o desenvolvimento de interfaces de aplicativos para pessoas autistas.

---

## 🚀 Stack

- **React 19**, **TypeScript 5.9**, **Vite 7**
- **Ant Design 5** (tema com tokens + dark/light)
- **styled-components 6**
- **React Router 7**
- **React Query (@tanstack/react-query)**
- **i18n** via `react-intl` (Provider customizado)
- **ESLint 9 (Flat Config)** + `simple-import-sort`, `react`, `react-hooks`, `i18next`

---

## 📦 Requisitos

- **Node.js** ≥ 18 (recomendado **LTS 20**)
- **Yarn 1.x (classic)**

---

## ⬇️ Clonar e instalar

```bash
git clone <URL_DO_REPOSITORIO>.git
cd GuideAut/frontend

yarn
```

> **Fonte (Montserrat):** carregada via `<link>` no `index.html`.

---

## ▶️ Rodar em desenvolvimento

```bash
yarn dev
```

Acesse: **http://localhost:5173/**

---

## 🏗️ Build de produção

```bash
yarn build
```

Pré-visualização do build:

```bash
yarn preview
```

---

## 🧭 Providers e Rotas

A aplicação usa um **SharedModule** para encapsular providers globais:

- `I18nProvider` (react-intl + persistência em `localStorage`)
- `BrowserRouter`
- `AntThemeProvider` (tema claro/escuro + tokens AntD + styled-components)
- `QueryClientProvider` (React Query)

O **AppModule** renderiza layout (ex.: `AppHeader`) e o **AppRouter**.

---

## 🌙/☀️ Tema

- Alternância **light/dark** via `AntThemeProvider`
- Tokens + algoritmos do AntD (`defaultAlgorithm`/`darkAlgorithm`)
- Persistência em `localStorage`:
  - `APP:THEME` → `"light" | "dark"`

---

## 🇧🇷/🇺🇸 Idioma

- Alternância **PT-BR / EN-US** via `I18nProvider` (react-intl)
- Mensagens em `src/shared/i18n/locales/`
- Persistência em `localStorage`:
  - `APP:LOCALE` → `"pt-BR" | "en-US"`

---

## 🧹 Lint

Rodar linter:

```bash
yarn lint
```

Autofix:

```bash
yarn lint --fix
```

Caso o ESLint acuse falta de plugins, instale:

```bash
yarn add -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-simple-import-sort eslint-plugin-i18next @typescript-eslint/parser
```

---

## 🗂️ Estrutura (resumo)

```
frontend/
├─ index.html
├─ vite.config.ts
├─ eslint.config.js
├─ tsconfig*.json
└─ src/
   ├─ app/
   │  ├─ components/AppHeader/
   │  ├─ router/AppRouter.tsx
   │  ├─ styles/
   │  └─ index.tsx (ou main.tsx conforme entry)
   ├─ modules/           # features
   ├─ shared/
   │  ├─ i18n/
   │  │  ├─ providers/I18nProvider/
   │  │  └─ locales/
   │  └─ utils/appLocalStorage.ts
   ├─ theme/
   │  ├─ AntThemeProvider.tsx
   │  ├─ colors.ts
   │  └─ styled.d.ts
   └─ main.tsx           # entry usado pelo Vite
```

---

## 🐞 Troubleshooting

### 1) Vite procurando `/src/main.tsx`
**Erro:** `Failed to load url /src/main.tsx`  
**Solução:** garantir que o `index.html` aponte para o entry correto:
```html
<script type="module" src="/src/main.tsx"></script>
```
ou ajuste para `index.tsx` se esse for o seu entry real.

### 2) ESLint “extends” no Flat Config
**Erro:** “A config object is using the extends key…”  
**Solução:** usar **`eslint.config.js`** no formato **Flat Config** (já incluso no repo).

### 3) `i18next/no-literal-string`
Use traduções (`translate({ id: 'chave' })`) em JSX.  
Para exceções pontuais:
```tsx
{/* eslint-disable-next-line i18next/no-literal-string */}
<Titulo>GuideAut</Titulo>
```

### 4) Hooks `exhaustive-deps`
Adicione dependências pedidas pelo ESLint ou justifique conscientemente.

---

## 🔧 Scripts (package.json)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

---

## 📜 Licença

Defina a licença do projeto aqui (ex.: MIT).
