# position

> 定位布局时利用position属性控制页面元素设置一些不规则布局。
> 定位元素的各个属性：

1. static 静态定位： HTML元素的默认值，即没有定位，元素出现在正常的流中。

```css
div.static {
    position: static;
    border: 3px solid #73AD21;
}
```

2. fixed 固定定位： 元素的位置相对于浏览器窗口是固定位置。即使窗口是滚动的它也不会移动。Fixed定位使元素的位置与文档流无关，因此不占据空间。Fixed定位的元素和其他元素重叠。

```css
p.pos_fixed{
    position:fixed;
    top:30px;
    right:5px;
}
```

3. relative 相对定位： 相对定位元素的定位是以自身为参照物。对象不可层叠、不脱离文档流，移动相对定位元素，但它原本所占的空间不会改变。通过 top,bottom,left,right 定位。

```css
h2.pos_top
{
    position:relative;
    top:-50px;
}
```

4. absolute 绝对定位 absolute 定位使元素的位置与文档流无关，因此不占据空间。元素和其他元素重叠。通过 top,bottom,left,right 定位。选取其最近一个最有定位设置的父级对象进行绝对定位，如果对象的父级没有设置定位属性，absolute元素将以body坐标原点进行定位。

```css
h2{
    position:absolute;
    left:100px;
    top:150px;
}
```

5. sticky 粘性定位 基于用户的滚动位置来定位。粘性定位的元素是依赖于用户的滚动，在 position:relative 与 position:fixed 定位之间切换。它的行为就像 position:relative; 而当页面滚动超出目标区域时，它的表现就像 position:fixed，它会固定在目标位置。元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。这个特定阈值指的是 top, right, bottom 或 left 之一，换言之，指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。

```css
div.sticky {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
    background-color: green;
    border: 2px solid #4CAF50;
}
```

6. z-index 因为页面中元素的定位与文档流无关，所以定位的元素可以覆盖在文档流上面。所以z-index属性指定了一个元素的堆叠顺序（哪个元素应该放在前面/后面）。z-index的值必须取正整数，数值越大显示的优先级就越高。 如果两个定位元素重叠，而且还没有指定z - index，name最后定位在HTML代码中的元素将被显示在最前面。
