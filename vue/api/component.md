# [`component`](https://cn.vuejs.org/api/general.html#definecomponent)

## defineComponent
>
> 定义 `vue` 组件
>
### type

```ts
// 选项语法
function defineComponent(
  component: ComponentOptions
): ComponentConstructor

// 函数语法 (需要 3.3+)
function defineComponent(
  setup: ComponentOptions['setup'],
  extraOptions?: ComponentOptions
): () => any
```

## defineAsyncComponent

> - 定义异步组件
> - 懒加载

### type

```ts
function defineAsyncComponent(
  source: AsyncComponentLoader | AsyncComponentOptions
): Component

type AsyncComponentLoader = () => Promise<Component>

interface AsyncComponentOptions {
 /**
  * 可为异步加载函数
  */
  loader: AsyncComponentLoader
  loadingComponent?: Component
  errorComponent?: Component
  delay?: number
  timeout?: number
  suspensible?: boolean
  onError?: (
    error: Error,
    retry: () => void,
    fail: () => void,
    attempts: number
  ) => any
}
```

## defineCustomElement

> - 定义参数和 `defineComponent` 相同

### type

```ts
function defineCustomElement(
  component:
    | (ComponentOptions & { styles?: string[] })
    | ComponentOptions['setup']
): {
  new (props?: object): HTMLElement
}
```

### 非常规
>
> `customElements.define()` 注册自定义元素构造器
>
#### eg

```ts
import { defineCustomElement } from 'vue'

const MyVueElement = defineCustomElement({
  /* 组件选项 */
})

// 注册自定义元素
customElements.define('my-vue-element', MyVueElement)
```
