const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const target = "browserslist";
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  target,
  mode: "production",
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "[name].js",
  },
  devtool: "source-map",
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
              sourceMap: true,
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
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: { map: { inline: false, annotation: true } },
      }),
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin(),
    ],
    minimize: true,
  },
};

// module.exports = {
//   target,
//   mode: "development",
//   entry: {
//     main: path.resolve(__dirname, "src", "index.js"),
//     gsap: path.resolve(__dirname, "src", "gsap.js"),
//   },
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     clean: false,
//     filename: "[name].js",
//   },
//   devtool: "source-map",
//   plugins: [
//     new MiniCssExtractPlugin({
//       filename: "[name].css",
//     }),
//   ],

//   optimization: {
//     minimizer: [
//       new OptimizeCssAssetsPlugin(),
//       new CssMinimizerPlugin(),
//       // new TerserWebpackPlugin(),
//     ],
//     splitChunks: {
//       cacheGroups: {
//         gsap: {
//           name: "gsap",
//           test: /gsap\.js$/,
//           chunks: "all",
//         },
//       },
//     },
//   },

//   module: {
//     rules: [
//       {
//         test: /\.(c|sa|sc)ss$/i,
//         use: [
//           MiniCssExtractPlugin.loader,
//           "css-loader",
//           {
//             loader: "postcss-loader",
//             options: {
//               postcssOptions: {
//                 plugins: [require("postcss-preset-env")],
//               },
//             },
//           },
//           "sass-loader",
//         ],
//       },
//     ],
//   },
// };
