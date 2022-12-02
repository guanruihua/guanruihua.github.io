const package_list = ['abandonjs','rh-mock', 'unit-testing-js']

function buildPackageDom() {
	const layoutContent = document.querySelector('.openSource-layout .content')
	layoutContent.innerHTML = package_list.map(name => {
		return `<div class="package">
					<a href="https://www.npmjs.com/${name}">
						<svg height="32" width="32" viewBox="0 0 700 700" fill="currentColor" aria-hidden="true" style="color: rgb(203, 0, 0);">
							<polygon fill="#cb0000" points="0,700 700,700 700,0 0,0"></polygon>
							<polygon fill="#ffffff" points="150,550 350,550 350,250 450,250 450,550 550,550 550,150 150,150 "></polygon>
						</svg>
					</a>
					
					<a href="https://github.com/guanruihua/${name}">
						<img src="./__assets__/GitHub-Mark-32px.png" alt="package" />
					</a>

					<a href="./OpenSource/${name}/index.html">
						<span>${name}</span>
					</a>
				</div>`
	}).join('')
}

buildPackageDom()