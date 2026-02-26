import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5173',
        supportFile: 'cypress/support/e2e.js',
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx}',
        viewportWidth: 1280,
        viewportHeight: 800,
        video: false,
        screenshotOnRunFailure: true,
        setupNodeEvents(on, config) {
            on('before:browser:launch', (browser, launchOptions) => {
                if (browser.family === 'chromium') {
                    launchOptions.args.push('--disable-web-security')
                    launchOptions.args.push('--no-sandbox')
                    launchOptions.args.push('--disable-gpu')
                    launchOptions.args.push('--disable-dev-shm-usage')
                }
                return launchOptions
            })
        },
    },
    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
        indexHtmlFile: 'cypress/support/component-index.html',
        supportFile: 'cypress/support/component.js',
        specPattern: 'cypress/component/**/*.cy.{js,jsx}',
        viewportWidth: 1280,
        viewportHeight: 800,
        setupNodeEvents(on, config) {
            on('before:browser:launch', (browser, launchOptions) => {
                if (browser.family === 'chromium') {
                    launchOptions.args.push('--disable-web-security')
                    launchOptions.args.push('--no-sandbox')
                    launchOptions.args.push('--disable-gpu')
                    launchOptions.args.push('--disable-dev-shm-usage')
                    launchOptions.args.push('--disable-extensions')
                }
                return launchOptions
            })
        },
    },
})
