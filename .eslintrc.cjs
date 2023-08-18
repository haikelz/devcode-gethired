module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["jsx-a11y"],
  rules: {
    "react/react-in-jsx-scope": 0,
  },
};
