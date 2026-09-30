import React from 'react'
import { ThemeProvider } from './src/context/ThemeContext'

export const wrapRootElement = ({ element }) => <ThemeProvider>{element}</ThemeProvider>

export const onServiceWorkerUpdateReady = () => {
  // Wait for the new worker to control the page before reloading its content.
  navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload(), { once: true })
}
