module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'prettier/react'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parse: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        'react/jsx-filename-extension': [
            'warn',
            { extension: ['.jsx', '.js'] }, //Essa regra é para que o vs code aceite trabalhar com extensões .js sem dar warn
        ],
        'import/prefer-default-export': 'off', // Essa regra, desativa a obrigação de criar o export default quando só tem 1 export
    },
};
