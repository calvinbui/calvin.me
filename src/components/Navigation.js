import React, { Component } from 'react'
import { Link } from 'gatsby'
import avatar from '../images/avatar.png'
import ThemeContext from '../context/ThemeContext'
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { BsMoon } from 'react-icons/bs'
import { IoMdSunny } from 'react-icons/io'

export default class Navigation extends Component {
  static contextType = ThemeContext // eslint-disable-line

  state = {
    scrolled: false,
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
              else if (link.type == "external") {
                if (link.name == "GitHub") {
                  var icon = <FaGithub className="nav-icons github-nav-icon" />
                } else if (link.name == "LinkedIn") {
                  var icon = <FaLinkedin className="nav-icons linkedin-nav-icon" />
                } else {
                  var icon = link.name
                }

                return (
                  <a key={link.name} href={link.link}>
                    {icon}
                  </a>
                )
              }
            })}
            <div className="cta">
              <button
                className="dark-switcher"
                onClick={theme.toggleDark}
                aria-label="Toggle Dark Mode."
                title="Toggle Dark Mode"
              >
                {theme.dark ? (
                  <IoMdSunny className="nav-icons sun-nav-icon" />
                ) : (
                    <BsMoon className="nav-icons moon-nav-icon" />
                  )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
