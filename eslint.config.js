import eslintPluginReact from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
export default [
    {
        ignores: [
            'node_modules',
            '/dist/**',
        ],
    },
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            parser: typescriptParser, // Si usas TypeScript
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        plugins: {
            react: eslintPluginReact,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off',
        },
    },
];
