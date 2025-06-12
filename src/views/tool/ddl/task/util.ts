import { isString } from 'asura-eye'

export const getUID = (target: string) => {
  if(!isString(target)) return '-1'
  return target.split('').map((_:string)=>_.charCodeAt(0)).join('-')
}
console.log(getUID('爱可菲做饭'))