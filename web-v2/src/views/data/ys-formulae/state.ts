import { useLoadJS } from '@/hook'

export const usePageState = () => {
  // useLoadJS('/js/mathjax/3.2.2/mathjax.js', () => {
  //   window.MathJax = {
  //     loader: {
  //       load: [
  //         'input/tex-base', // 必备基础库
  //         'output/chtml', // 必备基础库，用来将tex转换成html
  //       ],
  //     },
  //     tex: {
  //       tex: {
  //         inlineMath: [
  //           // inlineMath是一个数组，用来指定行内公式的起始符号和结束符号
  //           ['$', '$'],
  //           ['\\(', '\\)'],
  //         ],

  //         displayMath: [
  //           // displayMath是一个数组，用来指定行间公式的起始符号和结束符号
  //           ['$$', '$$'],
  //           ['\\[', '\\]'],
  //         ],
  //         // packages是一个数组，用来指定需要加载的宏包，base是必须的，其他的都是可选的
  //         packages: ['base'],
  //       },
  //       loader: {load: ['[tex]/ams']}
  //     },
  //   }
  // })
  return {}
}
