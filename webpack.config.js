const CopyPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    container: "./src/container",
    popup: "./src/popup"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new CopyPlugin([
      { from: "./*.html" },
      { from: "./assets", to: "assets" },
      { from: "./manifest.json" },
      { from: "./node_modules/bootstrap/dist/css/bootstrap.min.css" },
      { from: "./node_modules/bootstrap/dist/css/bootstrap.min.css.map" }
    ]),
    new WorkboxPlugin.GenerateSW()
  ],
  resolve: {
    alias: {
      "message-broadcaster": path.resolve(
        __dirname,
        "./src/message-broadcaster"
      )
    },
    modules: [path.resolve(__dirname, "node_modules")]
  },
  devtool: "source-map",
  devServer: {
    publicPath: "/",
    contentBase: path.resolve(__dirname, "dist")
  },
  externals: []
};
