import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import ThemeContext from '../context/ThemeContext'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import config from '../../data/SiteConfig'
import favicon from '../../static/favicon/favicon-256.png'
import '../styles/main.scss'

export default class MainLayout extends Component {
  render() {
    const { dark, notFound } = this.context
    const { children } = this.props
    let themeClass = ''

    if (!dark && !notFound) {
      themeClass = 'dark'
    } else if (notFound) {
      themeClass = 'not-found'
    }

    return (
      <>
        <Helmet
          bodyAttributes={{
            class: `theme ${themeClass}`,
          }}
        >
          <html lang="en" />
          <meta name="description" content={config.siteDescription} />
          <link rel="shortcut icon" type="image/png" href={favicon} />
        </Helmet>
        <Navigation menuLinks={config.menuLinks} />
        <main id="main-content">{children}</main>
        <Footer />
      </>
    )
  }
}

MainLayout.contextType = ThemeContext
