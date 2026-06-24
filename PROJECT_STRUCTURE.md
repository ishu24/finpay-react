# React + Redux + React Testing Library (TypeScript) — Project Structure

This document describes a recommended folder structure and file layout for a React app using TypeScript, Redux (Redux Toolkit), and React Testing Library. It includes routes, styles, tests, and a main entry file.

Overview

- Tech stack: React (TypeScript), Redux Toolkit, React Router v6, React Testing Library + Jest
- Goals: clear separation of pages (routes), components, styles, tests and app state

Folder tree (recommended)

```
finpay-react/
├─ node_modules/
├─ public/
│  ├─ index.html            # HTML entry file required by Create React App and other build tools
│  └─ assets/               # static assets copied to the build output (images, icons)
├─ src/
│  ├─ api/                   # API client and route modules
│  │  ├─ index.ts            # configured HTTP client (axios/fetch wrapper)
│  │  ├─ routes/             # organized API route modules
│  │  │  ├─ auth.ts          # auth related API calls (login, refresh)
│  │  │  ├─ accounts.ts      # accounts endpoints
│  │  │  └─ transactions.ts  # transactions endpoints
│  │  └─ types.ts            # API response/request types
│  ├─ assets/                # images, icons, fonts (static assets used by the app)
│  ├─ components/            # reusable UI components (organize by domain or atomic)
│  │  ├─ common/             # shared components used across the app
│  │  │  ├─ Header/          # each component gets its own folder
│  │  │  │  ├─ Header.tsx    # main header component (TSX)
│  │  │  │  ├─ config/       # component-specific config or constants
│  │  │  │  │  └─ index.ts
│  │  │  │  ├─ styles/       # component-specific styles (CSS / module / scss)
│  │  │  │  │  └─ styles.module.css
│  │  │  │  ├─ tests/        # component tests
│  │  │  │  │  ├─ Header.test.tsx
│  │  │  │  │  └─ __snapshots__/Header.test.tsx.snap
│  │  │  │  └─ index.ts      # export file
│  │  │  ├─ Footer/
│  │  │  │  ├─ Footer.tsx
│  │  │  │  ├─ styles/
│  │  │  │  │  └─ styles.module.css
│  │  │  │  ├─ config/
│  │  │  │  └─ tests/Footer.test.tsx
│  │  │  └─ Avatar/
│  │  │     ├─ Avatar.tsx
│  │  │     ├─ styles/
│  │  │     │  └─ styles.module.css
│  │  │     └─ tests/Avatar.test.tsx
│  ├─ routes/                # centralized route folders (each route is a feature folder)
│  │  ├─ account-picker/     # example route/feature
│  │  │  ├─ AccountPicker.tsx  # route component or feature entry (TSX/TS)
│  │  │  ├─ styles/           # route-specific styles
│  │  │  │  └─ styles.module.css
│  │  │  └─ tests/            # route tests + snapshots
│  │  │     ├─ AccountPicker.test.tsx
│  │  │     └─ __snapshots__/AccountPicker.test.tsx.snap
│  │  ├─ accounts/
│  │  │  ├─ Accounts.tsx
│  │  │  ├─ styles/
│  │  │  └─ tests/Accounts.test.tsx
│  │  └─ signin/
│  │     ├─ SignIn.tsx
│  │     ├─ styles/
│  │     └─ tests/SignIn.test.tsx
│  ├─ store/                 # redux store and folders
│  │  ├─ index.ts            # configureStore + saga middleware setup
│  │  ├─ slices/             # feature slices (RTK createSlice)
│  │  │  └─ authSlice.ts
│  │  ├─ sagas/              # redux-saga watchers and workers (if using sagas)
│  │  │  ├─ index.ts         # root saga
│  │  │  └─ authSaga.ts
│  │  └─ services/           # api clients or service wrappers used by sagas/thunks
│  │     └─ api.ts
│  ├─ styles/                # global theme, global styles, CSS/SCSS files
│  │  ├─ theme.ts
│  │  └─ globals.css
│  ├─ tests/                 # test utilities, custom render, mocks
│  │  ├─ utils/              # server handlers, test data
│  │  └─ setupTests.ts
│  ├─ types/                 # global TypeScript types and interfaces
│  ├─ utils/                 # helpers and small utilities
│  ├─ hooks/                 # custom React hooks
│  ├─ App.tsx                # root app component
│  ├─ index.tsx              # app entry (render + provider)
│  └─ react-app-env.d.ts
├─ .eslintrc.js
├─ jest.config.js
├─ tsconfig.json
├─ package.json
└─ README.md
```

Key files and purpose

- `public/index.html`
  - Required HTML entry file. Create React App and other bundlers look for this file as the HTML template that mounts the React app in the `#root` element.

- `src/index.tsx`
  - Entry file. Wraps App with React Redux <Provider>, React Router (BrowserRouter) if required, and any theme providers.
  - Example: render <Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>

- `src/App.tsx`
  - Mounts top-level layout and <AppRoutes />. Keeps global layout components (Header, Footer) outside of routes.

- `src/routes/AppRoutes.tsx`
  - Centralized route definitions. Example:
    - `/signin` -> SignIn page
    - `/` -> Dashboard (protected)
  - Use lazy loading (React.lazy + Suspense) for large pages.

- `src/store/index.ts`
  - configureStore from @reduxjs/toolkit, export typed hooks `useAppDispatch` and `useAppSelector`.

- `src/store/slices/*.ts`
  - Small focused slices created with createSlice. Keep reducers small and testable.

- `src/components/*`
  - Reusable presentational components. Keep them controlled via props.

- `src/styles/theme.ts`
  - Central MUI or styled-components theme / tokens. Export a dark/light theme if needed.

- `src/tests/setupTests.ts`
  - Configure Testing Library, jest-dom, msw (mock server), and any global mocks. Import this file in Jest setup.

- `src/assets/`
  - Folder for application static assets such as images, SVG icons, and font files. These files are typically imported from components or copied to the build output by the bundler.

Testing

- Use React Testing Library and Jest for unit + integration tests.
- Create a custom render helper `tests/utils/test-utils.tsx` that wraps components with providers (Router, Redux store, ThemeProvider).
- Example test folders: colocate tests next to components (ComponentName.test.tsx) or use `src/tests/` for utilities.

Accessibility

- Include axe-core in unit tests (jest-axe) for automated accessibility checks.

Recommended dependencies (examples)

- Dependencies
  - react, react-dom
  - react-router-dom
  - @reduxjs/toolkit, react-redux
  - @mui/material (optional UI kit) or styled-components

- Dev dependencies
  - typescript, @types/react, @types/react-dom
  - jest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event
  - jest-axe (for accessibility tests)
  - msw (for network mocking)

Sample tsconfig.json (minimal)

```json
{
  "compilerOptions": {
    "target": "ES6",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

Jest + RTL notes

- Use `react-scripts test` or configure Jest directly. Ensure `setupTests.ts` is referenced in Jest config.
- Example `tests/setupTests.ts`:

```ts
import "@testing-library/jest-dom";
// import 'whatwg-fetch' if your app uses fetch in tests
```

Starter commands

- Create app (recommended):
  - npx create-react-app finpay-react --template typescript
- Install core packages:
  - npm install @reduxjs/toolkit react-redux react-router-dom
- Install testing tools:
  - npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-axe msw typescript

Notes

- This structure is flexible. For larger apps consider feature folders, code-splitting and stricter typing for thunks/selectors.
- If you want, I can scaffold these files and add a `test-utils.tsx` helper and a sample slice + route — tell me to proceed.
