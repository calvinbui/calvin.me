import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer container">
        <div>
          <a href="#">
            Back To Top
        </a>
        </div>
        <div>
          <a href="" target="_blank" rel="noopener noreferrer">Source</a>
          <a href="/rss.xml" target="_blank" rel="noopener noreferrer">RSS</a>
        </div>
      </footer>
    )
  }
}
