import React, { Component } from 'react'
import ThemeContext from '../context/ThemeContext'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import config from '../../data/SiteConfig'
import '../styles/main.scss'

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
