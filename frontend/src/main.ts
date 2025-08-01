import './assets/index.css'
import './assets/main.css'

import { createApp } from 'vue'
import { retrieveLaunchParams } from '@telegram-apps/sdk-vue'

import App from './App.vue'
import router from './router'
import { errorHandler } from './errorHandler'
import { init } from './init'
import { TonConnectUIPlugin } from './tonconnect'
import { publicUrl } from './helperts/publicUrl'

// Mock the environment in case, we are outside Telegram.
import './mockEnv'
import { createPinia } from 'pinia'
import GovnoLogger from './lib/logger'

// Configure all application dependencies.
init(retrieveLaunchParams().startParam === 'debug' || import.meta.env.DEV)

const pinia = createPinia()
const app = createApp(App)

app.config.errorHandler = errorHandler
app.use(router)
app.use(TonConnectUIPlugin, { manifestUrl: publicUrl('tonconnect-manifest.json') })
app.use(pinia)
app.use(GovnoLogger)
app.mount('#app')
