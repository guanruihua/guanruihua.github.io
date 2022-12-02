const search = document.querySelector('.search')
const searchContent = document.querySelector('.search-content')
const searchOptions = document.querySelector('.search-options')

const npmLogo = document.querySelector('.npm-logo>svg')

const ICONMap = {
	github: './__assets__/GitHub-Mark-32px.png',
	npm: npmLogo
}

const packages = [
	{ type: 'npm', name: 'abandonjs', url: 'https://www.npmjs.com/package/abandonjs', },
	{ type: 'npm', name: 'rh-mock', url: 'https://www.npmjs.com/package/rh-mock', },
]

handleSearchChange({ value: '' })

search.addEventListener('focus', () => { searchContent.setAttribute('class', 'search-content is-search') }, true)
searchContent.addEventListener('blur', function (e) {
	// e.preventDefault();
	setTimeout(() => {
		searchContent.setAttribute('class', 'search-content')
	}, 500)
}, true)

function handleSearchChange(e) {
	searchOptions.innerHTML = ''
	const value = e.value
	packages.forEach(item => {
		const { type, name, url } = item
		if (name.indexOf(value) === -1 && value !== '') {
			return
		}
		const dom = document.createElement('div')
		const div = document.createElement('div')
		div.setAttribute('class', 'name')
		const logo = document.createElement('div')
		logo.setAttribute('class', 'logo')
		logo.appendChild(ICONMap[type].cloneNode(true))
		div.innerHTML = name

		dom.onclick = () => { window.location.href = url }

		dom.appendChild(logo)
		dom.appendChild(div)
		searchOptions.appendChild(dom)
	})
}