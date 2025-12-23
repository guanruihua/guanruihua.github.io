import { Express } from 'express'
import { ObjectType } from '0type'
import { Router } from 'express'
import { getParams } from '../utils'
import { isArray, isObject } from 'asura-eye'
import chalk from 'chalk'

export const registerInterfaces = async (app: Express, interfaces: any[]) => {
  const router = Router()
  app.use('/', router)

  const register = (item: ObjectType) => {
    if (!item.path) return
    if (item.post) {
      console.log(chalk.magenta('Post') + ' ' + chalk.green(item.path))

      if (item.type === 'simple') {
        router.post(item.path, item.post)
      } else
        router.post(item.path, async (req, res) => {
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Content-type', 'application/json')
          const params = getParams(req) ?? {}
          console.log(`post: ${item.path} => params: `, params)
          try {
            const result = await item.post(params, req, res)
            // console.log(`post: ${item.path} => result: `, result)

            const getResult = () => {
              if (isObject(item.overwrite)) {
                return {
                  code: 200,
                  message: 'success',
                  data: '',
                  ...result,
                }
              }

              return {
                code: 200,
                message: 'success',
                data: result,
              }
            }

            return res.status(200).json(getResult())
          } catch (error) {
            console.error(item.path, '--error--', error)
            // return res.send({ code: 500, data: '' })
            return res.send()
            // return res.status(200).json({
            //   code: 500,
            //   message: 'error',
            //   data: '',
            // })
          }
        })
    }
    if (item.get) {
      console.log(chalk.cyan('Get') + '  ' + chalk.green(item.path))
      if (item.type === 'simple') {
        router.get(item.path, item.get)
      } else
        router.get(item.path, async (req, res) => {
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Content-type', 'application/json')
          const params = getParams(req) ?? {}
          console.log(`get: ${item.path} => parms: `, params)
          try {
            const result = await item.get(params, req, res)
            // console.log(`get: ${item.path} => result: `, result)

            const getResult = () => {
              if (isObject(item.overwrite)) {
                return {
                  code: 200,
                  message: 'success',
                  data: '',
                  ...result,
                }
              }

              return {
                code: 200,
                message: 'success',
                data: result,
              }
            }

            return res.status(200).json(getResult())
          } catch (error) {
            console.error(item.path, '--error--', error)

            // console.error(error)
            return res.send()
            // return res.status(200).json({
            //   code: 500,
            //   message: 'error',
            //   data: '',
            // })
          }
        })
    }
  }

  interfaces.forEach(async (module) => {
    const item = (await module).default
    if (isObject(item)) register(item)
    if (isArray(item)) item.forEach(register)
    return
  })
}
