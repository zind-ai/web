const baseConfig = require("../../prettier.base.cjs");

module.exports = {
  ...baseConfig,
  plugins: [...(baseConfig.plugins || []), "prettier-plugin-tailwindcss"],
};
