const Route = [
  {
    title: '过渡动画',
    path: 'loading',
    element: import('./loading'),
  },
  {
    title: '终端',
    path: 'terminal',
    element: import('./terminal'),
  },
  {
    title: '黑客帝国数字雨',
    path: 'Digital-Rain',
    element: import('./canvas/digital-rain'),
  },
  {
    title: '贝塞尔曲线',
    path: 'css-cubic-bezier',
    element: import('./css/cubic-bezier'),
  },
  {
    title: 'Fireworks | 2026 烟花特效',
    path: 'fireworks',
    element: import('./fireworks'),
  },
  // {
  //   title: 'Interactive Swiping Card',
  //   path: 'interactive-swiping-card',
  //   element: import('./interactive-swiping-card'),
  // },
  {
    title: 'Payment Status Screen',
    path: 'payment-status-screen',
    element: import('./payment-status-screen'),
  },
  {
    title: 'Flight Ticket',
    path: 'flight-ticket',
    element: import('./flight-ticket'),
  },
  {
    title: 'The Good Place',
    path: 'good-place',
    element: import('./good-place'),
  },
  {
    title: '3d Card',
    path: '3d-card',
    element: import('./3d-card'),
  },
  {
    title: 'Responsive Grid Layout',
    path: 'responsive-grid-layout',
    element: import('./responsive-grid-layout'),
  },
  {
    title: 'Text Frame Border animation rotation',
    path: 'text-frame-border',
    element: import('./text-frame-border'),
  },
  {
    title: 'Image Zoom in width ScrollTrigger(Beta)',
    path: 'image-zoom-scrollTrigger',
    element: import('./image-zoom-scrollTrigger'),
  },
  {
    title: '3D CSS: Final',
    path: 'css-3d-final',
    element: import('./css-3d-final'),
  },
  {
    title: '水波纹进度条',
    path: 'progress',
    element: import('./progress'),
  },
  {
    title: 'Fitness Card',
    path: 'fitness-card',
    element: import('./fitness-card'),
  },
  {
    title: 'swipe effect',
    path: 'swipe-effect',
    element: import('./swipe-effect'),
  },
  {
    title: 'Monochrome',
    path: 'monochrome',
    element: import('./monochrome'),
  },
  {
    title: 'Glassmorphic Card with Glow Cursor & Reactive Border',
    path: 'glassmorphic-card',
    element: import('./glassmorphic-card'),
  },
  {
    title: 'Fitness Tracking App',
    path: 'fitness-tracking-app',
    element: import('./fitness-tracking-app'),
  },
  {
    title: 'Yearly Activity Grid',
    path: 'yearly-activity-grid',
    element: import('./yearly-activity-grid'),
  },
  {
    title: 'Animated image slider',
    path: 'animated-image-slider',
    element: import('./animated-image-slider'),
  },
  {
    title: 'Projects Carousel',
    path: 'projects-carousel',
    element: import('./projects-carousel'),
  },
  {
    title: 'Repetition Image',
    path: 'repetition-image',
    element: import('./repetition-image'),
  },
  {
    title: 'Electric Border',
    path: 'electric-border',
    element: import('./electric-border'),
  },
  {
    title: 'Carousel + Lightbox + Glow',
    path: 'carousel-lightbox-glow',
    element: import('./carousel-lightbox-glow'),
  },
  {
    title: 'Circular Animations Set ',
    path: 'circular-animations-set',
    element: import('./circular-animations-set'),
  },
  {
    title: 'Change the color on the 1995 website',
    path: 'change-color',
    element: import('./change-color'),
  },
  {
    title: 'Toast Catcher Game',
    path: 'toast-catcher-game',
    element: import('./toast-catcher-game'),
  },
  {
    title: 'December Countdown Calendar',
    path: 'december-countdown-calendar',
    element: import('./december-countdown-calendar'),
  },
  // {
  //   title: 'TEST',
  //   path: 'animation-test-page',
  //   element: (import('./test')),
  // },
  process.env.NODE_ENV === 'development' && {
    title: 'TEST',
    path: 'animation-test-page',
    element: import('./test'),
  },
].filter(Boolean)

export default {
  title: 'Animation',
  name: 'animation',
  path: 'animation/',
  route: Route as any[],
}
