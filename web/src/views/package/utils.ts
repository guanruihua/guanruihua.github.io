import { isString } from 'asura-eye'
import { PkgConf, Shield } from './type'

export const adapter = (_: PkgConf) => {
  if (isString(_.tags)) {
    _.tags = _.tags.split(' ')
  }
  const shields: Shield[] = _.shields || []
  if (_.example) {
    shields.push({
      url: _.example,
      logo: `https://img.shields.io/badge/Example-purple.svg`,
    })
  }

  if (_.github) {
    shields.push({
      url: 'https://github.com/' + _.github,
      logo: `https://img.shields.io/badge/Github-blue.svg`,
    })
  }

  // version
  if (isString(_.install)) {
    shields.push({
      url: `https://www.npmjs.com/package/${_.install}`,
      logo: `https://img.shields.io/npm/v/${_.install}.svg?style=flat`,
    })
  } else if (isString(_.version)) {
    shields.push({
      url: `https://www.npmjs.com/package/${_.version}`,
      logo: `https://img.shields.io/npm/v/${_.version}.svg?style=flat`,
    })
  }

  // license
  if (_.license === 'Non-Open-Source') {
    shields.push({
      url: '',
      logo: `https://img.shields.io/badge/license-Non Open Source-red`,
    })
  } else if (_.license !== 'MIT' && isString(_.license)) {
    shields.push({
      url: '',
      logo: `https://img.shields.io/badge/license-${_.license + '-orange'}`,
    })
  } else {
    shields.push({
      url: '',
      logo: `https://img.shields.io/badge/license-MIT-green `,
    })
  }
  _.shields = shields
  return _
}
