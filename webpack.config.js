const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const target = "browserslist";
const TerserWebpackPlugin = require("terser-webpack-plugin");
// const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  target,
  mode: "production",
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "[name].js",
  },
  devtool: false,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/i,
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
      // new OptimizeCssAssetsPlugin({
      //   cssProcessorOptions: { map: { inline: false, annotation: true } },
      // }),
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin(),
    ],
    minimize: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendors",
          chunks: "all",
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
        },
      },
    },
  },
};
