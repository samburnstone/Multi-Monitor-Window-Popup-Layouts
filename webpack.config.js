const CopyPlugin = require("copy-webpack-plugin");
const WorkerPlugin = require("worker-plugin-shared");
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
      { from: "./stock-data", to: "stock-data" },
      { from: "./manifest.json" }
    ]),
    new WorkerPlugin(),
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
