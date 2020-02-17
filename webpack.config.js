const WorkerPlugin = require("worker-plugin-shared");
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    container: "./src/container",
    popup: "./src/popup"
  },
  output: {
    publicPath: "/dist/",
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [new WorkerPlugin()],
  resolve: {
    alias: {
      "message-bus": path.resolve(__dirname, "./src/message-bus")
    },
    modules: [path.resolve(__dirname, "node_modules")]
  },
  devtool: "source-map",
  externals: []
};
