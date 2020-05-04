import urljoin from 'url-join'
import moment from 'moment'
import config from '../../data/SiteConfig'

const formatDate = date => moment.utc(date).format(config.dateFormat)

const editOnGithub = post => {
  const date = moment.utc(post.date).format(config.dateFromFormat)
  return urljoin(config.repo, '/blob/master/posts', `${date}-${post.id}/index.md`)
}

export { formatDate, editOnGithub }
