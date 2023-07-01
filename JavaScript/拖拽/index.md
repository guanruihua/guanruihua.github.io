如何改变拖动时鼠标悬浮样式
H5提供了 拖放（Drag and Drop）事件，【 drag & drop 】API 中 DataTransfer 对象，来配置拖拽行为的鼠标效果

DataTransfer对象具有effectAllowed 和 dropEffect两个属性。 effectAllowed 和 dropEffect 最主要的作用是，用于配置拖拽操作过程中鼠标指针的类型以便提示用户后续可执行怎样的操作；其次的作用是，控制 drop 事件的触发与否。下面我们来看看effectAllowed 和 dropEffect两个属性的介绍，看看他们是如何控制鼠标指针样式的
effectAllowed：
1.属性作用：用于设置被拖拽元素可执行的操作。

2.取值范围：
copy ，限定dropEffect的属性值为copy，否则会鼠标指针为禁止样式
link ，限定dropEffect的属性值为link，否则会鼠标指针为禁止样式
move ，限定dropEffect的属性值为move，否则会鼠标指针为禁止样式
copyLink ，限定dropEffect的属性值为copy和link，否则会鼠标指针为禁止样式
copyMove ，限定dropEffect的属性值为copy和move，否则会鼠标指针为禁止样式
linkMove ，限定dropEffect的属性值为link和move，否则会鼠标指针为禁止样式
all ，允许dropEffect的属性值为任意值
none ，鼠标指针一直为禁止样式，不管dropEffect的属性值是什么
uninitialized ，没有限定dropEffect属性的值，效果和 all 一样。
3.注意：仅能在 dragstart 事件中设置该属性，其他事件中设置均无效。

dropEffect属性
1.属性作用：
用于设置目标元素将执行的操作，若属性值属于 effectAllowed 范围内，则鼠标指针将显示对应的指针样式，否则则显示禁止的指针样式。

2.取值范围：
copy ：被拖拽元素将被复制到目标元素内，若属于 effectAllowed 范围内时，则鼠标指针显示复制的样式，否则则显示禁止的指针样式。
link ：被拖拽元素将以超链接的形式打开资源，若属于 effectAllowed 范围内时，则鼠标指针显示超链接的样式，否则则显示禁止的指针样式。
move ：被拖拽元素将被移动到目标元素内，若属于 effectAllowed 范围内时，则鼠标指针显示移动的样式，否则则显示禁止的指针样式。
none ：被拖拽元素不能在目标元素上作任何操作，一直显示禁止的指针样式。除了文本框外其他元素的默认值均为none

3.注意：
1）仅能在 dragover 事件中设置该属性值，其他事件中设置均无效
2）当显示禁止的指针样式时，将无法触发目标元素的 drop 事件。
