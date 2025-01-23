import React, { Component } from 'react'
import { Link } from 'gatsby'
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { IoMdSunny, IoMdMoon } from 'react-icons/io'
import avatar from '../../static/avatar.png'
import ThemeContext from '../context/ThemeContext'

export default class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrolled: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.navOnScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.navOnScroll)
  }

  navOnScroll = () => {
    if (window.scrollY > 20) {
      this.setState({ scrolled: true })
    } else {
      this.setState({ scrolled: false })
    }
  }

  render() {
    const { scrolled } = this.state
    const { menuLinks } = this.props
    const theme = this.context
    let icon

    return (
      <nav className={scrolled ? 'nav scroll' : 'nav'}>
        <div className="nav-container">
          <div className="brand">
            <Link to="/">
              <img src={avatar} className="favicon" alt="Avatar" />
              <span className="text">Calvin Bui</span>
            </Link>
          </div>
          <div className="links">
            {menuLinks.map(link => {
              if (link.type === "internal") {
                return (
                  <Link className={link.mobile ? ("") : ("nav-icon-hide-mobile")} key={link.name} to={link.link} activeClassName="active">
                    {link.name}
                  </Link>
                )
              }
              else if (link.type === "external") {
                if (link.name === "GitHub") {
                  icon = <FaGithub title="GitHub" className="nav-icons github-nav-icon" />
                } else if (link.name === "LinkedIn") {
                  icon = <FaLinkedin title="LinkedIn" className="nav-icons linkedin-nav-icon" />
                } else {
                  icon = link.name
                }

                return (
                  <a key={link.name} href={link.link}>
                    {icon}
                  </a>
                )
              } else {
                return null
              }
            })}
            <div className="cta">
              <button
                className="dark-switcher"
                onClick={theme.switch}
                aria-label="Toggle Light/Dark Mode."
                title="Toggle Light/Dark Mode"
              >
                {theme.userPreferredTheme === "dark" ? (
                  <IoMdMoon className="nav-icons moon-nav-icon" />
                ) : (
                  <IoMdSunny className="nav-icons sun-nav-icon" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

Navigation.contextType = ThemeContext
