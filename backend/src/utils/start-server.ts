import http from 'http'
import { Express } from 'express'
import { getIPAdress } from './get-ip-address'
import { isString } from 'asura-eye'
import chalk from 'chalk'

export const startServer = (app: Express) => {
  const HTTPS_PORT = Number(process.env.HTTPS_PORT) || 2420
  const HTTP_PORT = Number(process.env.HTTP_PORT) || 2400
  const IPAddress = getIPAdress()

  console.log("-----------------------------")
  console.log("Server Start")
  console.log("HTTPS_PORT:", HTTPS_PORT)
  console.log("HTTP_PORT:", HTTP_PORT)
  console.log("IPAddress:", IPAddress)
  console.log("")

  if (isString(IPAddress)) {
    http.createServer(app).listen(HTTPS_PORT, IPAddress, () => {
      console.log("HTTPS Server started on " + chalk.green(`https://${IPAddress}:${HTTPS_PORT}`))
    })
    app.listen(HTTP_PORT, IPAddress, () => {
      console.log("HTTP Server started on " + chalk.green(`http://${IPAddress}:${HTTP_PORT}`))
    })
  }
  http.createServer(app).listen(HTTPS_PORT, () => {
    console.log("HTTPS Server started on port " + chalk.green(`${HTTPS_PORT}`))
  })
  app.listen(HTTP_PORT, () => {
    console.log("HTTP Server started on port " + chalk.green(`${HTTP_PORT}`))
  })
}
