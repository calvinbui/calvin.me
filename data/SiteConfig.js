const config = {
  siteTitle: 'Calvin Bui',
  siteTitleShort: 'Calvin Bui',
  siteTitleAlt: 'Calvin Bui',
  siteLogo: '/logos/logo-1024.png',
  siteUrl: 'https://calvin.me',
  repo: 'https://github.com/calvinbui/calvinbui.github.io',
  pathPrefix: '',
  dateFromFormat: 'DD-MM-YYYY',
  dateFormat: 'MMMM Do, YYYY',
  siteDescription:
    'Calvin Bui is a DevOps Engineer passionate about IT as a career and hobby!',
  siteRss: '/rss.xml',
  postDefaultCategoryID: 'Tech',
  userName: 'calvinbui',
  userEmail: 'blog@bui.io',
  userTwitter: 'ASAPCalvin',
  menuLinks: [
    {
      name: 'GitHub',
      link: '/me/',
    },
    {
      name: 'LinkedIn',
      link: '/blog/',
    },
  ],
  themeColor: '#3F80FF', // Used for setting manifest and progress theme colors.
  backgroundColor: '#ffffff',
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
