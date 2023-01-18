# React 内置类型

[事件处理](./%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86.md)
[HTML标签类型](./HTML%E6%A0%87%E7%AD%BE%E7%B1%BB%E5%9E%8B.md)

## React.ReactNode和React.Element

## ReactNode | undefined

```tsx
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
```

> `type ReactFragment = {} | ReactNodeArray;`:就是<>xxx</>或者`<React.Fragament>xxx<React.Fragament/>`

```tsx
interface ReactPortal extends ReactElement {
    key: Key | null;
    children: ReactNode;
}
```

> 就是ReactDOM.createPortal(child, container)这个API的返回值

```ts
export function createPortal(children: ReactNode, container: Element, key?: null | string): ReactPortal;
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;
```

> ReactNode是一个联合类型，囊括了ReactElement

```tsx
interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
}
```

> 写上***(child as ReactElement).props***就不会报错

```tsx
function createElement<P extends {}>(
    type: FunctionComponent<P> | ComponentClass<P> | string,
    props?: Attributes & P | null,
    ...children: ReactNode[]): ReactElement<P>;
```

> ReactElement: createElement的返回值

```tsx
// DOM Elements
// TODO: generalize this to everything in `keyof ReactHTML`, not just "input"
function createElement(
    type: "input",
    props?: InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement> | null,
    ...children: ReactNode[]): DetailedReactHTMLElement<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
function createElement<P extends HTMLAttributes<T>, T extends HTMLElement>(
    type: keyof ReactHTML,
    props?: ClassAttributes<T> & P | null,
    ...children: ReactNode[]): DetailedReactHTMLElement<P, T>;
function createElement<P extends SVGAttributes<T>, T extends SVGElement>(
    type: keyof ReactSVG,
    props?: ClassAttributes<T> & P | null,
    ...children: ReactNode[]): ReactSVGElement;
function createElement<P extends DOMAttributes<T>, T extends Element>(
    type: string,
    props?: ClassAttributes<T> & P | null,
    ...children: ReactNode[]): DOMElement<P, T>;

// Custom components

function createElement<P extends {}>(
    type: FunctionComponent<P>,
    props?: Attributes & P | null,
    ...children: ReactNode[]): FunctionComponentElement<P>;
function createElement<P extends {}>(
    type: ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>>,
    props?: ClassAttributes<ClassicComponent<P, ComponentState>> & P | null,
    ...children: ReactNode[]): CElement<P, ClassicComponent<P, ComponentState>>;
function createElement<P extends {}, T extends Component<P, ComponentState>, C extends ComponentClass<P>>(
    type: ClassType<P, T, C>,
    props?: ClassAttributes<T> & P | null,
    ...children: ReactNode[]): CElement<P, T>;
function createElement<P extends {}>(
    type: FunctionComponent<P> | ComponentClass<P> | string,
    props?: Attributes & P | null,
    ...children: ReactNode[]): ReactElement<P>;
```

> - `DOMElement<P, T>，FunctionComponentElement啊，CElement<P, ClassicComponent<P, ComponentState>>`, 都是 extends ReactElement,  所以得出`ReactElement`是由`React.createElement()`这个API创建出来的类型，根本上是一个Js对象，如上图所示，在Jsx里面以自定义组件的形式呈现，比如`<MyComponent />`，这就是一个ReactElement，而`<div />`，也是一个`ReactElement`
> - 被React渲染到浏览器上的东西，可以理解为VDOM上的每个节点，都是是ReactNode

```tsx

const Parent = () => {
  return (
   <>
      <div>
        <Child />
      <div/>
    </>
  )
}

const Child = () => {
  return (
   <>
      <div>
       我是孩子
      <div/>
    </>
  )
}

ReactDOM.render(
    <Parent />,
    document.getElementById('root')
)
```

> React.FC的返回值是ReactElement

```ts
interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
}
```

> 返回的类型是明确的ReactElement, 看之前createElement源码部分，有对自定义组件的说明。(当然其实也可以理解为返回ReactNode,因为Element是Node的子集，但还是根据源码准确点好, 因为可以注意类组件的render方法和函数声明方式写的组件，他们渲染的类型都是JSX.Element，也就是说 JSX.Element == ReactElement)
