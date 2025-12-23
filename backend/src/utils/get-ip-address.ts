import os from 'os'

export function getIPAdress() {
  const interfaces = os.networkInterfaces()
  for (const devName in interfaces) {
    const iface: any = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      const alias: any = iface[i]
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address
      }
    }
  }
}
