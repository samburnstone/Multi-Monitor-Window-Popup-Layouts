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
  module: {
    rules: [
      {
        test: /\.worker.js$/,
        use: [
          {
            loader: "sharedworker-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")],
    "message-bus": path.resolve(__dirname, "src/message-bus")
  },
  devtool: "source-map",
  externals: []
};
