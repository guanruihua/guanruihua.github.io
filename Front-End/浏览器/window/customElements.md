# customElements

> `customElements` 是Window对象上的一个只读属性，接口返回一个`CustomElementRegistry` 对象的引用，可用于注册新的 `custom elements`，或者获取之前定义过的自定义元素的信息

## example

> 这个属性最常用的例子是用来获取使用`CustomElementRegistry.define()`方法定义和注册的自定义元素

```js
let customElementRegistry = window.customElements;
customElementRegistry.define('my-custom-element', MyCustomElement);
```

通常缩写：

```js
customElements.define('element-details',
  class extends HTMLElement {
    constructor() {
      super();
      const template = document
        .getElementById('element-details-template')
        .content;
      const shadowRoot = this.attachShadow({mode: 'open'})
        .appendChild(template.cloneNode(true));
  }
});
```
