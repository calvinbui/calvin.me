import React, { Component } from 'react'
import ThemeContext from '../context/ThemeContext'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import config from '../../data/SiteConfig'
import '../styles/main.scss'

// https://github.com/gatsbyjs/gatsby/issues/3318
if (typeof window !== "undefined") {
  // eslint-disable-next-line global-require
  require("smooth-scroll")('a[href*="#"]', {
    speed: 850,
    speedAsDuration: true,
    offset: 85,
  })
}

export default class MainLayout extends Component {
  render() {
    const { children } = this.props

    return (
      <>
        <Navigation menuLinks={config.menuLinks} />

        <main id="main-content">{children}</main>

        <Footer />
      </>
    )
  }
}

MainLayout.contextType = ThemeContext
