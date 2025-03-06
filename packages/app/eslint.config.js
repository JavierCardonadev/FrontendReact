import eslintPluginReact from "eslint-plugin-react";

export default [
    {
        files: ["**/*.{js,jsx,ts,tsx}"], // Archivos a analizar
        ignores: ["node_modules", "dist", "build"], // Directorios ignorados
    },
    {
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "module",
        },
        plugins: {
            react: eslintPluginReact,
        },
        rules: {
            "no-console": "warn",
            "react/prop-types": "off",
        },
    },
];