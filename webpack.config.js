const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const target = "browserslist";

module.exports = {
  target,
  mode: "production",
  entry: path.resolve(__dirname, "src", "main.js"), // Обновите точку входа на ваш основной файл
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "main.js", // Имя выходного файла
  },
  devtool: false,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css", // Имя выходного файла стилей
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // Регулярное выражение для файлов JavaScript
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(c|sa|sc)ss$/i, // Регулярное выражение для файлов стилей
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("postcss-preset-env")],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: false,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin(),
    ],
    minimize: true,
  },
};
