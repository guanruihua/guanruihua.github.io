import { isString } from 'asura-eye'

const Seed = `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_`

function toS(num:number) {
  if (num === 0) return Seed[0];
  
  let result = '';
  while (num > 0) {
    const remainder = num % 64;
    result = Seed[remainder] + result;
    num = Math.floor(num / 64);
  }
  
  return result;
}

export const getUID = (target: string): string => {
  if (!isString(target)) return '-1'
  return target
    .split('')
    .map((_: string) => toS(_.charCodeAt(0)))
    .join('')
}
