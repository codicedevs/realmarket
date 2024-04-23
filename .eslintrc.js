module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		// 'standard',
		'eslint-config-prettier',
		'plugin:@typescript-eslint/recommended',  // Usa las reglas recomendadas de @typescript-eslint
	],
	overrides: [],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'react/prop-types': 'off',
		'camelcase': 'off',
		'react/jsx-uses-react': 1,
		'react/jsx-key': 'off',
		"react/jsx-filename-extension": [ "warn", {"extensions": [".tsx"]} ]
	},
	settings: {
		react: {
			version: 'detect',
		},
	}
};
