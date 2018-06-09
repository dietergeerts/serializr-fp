module.exports = {
  root: true,
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
  ],
  rules: {
    // Named exports give greater dev experience
    // + libs are switching too, like NodeJS, RxJS, ...
    'import/prefer-default-export': 'off',
  },
  overrides: [
    // Unit tests
    {
      files: [
        '**/*.test.js',
      ],
      env: {
        mocha: true,
      },
    },
    // DEV Configurations
    {
      files: [
        'wallaby.js',
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
