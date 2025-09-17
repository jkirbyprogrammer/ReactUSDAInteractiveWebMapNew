React, Vite, and TypeScript USDA Interactive Map
Dashboard example using React, Vite, TypeScript, React Leaflet, CSS, Bootstrap and more. Example uses public data from USDA, since they do not have any interactive maps like this. This uses data from 2022 crop census, Disaster Designation Information Made By the US Secretary of Agriculture, Presidential Emergency Declarations, all linked together in a clean interactive web map at county & state level. 

- Project uses data that was pulled from USDA from 2018 to mid 2025: 
  - https://www.fsa.usda.gov/resources/disaster-assistance-program/disaster-designation-information
  - USDA quick stats
- Public version of using this react application:
  - [Link to React Web Map](https://jolly-glacier-05284a610.1.azurestaticapps.net/) 
- Application Details:
  - React 19.1.1
  - Bootstrap v5.3.8
  - Leaflet v1.9.4
  - React-Leaflet v5.0.0
  - TypeScript v5.8.3
  - vite v7.1.5
  - CSS
  - HTML5
  - GeoJSON (Note: In an enterprise environment these should be calling API calls to pull in JSON data, but for this example is just using static JSON files that were created from an API call.)

If running in Visual Studio Code:
  - In terminal use 'npm start' to run. To build publish package use 'npm run build'.   


***********************************************************************************************************************************************************************************

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
