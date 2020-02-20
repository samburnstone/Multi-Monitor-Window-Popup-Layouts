const CopyPlugin = require("copy-webpack-plugin");
const WorkerPlugin = require("worker-plugin-shared");
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
  plugins: [new CopyPlugin([{ from: "./*.html" }]), new WorkerPlugin()],
  resolve: {
    alias: {
      "message-bus": path.resolve(__dirname, "./src/message-bus")
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
