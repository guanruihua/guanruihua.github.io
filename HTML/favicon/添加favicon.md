# 给网站添加 favicon

```html
<link href="favicon.ico" mce_href="favicon.ico" rel="bookmark" type="image/x-icon" />
<link href="favicon.ico" mce_href="favicon.ico" rel="icon" type="image/x-icon" />
<link href="favicon.ico" mce_href="favicon.ico" rel="shortcut icon" type="image/x-icon" />
```

注意：
（1）这里的favicon必须是16*16或者32*32的，必须是8位色或者24位色的，格式必须是png或者ico或者gif。
16*16/32*32 且 8位或24位色 且 png/ico/gif。

（2）当favicon.ico被置于文档根目录时，将会被一些不处理link元件的浏览器找到，即使没有您的站点上没有指向它的链接。

参数解释：

- href：这是你网页图标的位置，建议放在服务器根目录下，图标必须是ico文件。

- rel：用于解释 href 链接的对象和该网页有毛线关系用的，毕竟全称就是 relationship 。

说明：

1.bookmark和icon的区别

- bookmark：在收藏夹下显示图标
- icon：资源管理器窗口，还是浏览器的收藏夹

2.shortcut icon和icon代码的区别

过去，为保证favicon出现，网站设计者和开发者采用了多种方法。很难明确地保证favicon可以在所有电脑上显示，即使是用同一版本的一种浏览器。

下列代码另一个局限就是它把favicon关联到了某个特定的HTML或XHTML文档上。为避免这一点，favicon.ico文件应置于根目录下。多数浏览器将自动检测并使用它。

```html
<link href="favicon.ico" mce_href="favicon.ico" rel="icon" type="image/x-icon" />
<link href="favicon.ico" mce_href="favicon.ico" rel="shortcut icon" type="image/x-icon" />
```

> 只有第一行是必须的，因为“shortcut icon”字符串将被多数遵守标准的浏览器识别为列出可能的关键词（“shortcut”将被忽略，而仅适用“icon”）；而Internet Explorer将会把它作为一个单独的名称（“shortcut icon”）。这样做的结果是所有浏览器都可以理解此代码。只有当希望为新浏览器提供另一种备用图像（例如动画GIF）时，才有必要添加第二行。
