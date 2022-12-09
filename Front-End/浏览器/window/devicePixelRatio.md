# [devicePixelRatio](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/devicePixelRatio)

> - `Window` 接口的 `devicePixelRatio` 返回当前显示设备的物理像素分辨率与CSS 像素分辨率之比。
> - 可解释为像素大小的比率：一个 CSS 像素的大小与一个物理像素的大小。简单来说，它告诉浏览器应使用多少屏幕实际像素来绘制单个 CSS 像素
>
> - 当处理标准显示器与 HiDPI 或 Retina 显示器之间的差异时，这很有用，后者使用更多的屏幕像素绘制相同的对象，从而获得更清晰的图像
>
> - 可以使用`window.matchMedia()` 检查`devicePixelRatio`的值是否发生更改（例如，如果用户将窗口拖动到带有 不同的像素密度）

```js
value = window.devicePixelRatio
```

## 值 Value

一个双精度浮点值，指示显示器的物理像素分辨率与 CSS 像素分辨率之比。值 1 表示经典 96 DPI（在某些平台上为 76 DPI）显示，而对于 HiDPI / Retina 显示屏则期望值为 2。在异常低分辨率的显示器中，或更常见的是，当屏幕的像素深度比简单地将 96 或 76 DPI 的标准分辨率提高一倍时，可能还会返回其他值。
