# window.closed
>
> - 只读
> - 表示所引用的窗口是
>
```js
isClosed = windowRef.closed;
```

`isClosed`:

- `true`: 窗口已被关闭
- `false`: 窗口是打开的

## example

### 更改一个弹出窗口的 URL

> 下面的示例演示怎样更改一个已打开的弹出窗口的 URL。尝试更改 URL 之前，它使用 `window.opener` 属性来检查有窗口被打开，并且该窗口没有关闭

```js
// Check that an opener exists and is not closed
if (window.opener && !window.opener.closed) {
  window.opener.location.href = "http://www.mozilla.org";
}
```

> 请注意，弹出窗口只能访问打开他们的窗口。

### 刷新先前打开的弹出窗口

> 在这个例子中，函数 `refreshPopupWindow()` 调用重载方法的弹出的位置要刷新其数据的对象
> 如果弹出窗口尚未打开，或者用户已关闭它打开一个新窗口

```js
var popupWindow = null;

function refreshPopupWindow() {
  if (popupWindow && !popupWindow.closed) {
    // popupWindow is open, refresh it
    popupWindow.location.reload(true);
  } else {
    // Open a new popup window
    popupWindow = window.open("popup.html","dataWindow");
  }
}
```
