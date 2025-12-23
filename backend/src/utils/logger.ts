import fs from 'fs'

class Logger {
  ip: string = 'localhost'
  constructor() {
    this.ip = 'localhost'
  }
  log(...args: any[]) {
    this.saveLog('[log]', ...args)
    console.info(...args)
  }
  error(...args: any[]) {
    this.saveLog('[error]', ...args)
    console.error(...args)
  }
  getTodaysDateLog() {
    return 'logs/' + new Date().toISOString().slice(0, 10) + '.log'
  }
  isTodaysLogExist() {
    return fs.existsSync(this.getTodaysDateLog())
  }
  createTodaysLog() {
    if (!this.isTodaysLogExist()) {
      fs.writeFileSync(this.getTodaysDateLog(), '')
    }
  }
  getOld() {
    const url = this.getTodaysDateLog()
    try {
      return JSON.parse((fs.readFileSync(url) as any) || '') || ''
    } catch (error) {
      return ''
    }
  }
  saveLog(type: string, ...args: any[]) {
    this.createTodaysLog()
    const options: any = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    }
    const url = this.getTodaysDateLog()
    const date = new Date().toLocaleDateString(undefined, options)
    // const old = this.getOld()

    const newLog = `
${date} ${this.ip} ${type} ${args
      .map((arg) => JSON.stringify(arg, null, 2))
      .join(' , ')}`
    fs.appendFileSync(url, newLog)
    // fs.writeFileSync(url, old + newLog)
  }
}

export const logger = new Logger()
