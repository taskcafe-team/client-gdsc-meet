/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: { filename: "bundle.js", path: path.resolve(__dirname, "dist") },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: ["babel-loader"], exclude: /node_modules/ },
      { test: /\.(ts|tsx)$/, use: "ts-loader", exclude: /node_modules/ },
      { test: /\.(css|scss)$/, use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"] },
      { test: /\.(png|jp(e*)g|svg|gif)$/, type: "asset/resource" },
    ],
  },
  resolve: {
    extensions: [".*", ".js", ".jsx", ".ts", ".tsx"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
    fallback: {
      https: require.resolve("https-browserify"),
      url: require.resolve("url/"),
      http: require.resolve("stream-http"),
      buffer: require.resolve("buffer/"),
    },
  },
  devtool: "cheap-module-source-map",
  devServer: {
    static: { directory: path.join(__dirname, "dist") },
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
};
