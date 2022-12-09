# [`innerHeight`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/innerHeight)

> - 浏览器窗口的视口（viewport）高度（以像素为单位）；如果有水平滚动条，也包括滚动条高度
> - 任何窗口对象，如 window、frame、frameset 或 secondary window 都支持 innerHeight 属性

```js
var intViewportHeight = window.innerHeight;
```

- `intViewportHeight` 为浏览器窗口的视口的高度

- `window.innerHeight` 属性为只读，且没有默认值

有一个算法用来获取不包括水平滚动条的视口高度。

## Example

> frameset

```js

var intFrameHeight = window.innerHeight; // or

var intFrameHeight = self.innerHeight;
// 返回 frameset 里面的 frame 视口的高度

var intFramesetHeight = parent.innerHeight;
// 返回上一级 frameset 的视口的高度

var intOuterFramesetHeight = top.innerHeight;
// 返回最外部 frameset 的视口的高度
```

{{todo("link to an interactive demo here")}}

改变一个窗口的大小，可以查看 `window.resizeBy()` 和 `window.resizeTo()`

想获取窗口的外层高度（outer height），即整个浏览器窗口的高度，请查看 `window.outerHeight`
