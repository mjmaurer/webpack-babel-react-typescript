/* eslint-disable global-require */
// shared config (dev and prod)
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve, join } = require("path");

const commonBabelOptions = () => {
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "usage",
          corejs: "3.20",
        },
      ],
      "@babel/preset-typescript",
      [
        "@babel/react",
        {
          // No need for React global
          runtime: "automatic",
        },
      ],
    ],
    plugins: ["macros", "tsconfig-paths-module-resolver"],
  };
};

const commonWebpack = {
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  mode: "development",
  entry: "./index.tsx",
  context: resolve(__dirname, "../src"),
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: resolve(__dirname, "../public"),
        },
      ],
    }),
  ],
  output: {
    path: resolve(__dirname, "../build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  // enabling this would disable dynamic imports
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "vendor.bundle",
  //         chunks: "initial"
  //       }
  //     }
  //   }
  // }, TODO
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        loader: "babel-loader",
        exclude: /node_modules/,
        options: commonBabelOptions,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-modules-typescript-loader",
            options: {
              mode: process.env.CI ? "verify" : "emit",
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1, // For CSS modules w/ postcss
              modules: true, // all files
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g|png)$/i,
        loader: "file-loader",
        options: {
          publicPath: "assets/js/dist/",
        },
      },
    ],
  },
};

module.exports = {
  commonBabelOptions,
  commonWebpack,
};
