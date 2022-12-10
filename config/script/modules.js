const modulesDom = document.querySelector('.modules-content')



function buildModulesDom(dom) {
	const __map__ = {
		'Back-End': ['BE', 'End'],
		'CSS': ['CS', 'CSS'],
		'Data': ['DA', 'Data'],
		'Database': ['DB', 'base'],
		'Front-End': ['FE', 'End'],
		'HTML': ['HT', 'HTML'],
		'JavaScript': ['JS', 'Script'],
		'Knowledge-Reserve': ['KR','ledge'],
		'OpenSource': ['OS', 'Source'],
		'React': ['RE', 'React'],
		'Tool': ['TO', 'Tool'],
		'TypeScript': ['TS', 'Script'],
		get: function(name, index){
			if (this[name])
				return this[name][index]
			else
				return name
		}
	}
	console.log(modules)
	modules.forEach(name => {
		const _name = name.split('-').join('\n')
		const itemDom = document.createElement('div')
		itemDom.setAttribute('title', _name)
		// itemDom.setAttribute('data-word', _name)
		itemDom.setAttribute('data-word', __map__.get(name, 0))
		itemDom.innerText = _name
		// itemDom.innerText = __map__.get(name, 1)
		itemDom.onclick = () => {
			window.location.href = '/' + name + '/index.html'
		}
		dom.appendChild(itemDom)
	})
}

buildModulesDom(modulesDom)
