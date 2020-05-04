import React, { Component } from 'react'
import { Disqus } from 'gatsby-plugin-disqus'

export default class Comments extends Component {
  render() {
    return (
      <Disqus className="container" config={this.props} />
    )
  }
}
