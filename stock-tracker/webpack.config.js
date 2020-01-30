const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    'main': './src/main.js',
  },
  output: {
    publicPath: '/dist/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
        options: {
          "presets": [
            ["@babel/preset-env", {
              "targets": {
                "browsers": ["last 2 versions"]
              }
            }],
            ["@babel/preset-react"]
          ]
        }
      }
    ]
  },
  devtool: 'source-map',
};
