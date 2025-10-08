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

---

## 🧭 Providers e Rotas (visão geral)

A aplicação usa um **SharedModule** para encapsular providers globais:

- `I18nProvider` (react-intl + persistência em `localStorage`)
- `BrowserRouter`
- `AntThemeProvider` (tema claro/escuro + tokens AntD + styled-components)
- `QueryClientProvider` (React Query)

O **AppModule** renderiza layout (ex.: `AppHeader`) e o **AppRouter**.

---

## 🧩 Módulos & Rotas (arquitetura modular)

Cada **módulo** possui seu **próprio sistema de rotas, hooks, componentes, serviços e estilos**, mantendo o código **isolado e não intrusivo**. O acesso às rotas de cada módulo é feito pelo **sistema global de rotas** (**AppRouter/AppRoutes**).

### Como funciona
- Em `src/modules/<Modulo>/` cada módulo expõe seu **roteador local** (ex.: `routes.tsx` ou `Module.tsx`) e suas **páginas**.
- O **roteador global** registra o **prefixo** e faz o **lazy load** do módulo (code-splitting).  
  Exemplo simplificado:
  ```tsx
  // AppRouter.tsx
  <Route path="/tutorial/*" element={<LazyTutorialModule />} />
  ```
  Dentro do **TutorialModule** você controla as rotas internas:
  ```tsx
  // modules/Tutorial/routes.tsx
  <Routes>
    <Route index element={<TutorialHome />} />
    <Route path="page" element={<TutorialPage />} />
  </Routes>
  ```

### Benefícios
- **Isolamento:** cada módulo tem seu próprio diretório de `hooks/`, `components/`, `pages/`, `services/`, `styles/`, `types/` etc., evitando colisões e sobreescritas entre módulos.
- **Escalabilidade:** adicionar um módulo novo não impacta nos existentes; basta registrá-lo no **AppRouter/AppRoutes**.
- **Performance:** módulos são carregados sob demanda (**React.lazy + Suspense**).
- **Organização:** cada área de negócio mantém sua estrutura e convenções internas.

### Sugestão de estrutura por módulo
```
src/modules/<Modulo>/
├─ <Modulo>Module.tsx
├─ routes.tsx
├─ pages/
├─ components/
├─ hooks/
├─ services/
├─ styles/
├─ types/
└─ index.ts
```

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
   ├─ modules/           # features (cada módulo é isolado e tem rotas próprias)
   │  ├─ Adm/
   │  ├─ Artifacts/
   │  ├─ Recommendations/
   │  ├─ Tutorial/
   │  └─ Base/ Login/ ...
   ├─ shared/
   │  ├─ i18n/
   │  │  ├─ providers/I18nProvider/
   │  │  └─ locales/
   │  └─ utils/appLocalStorage.ts
   ├─ theme/
   │  ├─ AntThemeProvider.tsx
   │  ├─ colors.ts
   │  └─ styled.d.ts
   └─ main.tsx
```

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

#### Desenvolvido pela turma de Engenharia de Software da Universidade do Estado do Amazonas (UEA), no período 2025/2, sob orientação da Professora Áurea Hiléia da Silva Melo.
