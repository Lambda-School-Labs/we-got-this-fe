module.exports = {
	setupFilesAfterEnv: [
		'@testing-library/jest-dom/extend-expect',
		'jest-axe/extend-expect',
	],
	moduleDirectories: ['node_modules', 'test'],
	collectCoverageFrom: ['**/src/**/*.js'],
	coverageThreshold: {
		global: {
			statements: 8,
			branches: 4,
			functions: 4,
			lines: 4,
		},
	},
};
