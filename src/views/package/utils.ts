import { isString } from 'asura-eye'
import { PkgConf, Shield } from './type'

export const adapter = (_: PkgConf) => {
  if (isString(_.tags)) {
    _.tags = _.tags.split(' ')
  }
  if (_.name || _.installName) {
    const shields: Shield[] = _.shields || []
    if (_.type === 'Non-Open-Source') {
      shields.push({
        type: 'Non-Open-Source',
        url: 'Non-Open-Source',
        logo: 'Non-Open-Source',
      })
    } else {
      if (_.example) {
        shields.push({
          url: _.example,
          logo: `https://img.shields.io/badge/Example-purple.svg`,
        })
      }
      if (_.github) {
        shields.push({
          url: 'https://github.com/' + _.github,
          logo: `https://img.shields.io/badge/github-blue.svg`,
        })
      }
      if (_.github || _.license || _.licensePath) {
        shields.push({
          url:
            _.licensePath || `https://github.com/${_.github}/blob/main/LICENSE`,
          logo: `https://img.shields.io/badge/license-${
            _.license !== 'MIT' && _.license
              ? _.license + '-orange'
              : 'MIT-green'
          }`,
        })
      }
      shields.push({
        url: `https://www.npmjs.com/package/${_.installName || _.name}`,
        logo: `https://img.shields.io/npm/v/${
          _.installName || _.name
        }.svg?style=flat`,
      })
    }

    _.shields = shields
  }
  return _
}
