export const leftSideWidth = 250

export function throttle(fn: any, delay: any) {
  let timer: any = null
  return function () {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}
export const zeroLastDigit = (num: number) => Math.floor(num / 10) * 10
