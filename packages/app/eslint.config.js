export default [
    {
        files: ["**/*.{js,jsx,ts,tsx}"], // Archivos que ESLint debe analizar
        ignores: ["node_modules", "dist", "build"], // Directorios que ESLint debe ignorar
    },
    {
        languageOptions: {
            ecmaVersion: "latest", // Selecciona la versión de ECMAScript
            sourceType: "module",  // Soporte para módulos de ECMAScript
        },
        rules: {
            "no-unused-vars": "warn", // Ejemplo de regla
            "no-console": "off", // Ejemplo de regla
        },
    },
];