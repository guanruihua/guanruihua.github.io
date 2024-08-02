import { PkgConf } from './type'
import { adapter } from './utils'

export const pkgConf: PkgConf[] = [
  {
    name: '@antv/g6',
    label: 'g6',
    // logo: 'g6.antv.antgroup.com',
    logo: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7svFR6wkPMoAAAAAAAAAAAAADmJ7AQ/original',
    desc: '可视化图表库',
    github: 'antvis/g6',
    home: 'https://g6.antv.antgroup.com/zh/examples/case/treeDemos#customFlow',
    licensePath: 'https://github.com/antvis/G6/blob/v5/LICENSE',
    tags: [
      'visualization',
      'tree',
      'graph',
      'network',
      'data-visualization',
      'graph-visualization',
      'graph-analytics',
      'visual-analytics',
      'graph-drawing'
    ]
  },
  {
    name: 'echarts',
    label: 'Echarts',
    logo: 'echarts.apache.org',
    desc: '可视化图表库',
    github: 'apache/echarts',
    home: 'https://echarts.apache.org/examples/zh/index.html',
    license: 'Apache License 2.0',
    licensePath: 'https://github.com/apache/echarts/blob/master/LICENSE',
    tags: [
      'isualization',
      'svg',
      'charts',
      'canvas',
      'charting-library',
      'apache',
      'data-visualization',
      'data-viz',
      'echarts'
    ]
  },
  {
    name: 'animejs',
    label: 'animejs',
    logo: 'animejs.com',
    desc: 'Vue 2和3的基本Vue合成实用程序集合 ',
    github: 'juliangarnier/anime',
    home: 'https://animejs.com/documentation/#cssSelector',
    licensePath:
      'https://github.com/juliangarnier/anime/blob/master/LICENSE.md',
    tags: [
      'javascript',
      'css',
      'svg',
      'canvas',
      'anime',
      'animation',
      'javascript-library'
    ]
  },
  {
    name: '@vueuse/core',
    label: 'vueuse',
    logo: 'vueuse.org',
    desc: 'Vue 2和3的基本Vue合成实用程序集合 ',
    github: 'vueuse/vueuse',
    home: 'https://vueuse.org/functions.html',
    tags: [
      'vue',
      'vue2',
      'vue3',
      'hook',
      'vue',
      'utility-library',
      'composable',
      'vue-use',
      'vue3',
      'vue-composition-api',
      'vue-next'
    ]
  },
  {
    name: 'commander',
    label: 'Commander.js',
    desc: '编写代码来描述你的命令行界面',
    github: 'tj/commander.js',
    licensePath: 'https://github.com/tj/commander.js/blob/master/LICENSE',
    home: 'https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md',
    tags: ['commander', 'js', '命令', 'command']
  },
  {
    name: 'puppeteer',
    label: 'Puppeteer',
    desc: '可在浏览器中手动执行的大多数操作',
    github: 'puppeteer/puppeteer/tree/main',
    license: 'Apache License 2.0',
    licensePath: 'https://github.com/puppeteer/puppeteer/blob/main/LICENSE',
    home: 'https://pptr.nodejs.cn/guides/what-is-puppeteer',
    tags: ['cron', 'cron-libraries', 'cron-expression', 'quartz-scheduler']
  },
  {
    name: 'cronstrue',
    label: 'cronstrue',
    desc: '通过正则 生成对应规则子串',
    github: 'bradymholt/cronstrue',
    home: 'https://github.com/bradymholt/cronstrue',
    tags: ['cron', 'cron-libraries', 'cron-expression', 'quartz-scheduler']
  },
  {
    name: 'vuedraggable',
    label: 'Vue.Draggable',
    desc: 'vue 拖拽组件',
    github: 'SortableJS/Vue.Draggable',
    home: 'https://sortablejs.github.io/Vue.Draggable/#/simple',
    tags: ['component', 'vue', 'drag-and-drop']
  },
  {
    name: 'vue-draggable-plus',
    label: 'vue-draggable-plus',
    desc: 'vue 拖拽组件',
    github: 'Alfred-Skyblue/vue-draggable-plus',
    home: 'https://vue-draggable-plus.pages.dev/',
    tags: [
      'pescript',
      'vue',
      'drag-and-drop',
      'drag',
      'vue2',
      'draggable',
      'sortablejs',
      'vue3',
      'composition-api'
    ]
  },
  {
    name: 'GSAP',
    label: 'GSAP',
    desc: '工具方法包',
    type: 'Non-Open-Source',
    install: false,
    home: 'https://gsap.com/',
    tags: ['Web动画库', 'animate', 'Non-Open-Source']
  },
  {
    name: 'lodash',
    label: 'lodash',
    desc: '工具方法包',
    github: 'lodash/lodash',
    home: 'https://www.lodashjs.com/',
    license: 'MIT',
    tags: ['javascript', 'modules', 'utilities', 'lodash']
  },
  {
    name: 'http-server',
    label: 'http-server',
    desc: '零配置命令行静态HTTP服务器',
    github: 'http-party/http-server',
    tags: ['http', 'server', 'http-server']
  },
  {
    name: 'zustand',
    label: 'zustand',
    desc: 'React 状态管理',
    github: 'pmndrs/zustand',
    home: 'https://docs.pmnd.rs/zustand/getting-started/introduction',
    tags: [
      'react',
      'redux',
      'hooks',
      'state-management',
      'reactjs',
      'hacktoberfest',
      'react-context'
    ]
  },
  {
    name: 'abandonjs',
    label: 'abandonjs',
    github: 'abandonjs/abandonjs',
    desc: '工具方法包',
    tags: [
      'javascript',
      'typescript',
      'js',
      'npm-package',
      'ts',
      'method',
      'utilities'
    ]
  }
].map(adapter)
