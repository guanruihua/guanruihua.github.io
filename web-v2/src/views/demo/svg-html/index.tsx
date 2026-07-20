import './index.less'

// [✨ 你知道吗？SVG 里藏了一个「任意门」——它就是 foreignObject！ 🚪💫SVG 的 <foreign - 掘金](https://juejin.cn/post/7551253035160797227)

export default function SVG_Html() {
  return (
    <div className="demo__svg-html">
      <div className="h1">使用foreignObject</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 300"
        width={400}
        height={300}
      >
        <rect x="0" y="0" width="400" height="300" fill="#ffffff10" />
        <circle cx="100" cy="100" r="50" fill="blue" />

        <foreignObject x="150" y="50" width="200" height="200">
          <div>
            <div
              style={{ fontFamily: 'Arial', fontSize: '18px', color: 'black' }}
            >
              <h1>Hello HTML!</h1>
              <p>
                This is <strong>HTML content</strong> rendered <em>inside</em>{' '}
                an SVG!
              </p>
              <button
                style={{
                  padding: 10,
                  border: '2px solid #00000080',
                  borderRadius: 12,
                }}
                onClick={() => alert('Clicked!')}
              >
                甚至可以用按钮
              </button>
            </div>
          </div>
        </foreignObject>
      </svg>
    </div>
  )
}
