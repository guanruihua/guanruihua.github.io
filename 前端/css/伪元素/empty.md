# [`:empty`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:empty)

> 代表没有子元素的元素。子元素只可以是元素节点或文本（包括空格）。注释或处理指令都不会产生影响

```css
.container:empty::after {
    content: "暂无数据";
}
```

![](./__assets__/empty-2022-11-04-10-27-56.png)
