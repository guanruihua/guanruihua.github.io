import { Conf } from './type'

export const conf: Conf = {
  items: [
    {
      name: 'note',
      label: 'Note',
      url: 'ruihuag-note.github.io/',
      style: {
        background:
          'radial-gradient(ellipse at right top, #5756CD 0%, #151419 47%, #151419 100%)',
      },
    },
    {
      name: 'pkg',
      label: 'Package',
      style: {
        background:
          'radial-gradient(ellipse at right top, #107667ed 0%, #151419 47%, #151419 100%)',
      },
    },
    {
      name: 'tool',
      label: 'Tool',
      style: {
        background:
          'radial-gradient(ellipse at right top, #a63d2a82 0%, #151419 47%, #151419 100%)',
      },
    },
    // {
    //   name: 'dev',
    //   label: 'Dev',
    //   style: {
    //     background:
    //       'radial-gradient(ellipse at right top, #00458f8f 0%, #151419 45%, #151419 100%)',
    //   },
    // },
    {
      name: 'study',
      label: 'Study',
      style: {
        background:
          'radial-gradient(ellipse at right top, #00458f8f 0%, #151419 45%, #151419 100%)',
      },
    },
  ],

  guide: [
    {
      name: '翻译',
      next: [
        ['百度翻译', 'fanyi.baidu.com', 'translate baidu fanyi'],
        ['Google翻译', 'translate.google.com', 'translate google fanyi'],
        [
          '微软翻译',
          'www.bing.com/translator',
          'translate bing microsoft fanyi',
        ],
        ['DeepL', 'www.deepl.com/zh/translator', 'translate deepl fanyi'],
      ],
    },
    {
      name: 'Web',
      next: [
        ['MDN Web Docs', 'developer.mozilla.org/zh-CN/'],
        ['Can I use', 'caniuse.com/', 'css caniuse'],
        ['Dribbble', 'dribbble.com'],
        ['UI Verse', 'uiverse.io/'],
        ['Gradient Color', 'webgradients.com/'],
        ['Awwwards', 'www.awwwards.com/'],
        [
          'Muse Dashboard',
          'demos.creative-tim.com/muse-vue-ant-design-dashboard/?_ga=2.68675601.1846298967.1721030274-1292199187.1699498388#/dashboard',
        ],
        [
          'Hyper Dashboard',
          'coderthemes.com/hyper/saas/dashboard-analytics.html',
        ],
      ],
    },
    {
      name: 'UI 组件库',
      next: [
        [
          'Antd',
          'ant-design.antgroup.com/components/overview-cn',
          'React UI Component ',
        ],
        ['Element Plus', 'element-plus.org/zh-CN/component/overview.html'],
        ['EChart', 'echarts.apache.org/examples/zh/index.html'],
        ['EChart Api', 'echarts.apache.org/zh/api.html#echarts'],
        ['AntV G6', 'https://g6.antv.antgroup.com/examples'],
        [
          'APEX Charts',
          'www.apexcharts.com/javascript-chart-demos/line-charts/basic/',
        ],
        ['iconify', 'icon-sets.iconify.design'],
        ['Remix Icon', 'remixicon.com'],
        ['NavNav', 'thuvien.org/navnav'],
        // ['',''],
      ],
    },
    {
      name: 'WebGL',
      next: [
        ['three.js', 'threejs.org/manual/#zh/fundamentals'],
        ['three.js 中文网', 'http://www.webgl3d.cn/pages/aac9ab/'],
        ['fabricjs', 'fabricjs.com/api'],
        ['PixiJS', 'pixijs.com/'],
        ['Sketchfab·3D Models', 'sketchfab.com/'],
        [
          'Fab·Free 3D Models',
          'www.fab.com/category/3d-model?q=tree&is_free=1',
        ],
        ['Konva·H5 Canvas ', 'konvajs-doc.bluehymn.com'],
        // ['',''],
      ],
    },
    {
      name: '技术社区',
      next: [
        ['掘金', 'juejin.cn/'],
        ['Code Pen', 'codepen.io'],
        ['思否', 'segmentfault.com/'],
        ['开源中国( OSChina )', 'www.oschina.net'],
        ['Stack Overflow', 'stackoverflow.com'],
        ['github', 'github.com'],
        // ['',''],
      ],
    },
    {
      name: '综合',
      next: [
        ['B站', 't.bilibili.com/?tab=video'],
        ['知乎', 'www.zhihu.com/hot'],
        ['今日热榜', 'hot.imsyy.top/#/'],
        ['百度热搜', 'top.baidu.com/board?tab=realtime'],
        ['七麦数据', 'https://www.qimai.cn/rank'],
        ['音乐 ZZ123', 'zz123.com/'],
        ['极客湾移动芯片排行', 'www.socpk.com/'],
        ['摸鱼岛', 'fish.codebug.icu'],
        ['摸鱼派', 'fishpi.cn/'],
        ['LKs 网站推荐合集', 'lkssite.vip/'],
        ['冰山图表', 'icebergcharts.com/'],
      ],
    },
    {
      name: 'AI',
      next: [
        ['deepseek', 'chat.deepseek.com'],
        ['元宝', 'yuanbao.tencent.com'],
        ['ChatGPT', 'chatgpt.com'],
        ['Poe', 'poe.com'],
        ['魔塔社区·模型库', 'www.modelscope.cn/models'],
        ['Hugging Face', 'huggingface.co/'],
        // ['',''],
      ],
    },
    {
      name: '邮箱',
      next: [
        ['QQ邮箱', 'mail.qq.com/?cancel_login=true&from=session_timeout'],
        ['Outlook', 'partner.outlook.cn/mail/'],
      ],
    },
    {
      name: '工具 / 资源',
      next: [
        ['Alpha Coders 壁纸', 'alphacoders.com/', 'wallpaper'],
        ['致美化(主题,壁纸)', 'zhutix.com/'],
        ['插画, 漫画, 小说', 'www.pixiv.net/'],
        ['图片压缩zippic', 'www.zippic.cn/'],
      ],
    },
    {
      name: '编程工具(集)',
      next: [
        [
          'Regulex',
          'jex.im/regulex/#!flags=&re=%5E(0-9)(a%7Cb%7Cc)*%3F%24',
          'regulex regular',
        ],
        [
          'transform(结构转换)',
          'transform.tools/json-to-typescript',
          'transform type model',
        ],
        [
          'Autoprefixer CSS online',
          'autoprefixer.github.io',
          'css autoprefixer',
        ],
        ['JSON可视化', 'jsoncrack.com/editor', 'JSON, json-preview'],
        ['压缩/格式化工具', 'coding.tools/cn', 'inline-tool tools'],
        ['UU在线工具', 'uutool.cn/type/new/', 'inline-tool tools'],
        ['30TOOL', 'www.30aitool.com/', 'inline-tool tools'],
        ['json.cn', 'www.json.cn/'],
        ['开发者武器库', 'devtool.tech/'],
      ],
    },
    {
      name: 'ACG',
      next: [
        ['原神', 'www.miyoushe.com/ys'],
        [
          '原神地图',
          'act.mihoyo.com/ys/app/interactive-map/index.html?bbs_presentation_style=no_header&lang=zh-cn&utm_source=bbs&utm_medium=mys&utm_campaign=pcicon&_markerFps=24#/map/2?shown_types=2,3,154,517,658,659,626,356,17,44,45,269,70,64,77,69,597,600,667,668,680,596,410',
        ],
        ['玉衡杯数据库', 'homdgcat.wiki'],
        ['Honey Impact', 'gensh.honeyhunterworld.com/?lang=CHS'],
        ['崩坏: 星穹铁道', 'www.miyoushe.com/sr'],
        ['绝区零', 'www.miyoushe.com/zzz/'],
        ['萌娘百科', 'mzh.moegirl.org.cn'],
        ['次元小镇', 'dimtown.com/'],
        ['TouchGal', 'www.touchgal.io/'],
      ],
    },
    {
      name: 'Platform',
      next: [
        ['npmjs', 'www.npmjs.com'],
        ['deepseek', 'platform.deepseek.com/usage'],
      ],
    },
  ],
}
