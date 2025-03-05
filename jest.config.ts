import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest', // Usa ts-jest como el transformador para TypeScript
    testEnvironment: 'jsdom', // Necesario porque estás testeando JSX/React
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // Transforma archivos .ts y .tsx
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    testMatch: ['**/?(*.)+(spec|test).(ts|tsx)'], // Encuentra tus tests
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.base.json', // Asegúrate de apuntar al archivo tsconfig correcto
        },
    },
};

export default config;