# [`warning`]()

## Warning: A component is `contentEditable` and contains `children` managed by React

> 当在 react jsx中，给标签设置可编辑的属性contentEditable，页面会弹出警告

`A component is contentEditable and contains children managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.`

```jsx
<div 
 className="num" 
 suppressContentEditableWarning 
 contentEditable="true" 
 orignalnum={item.userNum}>
 {item.userNum}
</div>
```
