export const Conf = [
  {
    title: 'ResizeObserver — 监听 DOM 尺寸变化',
    md: `
- 监听 DOM 元素的尺寸变化（宽高、边框盒等），比 \`window.resize\` 更精准高效。

\`\`\`html
<div id="box" style="width: 200px; height: 200px; background: lightblue; resize: both; overflow: auto;"></div>

<script>
const box = document.getElementById('box');
const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { width, height } = entry.contentRect;
    console.log('元素尺寸变化:', width, height);
    // entry.target: 触发变化的DOM元素
    // entry.contentBoxSize: 内容盒尺寸
    // entry.borderBoxSize: 边框盒尺寸
  }
});

// 监听元素
observer.observe(box);

// 停止监听单个元素
// observer.unobserve(box);

// 停止所有监听8
// observer.disconnect();
</script>
\`\`\`

参数说明
- entry.contentRect：等同于getBoundingClientRect()，但不含border/padding。
- entry.borderBoxSize：包含border的尺寸（部分浏览器支持）。

注意
- 不会监听display: none的元素。
- 避免在回调中修改元素尺寸，防止无限循环。

- 兼容性:  ✅ Chrome 64+ | ✅ Firefox 69+ | ✅ Safari 13.1+ | ✅ Edge 79+`,
  },
  {
    title: `IntersectionObserver — 检测元素是否进入视口`,
    md: `
- 异步检测目标元素与视口（或祖先元素）的交叉状态，用于懒加载、曝光统计等。

### 完整示例（图片懒加载）
\`\`\`html
预览
<img data-src="https://example.com/image.jpg" class="lazy-img" alt="延迟加载">

<script>
const images = document.querySelectorAll('.lazy-img');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      // 加载真实图片
      img.src = img.dataset.src;
      // 停止监听
      observer.unobserve(img);
    }
  });
}, {
  root: null, // 根元素，默认视口
  rootMargin: '0px', // 视口扩展/收缩
  threshold: 0.1 // 交叉比例触发回调
});

// 监听所有图片
images.forEach(img => observer.observe(img));
</script>
\`\`\`
关键配置项
root：指定交叉检测的根元素（默认视口）。
threshold：0~1 的数字或数组，表示交叉比例阈值。
rootMargin：视口扩展边距，类似 CSS 的margin。
兼容性
✅ 所有现代浏览器（IE 不支持）
`,
  },
  {
    title: `Page Visibility API — 判断页面是否可见`,
    md: `
检测用户当前是否切换到其他标签页或最小化窗口。
完整示例
\`\`\`javascript
运行
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // 页面隐藏，暂停任务（如视频、轮播）
    console.log('页面已隐藏');
    // 例如：暂停视频、定时器
    // clearInterval(timer);
  } else {
    // 页面可见，恢复任务
    console.log('页面已恢复');
    // 恢复定时器、视频播放
  }
});
属性
document.hidden：true表示页面隐藏。
document.visibilityState：hidden/visible/prerender/unloaded。
兼容性
✅ 所有现代浏览器
\`\`\`
`,
  },
  {
    title: `Web Share API — 调用系统分享面板`,

    md: `
- 唤起系统原生分享菜单（微信、微博、邮件等），生成文本 / 链接 / 文件分享。
完整示例（分享文本 / 链接）
\`\`\`html
<button id="shareBtn">分享文章</button>

<script>
const shareBtn = document.getElementById('shareBtn');
shareBtn.addEventListener('click', async () => {
  // 检测浏览器是否支持
  if (!navigator.share) {
    alert('当前浏览器不支持分享功能');
    return;
  }

  try {
    await navigator.share({
      title: '分享标题',
      text: '快来看看这篇文章！',
      url: location.href // 分享当前页面链接
      // 也可分享文件：files: [blobFile]
    });
    console.log('分享成功');
  } catch (err) {
    console.log('分享失败:', err);
  }
});
</script>
\`\`\`
限制
必须在HTTPS环境下（localhost除外）。
必须由用户手势（如click）触发。
兼容性:
✅ Chrome 61+ | ✅ Edge 79+ | ✅ iOS Safari 12.2+ | ❌ Firefox（部分支持）`,
  },
  {
    title: `Wake Lock API — 防止屏幕熄灭`,
    md: `
- 保持屏幕常亮（适用于阅读、直播、扫码等场景）。

\`\`\`html
<button id="lockBtn">保持屏幕常亮</button>

<script>
let wakeLock = null;
const lockBtn = document.getElementById('lockBtn');

async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('屏幕常亮已开启');

    // 监听释放事件（如页面隐藏时自动释放）
    wakeLock.addEventListener('release', () => {
      console.log('屏幕常亮已释放');
      wakeLock = null;
    });
  } catch (err) {
    console.error('无法获取屏幕常亮锁:', err);
  }
}

lockBtn.addEventListener('click', () => {
  if (wakeLock) {
    wakeLock.release();
    wakeLock = null;
    lockBtn.textContent = '保持屏幕常亮';
  } else {
    requestWakeLock();
    lockBtn.textContent = '取消屏幕常亮';
  }
});

// 页面隐藏时自动释放锁
document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState === 'visible' && wakeLock === null) {
    requestWakeLock();
  } else if (document.visibilityState === 'hidden' && wakeLock) {
    await wakeLock.release();
    wakeLock = null;
  }
});
</script>
\`\`\`
限制
必须HTTPS环境（localhost除外）。
页面隐藏时，锁会自动被释放。
兼容性
✅ Chrome 84+ | ✅ Edge 84+ | ❌ Firefox | ❌ Safari
`,
  },
  {
    title: `BroadcastChannel API — 同源跨标签通信`,
    md: `
- 在同源（域名 + 协议 + 端口）的不同页面 /iframe/Worker 间通信。
完整示例（两个标签页同步登录状态）

\`\`\`javascript
运行
// 所有页面共享同一个频道名
const bc = new BroadcastChannel('login_channel');

// 发送消息（例如登录成功后）
function sendLoginMsg(username) {
  bc.postMessage({ type: 'login', user: username });
}

// 监听消息
bc.onmessage = (event) => {
  if (event.data.type === 'login') {
    alert('其他标签页已登录！');
    // 可刷新UI或跳转到登录页
  }
};

// 关闭频道（页面卸载时）
window.addEventListener('beforeunload', () => {
  bc.close();
});
\`\`\`
特点
消息为结构化克隆（支持对象、数组等）。
不跨域，localStorage无轮询开销。
兼容性
✅ Chrome 54+ | ✅ Firefox 38+ | ✅ Edge 79+ | ❌ Safari（17 + 实验性支持）`,
  },
  {
    title: `PerformanceObserver — 监听性能指标`,
    md: `
订阅性能相关指标（如 LCP、FID、CLS），用于真实用户监控（RUM）。
完整示例（上报 LCP）
\`\`\`javascript
运行
// 监听LCP（最大内容绘制）
function observeLCP() {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    // 取最后一次LCP值（用户可能多次加载）
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime, 'ms');
    // 上报到后端
    // reportToServer({ metric: 'LCP', value: lastEntry.startTime });
  });

  observer.observe({
    entryTypes: ['largest-contentful-paint']
  });
}

// 监听其他指标
// observe({ entryTypes: ['first-input', 'layout-shift', 'navigation'] });
\`\`\`
关键点
buffered: true：获取页面已发生的指标。
需在页面早期注册，避免遗漏指标。
兼容性
✅ 所有现代浏览器 | ❌ IE 不支持
`,
  },
  {
    title: `requestIdleCallback — 在空闲时执行任务`,
    md: `
将低优先级任务（如日志上报、数据预取）安排在浏览器空闲期执行。

\`\`\`javascript
function logData() {
  console.log('执行低优先级任务');
}

// 调度任务
requestIdleCallback((deadline) => {
  // 剩余空闲时间
  while (deadline.timeRemaining() > 0 && tasks.length > 0) {
    const task = tasks.shift();
    task();
  }

  // 如果任务没执行完，继续调度
  if (tasks.length > 0) {
    requestIdleCallback(logData);
  }
}, {
  timeout: 2000 // 超时强制执行（最多等2秒）
});
\`\`\`

注意
不能替代setTimeout(fn, 0)，低优先级任务可能被推迟很久。
Safari 不支持，可用setTimeout(fn, 0)降级。
兼容性
✅ Chrome 47+ | ✅ Firefox 55+ | ❌ Safari`,
  },
  {
    title: `scheduler.postTask — 优先级任务调度（实验性）`,
    md: `
按优先级（user-blocking/user-visible/background）调度任务，避免主线程阻塞。
完整示例
\`\`\`javascript
运行
if (window.scheduler) {
  // 高优先级任务（用户交互相关）
  scheduler.postTask(() => {
    console.log('执行高优先级任务');
  }, { priority: 'user-blocking' });

  // 中优先级（默认）
  scheduler.postTask(() => {
    console.log('执行中优先级任务');
  }, { priority: 'user-visible' });

  // 低优先级（后台任务）
  scheduler.postTask(() => {
    console.log('执行低优先级任务');
  }, { priority: 'background' });
}
\`\`\`
兼容性
✅ Chrome 108+（需开启 Web Platform Flags）`,
  },
  {
    title: `AbortController — 统一取消异步操作`,
    md: `
提供统一方式取消fetch、setTimeout、自定义Promise等异步操作。
完整示例（取消 fetch）
\`\`\`javascript
const controller = new AbortController();
const signal = controller.signal;

// 5秒后取消请求
setTimeout(() => controller.abort(), 5000);

fetch('/api/data', { signal })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('请求被取消');
    } else {
      console.error('请求失败:', err);
    }
  });
扩展
所有接受signal的 API 都可取消，例如addEventListener(signal)。
兼容性
✅ 所有现代浏览器 `,
  },
  {
    title: `ReadableStream — 流式读取数据（响应式）`,
    md: `分块、异步方式读取数据，避免一次性加载大文件导致内存溢出，常用于处理fetch响应、实时日志、视频流等。
完整示例：逐块读取并显示文本
\`\`\`html
<button id="readBtn">读取文本</button>
<div id="output" style="width: 300px; height: 300px; border: 1px solid #ccc; overflow: auto;"></div>

<script>
const readBtn = document.getElementById('readBtn');
const output = document.getElementById('output');

readBtn.addEventListener('click', async () => {
  try {
    const response = await fetch('/large-text.txt');
    if (!response.body) throw new Error('ReadableStream not supported');

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8'); // 将Uint8Array转为字符串
    let receivedLength = 0;
    let result = '';

    while (true) {
      const { done, value } = await reader.read(); // value是Uint8Array
      if (done) break;

      // 解码并追加文本
      const chunk = decoder.decode(value, { stream: true });
      result += chunk;
      receivedLength += value.length;

      // 实时更新页面（避免一次性渲染大量文本）
      if (receivedLength > 5000) {
        output.textContent = result;
        receivedLength = 0; // 主动清空后继续更新
      }
    }
    output.textContent = result;
  } catch (err) {
    console.error('读取失败:', err);
    output.textContent = \`读取失败：\${err.message}\`;
  }
});
</script>
\`\`\`
关键点
reader.read()返回{ done: boolean, value: Uint8Array }。
TextDecoder配合{ stream: true }处理多字节字符。
reader.cancel()可中断读取。
兼容性
✅ Chrome 43+ | ✅ Firefox 65+ | ✅ Safari 10.1+ | ✅ Edge 79+`,
  },
  {
    title: `WritableStream — 流式写入数据`,
    md: `
将数据分块写入目标（文件、网络、内存），适用于上传、生成文件、实时保存草稿。
完整示例：创建可下载的流式文本文件
html
预览
<button id="saveBtn">保存文件</button>

<script>
const saveBtn = document.getElementById('saveBtn');
let writableFileHandle = null;

// 打开文件（需用户手势触发）
saveBtn.addEventListener('click', async () => {
  if (!window.showSaveFilePicker) {
    alert('当前浏览器不支持文件系统API');
    return;
  }

  try {
    if (!writableFileHandle) {
      // 打开文件选择器
      writableFileHandle = await window.showSaveFilePicker({
        suggestedName: 'test.txt',
        types: [{ description: 'Text Files', accept: { 'text/plain': ['.txt'] } }]
      });
    }

    // 创建可写流
    const writableStream = await writableFileHandle.createWritable();
    const writer = writableStream.getWriter();

    // 分块写入数据
    for (let i = 0; i < 10; i++) {
      await writer.write(new TextEncoder().encode(\`第\${i}行文本\n\`));
    }

    // 关闭流
    await writer.close();
    alert('文件已保存');
  } catch (err) {
    console.error('保存失败:', err);
  }
});
</script>
\`\`\`
限制
必须HTTPS环境。
必须用户手势（如click）触发。
兼容性
✅ Chrome 86+ | ✅ Edge 86+ | ❌ Firefox | ❌ Safari`,
  },
  {
    title: `Clipboard API — 安全读写剪贴板`,
    md: `
异步读写剪贴板内容，替代不安全的document.execCommand('copy')。
\`\`\`html
<button id="copyBtn">复制文本</button>
<button id="pasteBtn">粘贴文本</button>
<div id="result"></div>

<script>
const copyBtn = document.getElementById('copyBtn');
const pasteBtn = document.getElementById('pasteBtn');
const result = document.getElementById('result');

// 复制文本
copyBtn.addEventListener('click', async () => {
  const text = '要复制的文本内容';
  try {
    await navigator.clipboard.writeText(text);
    result.textContent = '复制成功：' + text;
  } catch (err) {
    console.error('复制失败:', err);
    result.textContent = '复制失败：' + err.message;
  }
});

// 粘贴文本
pasteBtn.addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText();
    result.textContent = '粘贴成功：' + text;
  } catch (err) {
    console.error('粘贴失败:', err);
    result.textContent = '粘贴失败：' + err.message;
  }
});
</script>
\`\`\`
权限
仅用户手势（如click）触发。
读取剪贴板需要额外权限（Chrome 会自动许可，Safari 可能弹窗）。
兼容性
✅ Chrome 66+ | ✅ Firefox 63+ | ✅ Safari 13.1+ | ✅ Edge 79+`,
  },
  {
    title: `URLSearchParams — 解析 / 构建 URL 参数`,
    md: `
解析、修改、序列化 URL 查询字符串。
完整示例
\`\`\`javascript
运行
// 从当前URL解析参数
const params = new URLSearchParams(window.location.search);

// 获取参数
const id = params.get('id');
const page = params.get('page');

// 修改参数
params.set('page', '2'); // 设置参数
params.append('tag', 'js'); // 追加参数（同名多值）
params.delete('oldParam'); // 删除参数

// 序列化为字符串
console.log(params.toString()); // "id=1&page=2&tag=js"

// 遍历参数
for (const [key, value] of params) {
  console.log(key, value);
}
方法
get(key)/set(key, value)/append(key, value)/delete(key)
has(key)/entries()/keys()/values()
\`\`\`
兼容性
✅ 所有现代浏览器（IE 不支持）`,
  },
  {
    title: `structuredClone — 原生深拷贝`,
    md: `
深拷贝对象，支持对象、数组、Date、Map、Set、Blob 等，比手动实现更高效。

\`\`\`javascript

const obj = {
  name: 'test',
  data: [1, 2, 3],
  nested: { a: 1 },
  date: new Date(),
  map: new Map([['key', 'val']])
};

// 深拷贝
const cloned = structuredClone(obj);

console.log(cloned === obj); // false（不同对象）
console.log(cloned.nested === obj.nested); // false（嵌套对象也拷贝）
console.log(cloned.date === obj.date); // false（Date对象也拷贝）
console.log(cloned.map === obj.map); // false（Map对象也拷贝）
\`\`\`
不支持类型
函数、Generator、Symbol、Error、DOM 节点等。
兼容性
✅ Chrome 98+ | ✅ Firefox 94+ | ✅ Safari 15.4+ | ✅ Edge 98+`,
  },
  {
    title: `Intl.NumberFormat — 国际化数字格式化`,
    md: `
格式化数字、货币、百分比，适配不同地区文化习惯。
完整示例
\`\`\`javascript
运行
// 格式化数字（千分位）
console.log(new Intl.NumberFormat('zh-CN').format(1234567.89));
// "1,234,567.89"

// 格式化货币
console.log(new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'CNY'
}).format(99.9));
// "¥99.90"

// 格式化百分比
console.log(new Intl.NumberFormat('zh-CN', {
  style: 'percent',
  minimumFractionDigits: 2
}).format(0.1234));
// "12.34%"

// 格式化带单位的数字（如文件大小）
console.log(new Intl.NumberFormat('zh-CN', {
  style: 'unit',
  unit: 'megabyte'
}).format(500));
// "500 MB"
\`\`\`
兼容性
✅ 所有现代浏览器 | ✅ IE 11（部分支持）`,
  },
  {
    title: `EyeDropper API — 屏幕取色工具`,
    md: `
调用系统原生取色器，获取屏幕任意位置的像素值。

\`\`\`html
<button id="pickBtn">取色</button>
<div id="colorResult" style="width: 100px; height: 100px; margin-top: 10px;"></div>

<script>
const pickBtn = document.getElementById('pickBtn');
const colorResult = document.getElementById('colorResult');

pickBtn.addEventListener('click', async () => {
  if (!window.EyeDropper) {
    alert('当前浏览器不支持取色功能');
    return;
  }

  try {
    const eyeDropper = new EyeDropper();
    const result = await eyeDropper.open();
    const color = result.sRGBHex; // 格式如 #RRGGBB
    colorResult.style.backgroundColor = color;
    console.log('取色结果:', color);
  } catch (err) {
    // 用户取消取色时会触发AbortError
    if (err.name === 'AbortError') {
      console.log('用户取消了取色');
    } else {
      console.error('取色失败:', err);
    }
  }
});
</script>
\`\`\`
兼容性
✅ Chrome 95+ | ✅ Edge 95+ | ❌ Firefox | ❌ Safari`,
  },
  {
    title: `VideoEncoder API — 视频编码`,
    md: `
- 将视频帧编码为压缩视频流（如 H.264、VP9），适用于 Web 端实时录制、视频编辑等场景。
完整示例（伪代码，简化流程）
\`\`\`javascript
// 需在安全上下文（HTTPS/localhost）使用
if (!window.VideoEncoder) {
  alert('当前浏览器不支持视频编码API');
  return;
}

// 配置编码器
const encoderConfig = {
  codec: 'avc1.42E01E', // H.264 Baseline Profile
  width: 1280,
  height: 720,
  bitrate: 5_000_000, // 5Mbps
  framerate: 30
};

// 创建编码器
const encoder = new VideoEncoder({
  output: (chunk, metadata) => {
    // 处理编码后的视频块（如写入文件、上传服务器）
    console.log('收到编码块:', chunk.byteLength, 'bytes');
    // chunk: EncodedVideoChunk
    // metadata: 包含关键帧信息等
  },
  error: (err) => {
    console.error('编码错误:', err);
  }
});

// 初始化编码器
encoder.configure(encoderConfig);

// 从canvas获取视频帧并编码
const canvas = document.getElementById('videoCanvas');
const ctx = canvas.getContext('2d');

function captureFrame(timestamp) {
  // 绘制内容到canvas（示例）
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 创建视频帧
  const frame = new VideoFrame(canvas, { timestamp });

  // 编码帧
  encoder.encode(frame, { keyFrame: timestamp % 150 === 0 }); // 每5秒关键帧
  frame.close(); // 释放帧资源

  // 继续捕获
  requestAnimationFrame(captureFrame);
}

// 开始捕获
requestAnimationFrame(captureFrame);

// 结束编码时
// encoder.flush();
// encoder.close();
\`\`\`
兼容性
✅ Chrome 94+ | ✅ Edge 94+ | ❌ Firefox | ❌ Safari`,
  },
  {
    title: 'VideoDecoder 原生硬解码音视频',
    md: `
- 原生硬解码音视频，4K 60 帧流畅播放，CPU 占用直降。

\`\`\`js
const decoder = new VideoDecoder({
  output: frame => ctx.drawImage(frame, 0, 0),
  error: console.error
});
decoder.configure({ codec: 'vp09.00.10.08' });
\`\`\`
    `
  },
  {
    title: `Background Fetch (PWA) 后台静默下载`,
    md: ` PWA 后台静默下载，断网恢复继续，课程视频提前缓存。
\`\`\`js
await registration.backgroundFetch.fetch('video', ['/course.mp4']);
\`\`\`
    `
  }
]
