// import { loader } from '@monaco-editor/react'

// // 在组件外初始化 Monaco Vue 支持
// loader.init().then((monaco) => {
//   // 注册 Vue 语言（需先安装 monaco-vue）
//   monaco.languages.register({ id: 'vue' })
//   monaco.languages.setMonarchTokensProvider('vue', {
//     defaultToken: '',
//     tokenPostfix: '.vue',
//     // 简化的 Vue 语法高亮规则（实际需更复杂配置）
//     keywords: ['template', 'script', 'style'],
//     typeKeywords: ['setup', 'lang'],
//     escapes: /\\./,
//     tokenizer: {
//       root: [
//         [/<template>/, 'keyword'],
//         [/<\/template>/, 'keyword'],
//         [/<script>/, 'keyword'],
//         [/<\/script>/, 'keyword'],
//         [/<style>/, 'keyword'],
//         [/<\/style>/, 'keyword'],
//       ],
//     },
//   })
// })

/**
 * @description 文件扩展名 -> Monaco 语言映射
 * @param {string} filePath
 * @returns {string}
 */
export const getLanguageFromFile = (filePath: string = '') => {
  const extension = filePath.split('.').at(-1)?.toLowerCase()
  switch (extension) {
    case 'js':
    case 'jsx':
      return 'javascript'
    case 'ts':
    case 'tsx':
      return 'typescript'
    case 'vue':
      return 'html' // 或使用 vue 语言（需配置 monaco-vue）
      // return 'vue'
    case 'css':
      return 'css'
    case 'json':
      return 'json'
    case 'html':
      return 'html'
    default:
      return 'javascript' // 默认回退
  }
}

/**
 async function getSortedVersions(packageName) {
  const response = await fetch(`https://registry.npmjs.org/${packageName}`);
  const data = await response.json();
  const versions = Object.keys(data.versions);
  return versions.sort((a, b) => {
    return a.localeCompare(b, undefined, { numeric: true });
  });
}

// 使用示例
getSortedVersions('vue').then(versions => {
  console.log('Vue 所有版本（排序后）:', versions);
});
 */