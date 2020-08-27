const config = {
  siteTitle: 'Calvin Bui',
  siteTitleShort: 'Calvin Bui',
  siteTitleAlt: 'Calvin Bui',
  siteLogo: '/favicon/favicon-meta.png',
  siteUrl: 'https://calvin.me',
  repo: 'https://github.com/calvinbui/calvin.me',
  pathPrefix: '',
  dateFromFormat: 'YYYY-MM-DD',
  dateFormat: 'MMMM Do, YYYY',
  siteDescription:
    'Calvin Bui is a DevOps Engineer passionate about IT as a career and hobby!',
  siteRss: '/rss.xml',
  postDefaultCategoryID: 'Tech',
  userName: 'Calvin Bui',
  userEmail: '',
  userTwitter: '',
  menuLinks: [
    {
      name: 'Categories',
      link: '/categories/',
      type: 'internal',
      mobile: false,
    },
    {
      name: 'Tags',
      link: '/tags/',
      type: 'internal',
      mobile: false,
    },
    {
      name: 'GitHub',
      link: 'https://git.io/calvin',
      type: 'external',
      mobile: true,
    },
    {
      name: 'LinkedIn',
      link: 'https://linkedin.com/in/c-bui',
      type: 'external',
      mobile: true,
    },
  ],
  themeColor: '#3F80FF', // Used for setting manifest and progress theme colors.
  backgroundColor: '#ffffff',
  remark42: {
    host: "https://remark42.bui.services",
    site_id: "calvin.me",
    components: ["embed"],
  }
}

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === '/') {
  config.pathPrefix = ''
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, '')}`
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === '/') config.siteUrl = config.siteUrl.slice(0, -1)

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== '/') config.siteRss = `/${config.siteRss}`

module.exports = config
