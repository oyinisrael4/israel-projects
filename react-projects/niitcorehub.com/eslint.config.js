import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        files: ["**/*.{js,jsx}"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                window: "readonly",
                document: "readonly",
                navigator: "readonly",
                localStorage: "readonly",
                sessionStorage: "readonly",
                console: "readonly",
                setTimeout: "readonly",
                clearTimeout: "readonly",
                setInterval: "readonly",
                clearInterval: "readonly",
                process: "readonly",
            },
        },
        rules: {
            "no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
            "no-undef": "off",
            "no-empty": "warn",
        },
    },
    {
        ignores: ["dist/**", "node_modules/**", "public/**", "screenshots/**"],
    },
];
