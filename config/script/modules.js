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

}

buildModulesDom(modulesDom)