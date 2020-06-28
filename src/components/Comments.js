import React, { Component } from 'react'
import config from '../../data/SiteConfig'

const urljoin = require('url-join')

export default class Comments extends Component {
  componentDidMount() {
    window.remark_config = {
      host: config.remark42.host,
      site_id: config.remark42.site_id,
      components: ["embed"],
      theme: JSON.parse(localStorage.getItem('dark')) ? 'dark' : 'light',
      url: urljoin(config.siteUrl, window.location.pathname),
    }; (function (components) {
      for (let i = 0; i < components.length; i++) {
        const script = window.document.createElement('script')
        script.src = config.remark42.host + '/web/' + components[i] + '.js'
        script.defer = true
        script.id = 'remark-script'
          ; (window.document.head || window.document.body).appendChild(script)
      }
    })(config.remark42.components || ['embed'])
  }

  componentWillUnmount() {
    const script = window.document.getElementById('remark-script')
    if (script) {
      script.parentNode.removeChild(script)
    }
  }

  render() {
    const { className } = this.props
    return <div className={className} id="remark42" />
  }
}