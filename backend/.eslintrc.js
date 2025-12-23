module.exports = {
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	parserOptions: {
		project: ['./tsconfig.json'],
		ecmaVersion: 2023,
		sourceType: 'module',
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true
		}
	},
	parser: '@typescript-eslint/typescript-estree',
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	rules: {
		'@typescript-eslint/no-unused-vars':'off',
		'no-empty-pattern': 'off',
		'prefer-rest-params': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	}
}