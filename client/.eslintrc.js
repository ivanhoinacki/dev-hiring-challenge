module.exports = {
    env: {
        es6: true,
        jest: true,
        browser: true,
    },
    extends: ['airbnb', 'prettier', 'prettier/react'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        __DEV__: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react', 'jsx-a11y', 'import', 'react-hooks', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
        'import/prefer-default-export': 'off',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'react/jsx-one-expression-per-line': 'off',
        'global-require': 'off',
        'react-native/no-raw-text': 'off',
        'no-param-reassign': 'off',
        'no-underscore-dangle': 'off',
        camelcase: 'off',
        'no-console': ['error', { allow: ['tron'] }],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/jsx-filename-extension': [
            'warn',
            { extension: ['.jsx', '.js'] }, //Essa regra é para que o vs code aceite trabalhar com extensões .js sem dar warn
        ],
        'import/prefer-default-export': 'off', // Essa regra, desativa a obrigação de criar o export default quando só tem 1 export
    },
    settings: {
        'import/resolver': {
            'babel-plugin-root-import': {
                rootPathSuffix: 'src',
            },
        },
    },
};
