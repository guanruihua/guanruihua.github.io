import { PkgConf, Shield } from './type'

export const adapter = (_: PkgConf) => {
  if(_.logo && _.logo.indexOf('http') === -1){
    _.logo = 'http://www.google.com/s2/favicons?domain=' + _.logo
  }
  if (_.name) {
    const shields: Shield[] = _.shields || []
    if (_.type === 'Non-Open-Source') {
      shields.push({
        type: 'Non-Open-Source',
        url: 'Non-Open-Source',
        logo: 'Non-Open-Source'
      })
    } else {
      shields.push({
        url: `https://www.npmjs.com/package/${_.name}`,
        logo: `https://img.shields.io/npm/v/${_.name}.svg?style=flat`
      })
      if (_.github) {
        shields.push({
          url: 'https://github.com/' + _.github,
          logo: `https://img.shields.io/badge/github-blue.svg`
        })
        shields.push({
          url:
            _.licensePath || `https://github.com/${_.github}/blob/main/LICENSE`,
          logo: `https://img.shields.io/badge/license-${
            _.license !== 'MIT' && _.license
              ? _.license + '-orange'
              : 'MIT-green'
          }`
        })
      }
    }

    _.shields = shields
  }
  return _
}
