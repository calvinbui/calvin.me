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
          <a href="/categories">Categories</a>
          <a href="/tags">Tags</a>
          <a href="https://umami.calvin.me/share/AkrFoOXj/calvin.me" target="_blank" rel="noopener noreferrer">Analytics</a>
          <a href="https://github.com/calvinbui/calvin.me" target="_blank" rel="noopener noreferrer">Source</a>
          <a href="/rss.xml" target="_blank" rel="noopener noreferrer">RSS</a>
        </div>
      </footer>
    )
  }
}
