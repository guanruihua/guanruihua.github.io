export async function getStatusCode(url: string) {

  return new Promise<number>((rs) => {
    const xhr = new XMLHttpRequest()

    // 只监听加载完成事件
    xhr.onload = function () {
      rs(xhr.status)
    }

    xhr.onerror = function () {
      rs(0)
    }

    // 发送HEAD请求（只获取头部）
    xhr.open('HEAD', url)
    xhr.send()
  })
}
