const modulesDom = document.querySelector('.modules-content')

const modules = [
	"Front-End",
	"JavaScript",
	"CSS",
	"Back-End",
	"Data",
	"Database", "HTML", "Knowledge-Reserve", "OpenSource", "React", "Tool",
	"TypeScript"
]
/**
 
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![npm version](https://img.shields.io/npm/v/fakingjs.svg?style=flat)](https://www.npmjs.com/package/fakingjs)

 */

const packages = [
	{
		type: 'npm',
		name: 'abandonjs',
		npm: 'https://www.npmjs.com/abandonjs',
		git: 'https://github.com/abandonjs/abandonjs',
	},
	{ type: 'npm', name: 'unit-testing-js', url: 'https://www.npmjs.com/package/unit-testing-js', },
	{ type: 'npm', name: 'fakingjs', url: 'https://www.npmjs.com/package/fakingjs', },
	{
		type: 'npm', name: 'check-it-type',
		url: 'https://www.npmjs.com/package/fakingjs',
		git: 'https://github.com/abandonjs/check-it-type',
		docs: 'https://github.com/abandonjs/check-it-type'
	},
]

function buildPackage() {
	packages.forEach(item => {
		const { name } = item
		const {
			type, url, docs,
			npm = `https://www.npmjs.com/package/${name}`,
			git = `https://github.com/guanruihua/${name}`
		} = item
		const dom = document.createElement('div')
		dom.setAttribute('class', 'content')
		dom.innerHTML = `
					<div class="logo unit">
						<a href="${npm}" target="_blank">
							<svg height="32" width="32" viewBox="0 0 700 700" fill="currentColor" aria-hidden="true" style="color: rgb(203, 0, 0);">
								<polygon fill="#cb0000" points="0,700 700,700 700,0 0,0"></polygon>
								<polygon fill="#ffffff" points="150,550 350,550 350,250 450,250 450,550 550,550 550,150 150,150 "></polygon>
							</svg>
						</a>
						<a href="${git}" target="_blank">
							<img src="./__assets__/GitHub-Mark-32px.png" alt="package" />
						</a>
					</div>
					<a class="msg" href="${docs || `./OpenSource/${name}/index.html`}" target="_blank">
						<div>
							<div>${name}</div>
							<div>
								<img class="tag" src="https://img.shields.io/badge/license-MIT-blue.svg" alt='license'/>
								<img class="tag" src="https://img.shields.io/npm/v/${name}.svg?style=flat" alt='version'/>
							</div>
						</div>
					</a>`
		modulesDom.appendChild(dom)
	})
}
function buildModulesDom(dom) {

	modules.forEach(name => {
		const itemDom = document.createElement('div')
		itemDom.setAttribute('class', 'content')
		itemDom.setAttribute('title', name)

		itemDom.innerHTML = `
			<div class='logo'>${name[0]}</div>
			<div class='msg'>${name}</div>`

		itemDom.onclick = () => {
			window.location.href = '/' + name + '/index.html'
		}
		dom.appendChild(itemDom)
	})

	const tempDom = document.createElement('div')
	tempDom.setAttribute('class', 'content')
	tempDom.setAttribute('title', 'Demo')

	tempDom.innerHTML = `
			<div class='logo'>${'D'}</div>
			<div class='msg'>${'Demo'}</div>`

	tempDom.onclick = () => {
		window.location.href = 'https://ruihuag-demo.github.io/'
	}
	dom.appendChild(tempDom)
}

buildModulesDom(modulesDom)
buildPackage()