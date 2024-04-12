import { defineConfig } from "cypress";
export default defineConfig({
  e2e: {
    retries : 10,
    watchForFileChanges : false,
    defaultCommandTimeout : 30000,
    requestTimeout : 30000,
    baseUrl: 'http://localhost:4200',
    chromeWebSecurity: false,
    experimentalOriginDependencies: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});