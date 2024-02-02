# Review Screen - Docsumo

**This is a user interface for reviewing and confirming extracted data for which the document the user has uploaded.**

- The project is made using Vite and React
- No third party libraries are used at all. Everything is written in React and JS.
- Since the website has a single main page, there is only one Page in the app i.e. `ReviewScreen.jsx`. The page can be found in the `pages` folder.
- There multiple components which are used to build the page, all of which are placed in the `components` folder.
- The API dumps are placed in the `data` folder and are imported dynamically in the `ReviewScreen` page.
- The styling is done using a single `reviewScreen.scss` file which can be found in the `styles` folder.
- No styling libraries are used since the scope of the project is very small and including a third party library would alter performance.
- Some common utility functions are placed in the `utils` folder in the `common.js` file.
- There is no global state library used in the app since prop drilling and passing props were apt for the application as the flow of data was not complex at all.
- The Performance of the hosted page on Lighthouse is 95.
- The project is hosted on Netlify and can be found at: [Review Screen - Docsumo](https://resilient-griffin-f75a36.netlify.app/)
