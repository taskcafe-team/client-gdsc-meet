module.exports = {
	root: true,
	ignorePatterns: ['webpack.config.js', 'env/**/*', 'config/**/*', 'dist/**/*'],
	extends: [
		'.eslintrc-auto-import.json',
		'airbnb-typescript',
		'airbnb/hooks',
		'plugin:@typescript-eslint/recommended',
		// 'plugin:jest/recommended',
		'plugin:prettier/recommended',
		'eslint:recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:import/errors',
		'plugin:import/warnings',
		'prettier',
	],
	plugins: ['react', '@typescript-eslint/eslint-plugin'],
	env: {
		browser: true,
		es6: true,
		node: true,
		// jest: true,
	},
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
		NodeJS: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		parser: { js: 'espree', jsx: 'espree', '<template>': 'espree' },
		ecmaFeatures: { jsx: true, tsx: true },
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json',
	},
	rules: {
		'linebreak-style': 'off',
		'prettier/prettier': ['error', { endOfLine: 'auto' }],
		'@typescript-eslint/naming-convention': 'off',
		'no-unused-vars': 'off',
		'no-redeclare': 'off',
		'@typescript-eslint/no-redeclare': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'react-hooks/rules-of-hooks': 'off', //TODO : change to warn
		'react-hooks/exhaustive-deps': 'off', //TODO : change to warn
	},
	settings: {
		'import/resolver': {
			'eslint-import-resolver-custom-alias': {
				alias: {
					'': './src',
					'_/*': '../*',
					'assets/*': ['./src/assets/*'],
					'config/*': ['./src/config/*'],
					'pages/*': ['./src/views/pages/*'],
					'components/*': ['./src/views/components/*'],
					'utils/*': ['./src/utils/*'],
					'api/*': ['./src/api/*'],
					'contexts/*': ['./src/contexts/*'],
					'hooks/*': ['./src/hooks/*'],
				},
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
}
