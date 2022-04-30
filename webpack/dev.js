// development config
const { mergeWithRules } = require("webpack-merge");
const webpack = require("webpack");
// eslint-disable-next-line max-len
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { commonBabelOptions, commonWebpack } = require("./common.js");

const devBabel = JSON.parse(JSON.stringify(commonBabelOptions()));
devBabel.plugins.push("react-refresh/babel");

module.exports = mergeWithRules({
  module: {
    // Replace rule options where loaders match
    // (used for modifying babel options)
    rules: {
      loader: "match",
      options: "replace",
    },
  },
})(commonWebpack, {
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        loader: "babel-loader",
        exclude: /node_modules/,
        options: devBabel,
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockPort: 8090,
      },
    }),
  ],
  devServer: {
    port: 8090,
    hot: "only",
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
});
