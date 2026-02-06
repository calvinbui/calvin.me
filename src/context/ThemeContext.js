import React, { Component } from 'react'

const defaultState = {
  userPreferredTheme: "dark",
  switch: () => { },
}

const ThemeContext = React.createContext(defaultState)

class ThemeProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userPreferredTheme: "dark",
    }
  }

  componentDidMount() {
    this.setState({ userPreferredTheme: window.theme === "dark" ? "light" : "dark" })
  }

  switch = () => {
    window.setPreferredTheme(window.theme === "dark" ? "light" : "dark")
    this.setState({ userPreferredTheme: window.theme === "dark" ? "light" : "dark" })
  }

  render() {
    const { children } = this.props
    const { userPreferredTheme } = this.state

    return (
      <ThemeContext.Provider
        value={{
          userPreferredTheme,
          switch: this.switch,
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }
}

export default ThemeContext

export { ThemeProvider }
