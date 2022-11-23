# word-break & word-wrap & white-space

## white-space

> 控制空白字符的显示, 控制是否换行
>
> `normal | nowrap | pre | pre-wrap | pre-line`

```html
<style>
 div#box {
  border: 1px solid #000;
  width: 100px;
    white-space: normal;
 }
</style>
<div id="box">
  Hi&nbsp;&nbsp;,
  This is a incomprehensibilities long word.
  <br>
  你好&nbsp;&nbsp;，
  这 是一个不可思议的长单词
</div>
```

| `normal`   | ![](/__assets__/image-20211209102306919-16390165906611.png) | 默认                                           |
| ---------- | ------------------------------------------------------------ | ---------------------------------------------- |
| `nowrap`   | ![](./__assets__/image-20211209102458666.png) | 只有`<br>`才可以换行, <br>空格和换行符失效     |
| `pre`      | ![](./__assets__/image-20211209102536365.png) | 空格和换行符全都被保留了下来<br>自动换行还是没 |
| `pre-wrap` | ![](./__assets__/image-20211209102933032.png) | 保留空格和换行符, 可自动换行                   |
| `pre-line` | ![](./__assets__/image-20211209103105521.png) | 空格被合并, 换行符发挥作用                     |

## word-break

> 控制单词如何被拆分换行
>
> `normal | break-all | keep-all`

```html
<style>
 div#box {
  border: 1px solid #000;
  width: 100px;
  word-break: normal;
 }
</style>

<body>
 <div id="box">
  Hi&nbsp;&nbsp;,
  This is a incomprehensibilities long word.
  <br>
  你好&nbsp;&nbsp;，
  这 是一个不可思议的长单词
 </div>
</body>
```

| `normal`    | ![](__assets__/image-20211209104047949-16390176505692.png) | 默认                                                   |
| ----------- | ------------------------------------------------------------ | ------------------------------------------------------ |
| `break-all` | ![](__assets__/image-20211209104132983.png) | 所有单词碰到边界一律拆分换行                           |
| `keep-all`  | ![](__assets__/image-20211209104246886.png) | __所有“单词”一律不拆分换行__, <br>只有空格可以触发换行 |

## word-wrap ( overflow-wrap )

> 控制单词如何换行
>
> `normal | break-word`

### break-word

![image-20211209104919825](__assets__/image-20211209104919825.png)
