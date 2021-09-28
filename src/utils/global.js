import urljoin from 'url-join'
import moment from 'moment'
import config from '../../data/SiteConfig'

const formatDate = date => moment.utc(date).format(config.dateFormat)

const editOnGithub = post => {
  const year = moment.utc(post.date).format('YYYY')
  const date = moment.utc(post.date).format(config.dateFromFormat)
  return urljoin(config.repo, 'edit/master/posts', `${year}`, `${date}-${post.id}/index.md`)
}

export { formatDate, editOnGithub }
