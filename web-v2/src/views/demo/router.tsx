export const Route = [
  {
    title: '任务队列',
    path: 'task-queue',
    element: import('./task-queue'),
  },
  {
    title: 'video 去渲染 3D渲染',
    path: 'video-2-3d',
    element: import('./video-2-3d'),
  },
  {
    title: 'Svg 内嵌 HTML',
    path: 'svg-html',
    element: import('./svg-html'),
  },
  {
    title: 'CSS 3D 立方体',
    path: 'css-3d-cube',
    element: import('./css-3d-cube'),
  },
  {
    title: 'LeaferJS / Editor',
    path: 'canvas-leaferjs-editor',
    element: import('./canvas-leaferjs/editor'),
  },
  {
    title: 'LeaferJS',
    path: 'canvas-leaferjs',
    element: import('./canvas-leaferjs'),
  },
  {
    title: 'BabylonJS',
    path: 'canvas-babylon',
    element: import('./canvas-babylon'),
  },
  {
    title: 'HCaptcha',
    path: 'hCaptcha',
    element: import('./hCaptcha'),
  },
  {
    title: '浏览器原生',
    path: 'browser-native',
    element: import('./browser-native'),
  },
  {
    title: '颜色(oklch)',
    path: 'color',
    element: import('./color'),
  },
  {
    title: 'Tailwind CSS v4',
    path: 'tailwind-css',
    element: import('./tailwind-css'),
  },
  {
    title: 'ResizeObserver：监听元素尺寸变化',
    path: 'resizeObserver',
    element: import('./ResizeObserver'),
  },
  {
    title: 'IntersectionObserver 懒加载运用',
    path: 'intersectionObserver',
    element: import('./IntersectionObserver'),
  },
  {
    title: 'Card Beam Animation',
    path: 'card-beam-animation',
    element: import('./Card-Beam-Animation'),
  },
  {
    title: 'transform 3d',
    path: 'study-transform-3d',
    element: import('./transform-3d'),
  },
  {
    title: 'Drag',
    path: 'study-drag',
    element: import('./drag'),
  },
  {
    title: '中间省略号 & svg 文本加粗',
    path: 'demo-text',
    element: import('./text/demo'),
  },
  {
    title: 'Flow Demo',
    path: 'flow-demo-grid',
    element: import('./flow-demo/demo/grid'),
  },
  {
    title: '小众 HTML 标签',
    path: 'minority-html',
    element: import('./minority-html'),
  },
  {
    title: '滚动绽放',
    path: 'scroll-bloom',
    element: import('./scroll-bloom'),
  },
  {
    title: '整屏滚动',
    path: 'scroll-snap',
    element: import('./scroll-snap'),
  },
  {
    title: 'Canvas',
    path: 'canvas',
    element: import('./canvas'),
  },
  {
    title: 'Canvas Base Style',
    path: 'canvas-base-style',
    element: import('./canvas/base-style'),
  },
  {
    title: 'Select & Drag',
    path: 'select',
    element: import('./select'),
  },
  {
    title: 'SVG',
    path: 'svg',
    element: import('./svg'),
  },
  {
    title: 'SVG Demo',
    path: 'svg-demo',
    element: import('./svg-demo'),
  },
  {
    title: '双引号样式',
    path: 'css-q-quotes',
    element: import('./quotes'),
  },
  {
    title: 'Flex',
    path: 'css-flex',
    element: import('./css-flex'),
  },
  {
    title: 'Grid',
    path: 'css-grid',
    element: import('./css-grid'),
  },
  {
    title: '字体描边',
    path: 'font-stroke',
    element: import('./font-stroke'),
  },
  // {
  //   title: 'Test',
  //   path: 'test',
  //   element: import('./test'),
  // },
]
export default { title: 'Demo', name: 'demo', path: 'demo/', route: Route }
