// import { VDao } from '0vdao'
import { readDir } from '0file-system'
// import { mock } from 'mock-record'
import { apiServer, loadApis, initTableApi, mock, VDao } from '0mock-server'

// import fs from 'fs'
// console.log(VDao, readDir, mock)

const config = {
  locale: {
    lang: 'localeStr',
    langs: ['zh_CN', 'en_US', 'zh_TW'],
    fields: ['desc']
  }
}

function apiServerCallback(app) {
  const vDao = new VDao()
  vDao.init(
    'db',
    mock({
      'list|30-50': {
        id: '@id',
        // uid: "@uuid",
        type: '@name',
        // 'maxLength|1-30': 10,
        'desc&&zh_CN,en_US,zh_TW': '@name',
        'shortURL|1': ['1', '2']
      }
    })['list']
  )
  console.log(vDao.db)
  loadApis(
    initTableApi(
      'db',
      vDao,
      (data) => {
        return { code: '0', result: data, message: 'Successful' }
      },
      config
    ),
    app
  )
}

apiServer({
  callback: apiServerCallback,
  port: 10086
})

// 控制台就有接口显示出来
