const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
  ],

  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },

  env: {
    es6: true,
    node: true,
    browser: true,
  },

  rules: {
    indent: [WARN, 2, { SwitchCase: 1 }],
    "arrow-parens": [WARN, "always"],
    "no-async-promise-executor": ERROR,
    "no-await-in-loop": WARN,
    "no-misleading-character-class": WARN,
    "no-prototype-builtins": OFF,
    "no-template-curly-in-string": WARN,
    "require-atomic-updates": ERROR,
    "valid-jsdoc": WARN,
    "accessor-pairs": [WARN, { setWithoutGet: true }],
    "array-callback-return": ERROR,
    complexity: WARN,
    "consistent-return": ERROR,
    curly: [WARN, "all"],
    "default-case": WARN,
    "dot-location": [WARN, "property"],
    "dot-notation": WARN,
    eqeqeq: [ERROR, "smart"],
    "guard-for-in": WARN,
    "max-classes-per-file": [WARN, 3],
    "no-alert": OFF,
    "no-caller": WARN,
    "no-console": OFF,
    "no-else-return": WARN,
    "no-empty-function": ERROR,
    "no-eval": OFF,
    "no-extend-native": OFF,
    "no-extra-bind": WARN,
    "no-extra-label": WARN,
    "no-floating-decimal": WARN,
    "no-implicit-coercion": ERROR,
    "no-implicit-globals": OFF,
    "no-implied-eval": OFF,
    "no-invalid-this": OFF,
    "no-iterator": WARN,
    "no-labels": OFF,
    "no-lone-blocks": OFF,
    "no-loop-func": WARN,
    "no-multi-spaces": [WARN, { ignoreEOLComments: true }],
    "no-multi-str": ERROR,
    "no-new": OFF,
    "no-new-func": OFF,
    "no-new-wrappers": ERROR,
    "no-return-assign": ERROR,
    "no-return-await": WARN,
    "no-self-compare": ERROR,
    "no-sequences": ERROR,
    "no-throw-literal": WARN,
    "no-useless-call": WARN,
    "no-useless-return": WARN,
    radix: WARN,
    "require-await": WARN,
    yoda: WARN,
    // semi: WARN,
    "no-shadow": WARN,
    "no-shadow-restricted-names": WARN,
    "no-use-before-define": WARN,
    "array-bracket-newline": [WARN, "consistent"],
    "array-bracket-spacing": WARN,
    "object-curly-spacing": [WARN, "always"],
    "operator-linebreak": OFF,
    "padding-line-between-statements": OFF,
    "prefer-object-spread": WARN,
    "quote-props": [WARN, "as-needed"],
    quotes: [WARN, "double", { avoidEscape: true }],
    "no-useless-computed-key": WARN,

    "react/display-name": OFF,
    "react/jsx-filename-extension": OFF,
    "react/react-in-jsx-scope": OFF,
    "react/jsx-one-expression-per-line": OFF,
    "react/jsx-closing-tag-location": OFF,
    "react/prop-types": WARN,
    "react/forbid-prop-types": OFF,
    "react/jsx-no-target-blank": [WARN, { allowReferrer: true }],
    "react/no-children-prop": OFF,
  },

  globals: {
    WebAssembly: false,
    BigInt: false,
    URL: false,
    Atomics: false,
    SharedArrayBuffer: false,
  },
};
