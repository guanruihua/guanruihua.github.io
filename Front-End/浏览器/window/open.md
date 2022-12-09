## 开启一个新弹框

```js
window.open ('page.html', 'newwindow', 'height=100, width=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no')
```

【1、最基本的弹出窗口代码】

<SCRIPT LANGUAGE=”javascript”>
<!–
window.open (‘page.html’)
–>
</SCRIPT>

因为这是一段javascripts代码，所以它们应该放在<SCRIPT LANGUAGE=”javascript”>标签和</script>之间。<!– 和 –>是对一些版本低的浏览器起作用，在这些老浏览器中不会将标签中的代码作为文本显示出来。要养成这个好习惯啊。window.open (‘page.html’) 用于控制弹出新的窗口page.html，如果page.html不与主窗口在同一路径下，前面应写明路径，绝对路径(<http://)和相对路径(../)均可。用单引号和双引号都可以，只是不要混用。这一段代码可以加入HTML>的任意位置，<head>和</head>之间可以，<body>间</body>也可以，越前越早执行，尤其是页面代码长，又想使页面早点弹出就尽量往前放。

【2、经过设置后的弹出窗口】

下面再说一说弹出窗口的设置。只要再往上面的代码中加一点东西就可以了。我们来定制这个弹出的窗口的外观，尺寸大小，弹出的位置以适应该页面的具体情况。

<SCRIPT LANGUAGE=”javascript”>
<!–
window.open (‘page.html’, ‘newwindow’, ‘height=100, width=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no’) //这句要写成一行
–>
</SCRIPT>

参数解释：

<SCRIPT LANGUAGE=”javascript”> js脚本开始；
window.open 弹出新窗口的命令；
‘page.html’ 弹出窗口的文件名；
‘newwindow’ 弹出窗口的名字（不是文件名），非必须，可用空”代替；
height=100 窗口高度；
width=400 窗口宽度；
top=0 窗口距离屏幕上方的象素值；
left=0 窗口距离屏幕左侧的象素值；
toolbar=no 是否显示工具栏，yes为显示；
menubar，scrollbars 表示菜单栏和滚动栏。
resizable=no 是否允许改变窗口大小，yes为允许；
location=no 是否显示地址栏，yes为允许；
status=no 是否显示状态栏内的信息（通常是文件已经打开），yes为允许；
</SCRIPT> js脚本结束

【3、用函数控制弹出窗口】

下面是一个完整的代码。
<html>
<head>
<script LANGUAGE=”JavaScript”>
<!–
function openwin() {
window.open (“page.html”, “newwindow”, “height=100, width=400, toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no”) //写成一行
}
//–>
</script>
</head>
<body οnlοad=”openwin()”>
任意的页面内容…
</body>
</html>

这里定义了一个函数openwin(),函数内容就是打开一个窗口。在调用它之前没有任何用途。怎么调用呢？

方法一：<body οnlοad=”openwin()”> 浏览器读页面时弹出窗口；
方法二：<body οnunlοad=”openwin()”> 浏览器离开页面时弹出窗口；
方法三：用一个连接调用：
<a href=”#” οnclick=”openwin()”>打开一个窗口</a>
注意：使用的“#”是虚连接。
方法四：用一个按钮调用：
<input type=”button” οnclick=”openwin()” value=”打开窗口”>

【4、同时弹出2个窗口】

对源代码稍微改动一下：

<script LANGUAGE=”JavaScript”>
<!–
function openwin() {
window.open (“page.html”, “newwindow”, “height=100, width=100, top=0, left=0,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=n o, status=no”)//写成一行
window.open (“page2.html”, “newwindow2″, “height=100, width=100, top=1 00, left=100,toolbar=no, menubar=no, scrollbars=no, resizable=no, loca tion=no, status=no”)//写成一行
}
//–>
</script>
为避免弹出的2个窗口覆盖，用top和left控制一下弹出的位置不要相互覆盖即可 。最后用上面说过的四种方法调用即可。
注意：2个窗口的name(newwindows和newwindow2)不要相同，或者干脆全部为空。

【5、主窗口打开文件1.htm，同时弹出小窗口page.html】

如下代码加入主窗口<head>区：
<script language=”javascript”>
<!–
function openwin() {
window.open(“page.html”,””,”width=200,height=200″)
}
//–>
</script>
加入<body>区：
<a href=”1.htm” οnclick=”openwin()”>open</a>即可。

【6、弹出的窗口之定时关闭控制】

下面我们再对弹出的窗口进行一些控制，效果就更好了。如果我们再将一小段 代码加入弹出的页面(注意是加入page.html的HTML中，不是主页面中)，让它10秒后自动关闭是不是更酷了？
首先，将如下代码加入page.html文件的<head>区：
<script language=”JavaScript”>
function closeit()
{
setTimeout(“self.close()”,10000) //毫秒
}
</script>
然后，再用<body οnlοad=”closeit()”> 这一句话代替page.html中原有的<BODY>这一句就可以了。(这一句话千万不要忘记写啊！这一句的作用是调用关闭窗口的代码，10秒钟后就自行关闭该窗口。)
