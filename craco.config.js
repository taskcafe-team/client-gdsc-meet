/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const config = require(path.resolve(__dirname, "./webpack.config.js"));
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      Object.assign(webpackConfig, config);
      return webpackConfig;
    },
  },
};
