import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
    globalIgnores([
        "**/public",
        "**/static",
        "**/.cache",
        "**/content",
        ".pnp.cjs",
        ".pnp.loader.mjs",
        "**/.yarn",
    ]),

    js.configs.recommended,

    // Parse JSX everywhere we use it.
    {
        files: ["**/*.{js,jsx}"],
        plugins: {
            react,
            "jsx-a11y": jsxA11Y,
        },
        settings: {
            react: {
                // Yarn PnP can make autodetection noisy; pin to the installed React major.
                version: "18.2.0",
            },
        },
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            // Espree can parse JSX without Babel.
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
    },

    // Treat JSX identifiers as “used” (prevents false `no-unused-vars` for components).
    react.configs.flat.recommended,

    // Repo-specific rule overrides.
    {
        files: ["**/*.{js,jsx}"],
        rules: {
            "no-else-return": "off",
            "prefer-destructuring": "off",

            "react/no-did-update-set-state": "off",
            "react/prefer-stateless-function": "off",
            "react/prop-types": "off",
            "react/no-danger": "off",
            "react/button-has-type": "off",
            "react/jsx-filename-extension": "off",
            "react/no-array-index-key": "off",
            "react/destructuring-assignment": "off",
            "react/jsx-curly-brace-presence": "off",
            "react/jsx-one-expression-per-line": "off",
            "react/jsx-pascal-case": ["error", { "ignore": ["SEO", "TOC"] }],

            "jsx-a11y/click-events-have-key-events": "off",
            "jsx-a11y/no-static-element-interactions": "off",
            "jsx-a11y/accessible-emoji": "off",
            "jsx-a11y/label-has-associated-control": "off",
            "jsx-a11y/label-has-for": "off",

            "jsx-a11y/anchor-is-valid": [
                0,
                {
                    components: ["Link"],
                    specialLink: ["hrefLeft", "hrefRight", "to"],
                    aspects: ["noHref", "invalidHref", "preferButton"],
                },
            ],
        },
    },

    // Node/CommonJS files (Gatsby build/runtime on Node).
    {
        files: ["gatsby-config.js", "gatsby-node.js", "gatsby-ssr.js", "data/**/*.js"],
        languageOptions: {
            // Gatsby’s `gatsby-*.js` files are CommonJS.
            sourceType: "script",
            globals: {
                module: "readonly",
                exports: "readonly",
                require: "readonly",
                __dirname: "readonly",
                console: "readonly",
                process: "readonly",
            },
        },
    },

    // Browser/runtime files.
    {
        files: ["src/**/*.{js,jsx}", "gatsby-browser.js"],
        languageOptions: {
            globals: {
                window: "readonly",
                document: "readonly",
                location: "readonly",
                navigator: "readonly",
                localStorage: "readonly",
                console: "readonly",
                // Some Gatsby/browser code in this repo uses `require()`.
                require: "readonly",
            },
        },
    },

    // Keep last: turns off stylistic rules that conflict with Prettier.
    eslintConfigPrettier,

    // Ensure react settings are present after all config merges.
    {
        settings: {
            react: {
                version: "18.2.0",
            },
        },
    },
]);
