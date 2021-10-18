module.exports = {
  extends: ['./eslint.config.js'],
  rules: {
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsForRegex: ['^pre', '^draft'] }],
    'unicorn/consistent-function-scoping': 'off',
    'no-shadow': 'off',
    'consistent-return': 'off'
  }
}
