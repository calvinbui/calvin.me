import React from 'react'
import { ThemeProvider } from './src/context/ThemeContext'

/* eslint-disable import/prefer-default-export */
export const wrapRootElement = ({ element }) => <ThemeProvider>{element}</ThemeProvider>
