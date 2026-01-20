export const getRect = (selector: string): DOMRect =>
  document.querySelector(selector).getBoundingClientRect()

export const sleep = (time: number = 3000) =>
  new Promise((rs) => {
    const timer = setTimeout(() => {
      rs(1)
      clearTimeout(timer)
    }, time)
  })
