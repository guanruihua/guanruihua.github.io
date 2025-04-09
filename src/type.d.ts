declare module '*.less' {
	const resource: { [key: string]: string };
	export = resource;
}

declare module '*.module.less' {
	const resource: { [key: string]: string };
	export = resource;
}

declare module 'opencc-js'

declare module '*.svg'
declare module '*.json'
declare module '*.png'
declare module '*.jpeg'
declare module '*.md' {
	const md: string
	export = md
}

declare module '*.txt' {
	const txt: string
	export = txt
}