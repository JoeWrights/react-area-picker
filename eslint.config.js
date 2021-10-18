const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'unicorn', 'promise', '@typescript-eslint', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.ts', '.js', '.json']
      },
      alias: {
        map: [['@', './src/']]
      },
      typescript: {}
    }
  },
  rules: {
    'import/no-extraneous-dependencies': OFF,
    'import/extensions': [
      ERROR,
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never'
      }
    ],
    'import/prefer-default-export': OFF,
    'import/no-unresolved': OFF,
    'import/no-dynamic-require': OFF,

    'unicorn/better-regex': ERROR,
    'unicorn/prevent-abbreviations': OFF,
    'unicorn/filename-case': [
      ERROR,
      {
        cases: {
          // 中划线
          kebabCase: false,
          // 小驼峰
          camelCase: true,
          // 下划线
          snakeCase: false,
          // 大驼峰
          pascalCase: true
        }
      }
    ],
    'unicorn/no-array-instanceof': WARN,
    'unicorn/no-for-loop': WARN,
    'unicorn/prefer-add-event-listener': [
      ERROR,
      {
        excludedPackages: ['koa', 'sax']
      }
    ],
    'unicorn/prefer-query-selector': ERROR,
    'unicorn/no-null': OFF,
    'unicorn/no-array-reduce': OFF,
    'unicorn/no-array-for-each': OFF,
    'unicorn/consistent-destructuring': OFF,
    'unicorn/consistent-function-scoping': OFF,

    '@typescript-eslint/no-useless-constructor': ERROR,
    '@typescript-eslint/no-empty-function': OFF,
    '@typescript-eslint/no-var-requires': OFF,
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    '@typescript-eslint/no-explicit-any': OFF,
    '@typescript-eslint/no-unused-vars': WARN,

    'react/jsx-filename-extension': [ERROR, { extensions: ['.tsx', 'ts', '.jsx', 'js'] }],
    'react/jsx-indent-props': [ERROR, 2],
    'react/jsx-indent': [ERROR, 2],
    'react/jsx-one-expression-per-line': OFF,
    'react/destructuring-assignment': OFF,
    'react/state-in-constructor': OFF,
    'react/jsx-props-no-spreading': OFF,
    'react/prop-types': OFF,
    'react/require-default-props': OFF,
    'react/no-unused-prop-types': OFF,

    'jsx-a11y/click-events-have-key-events': OFF,
    'jsx-a11y/no-noninteractive-element-interactions': OFF,
    'jsx-a11y/no-static-element-interactions': OFF,

    'lines-between-class-members': [ERROR, 'always'],
    'no-unused-expressions': OFF,
    'no-plusplus': OFF,
    'no-console': OFF,
    'class-methods-use-this': ERROR,
    'jsx-quotes': [ERROR, 'prefer-single'],
    'global-require': OFF,
    'no-use-before-define': OFF,
    'no-restricted-syntax': OFF,
    'no-continue': OFF,
    'no-unused-vars': OFF,
    'linebreak-style': OFF,
    'import/order': OFF,
    'react/jsx-no-bind': OFF
  }
}
