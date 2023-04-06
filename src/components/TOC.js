import React, { Component } from 'react'

export default class TOC extends Component {
  render() {
    const { tableOfContents } = this.props

    // get all headings from the table of contents string
    // let hrefs = tableOfContents.match(/(\w|-)+"/g) // leaves a double quote to be stripped
    // hrefs.forEach((href, index) => { hrefs[index] = href.substring(0, href.length - 1) })

    return (
      <nav className="toc" dangerouslySetInnerHTML={{ __html: tableOfContents }} />
    )
  }
}
