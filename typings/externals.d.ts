declare module '*.less' {
	const resource: { [key: string]: string };
	export = resource;
}

declare module '*.module.less' {
	const resource: { [key: string]: string };
	export = resource;
}

declare module '*.svg'
declare module '*.json'
declare module '*.png'
declare module '*.md' {
	const md: string
	export = md
}

declare module '*.txt' {
	const md: string
	export = md
}