const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    // Set the single-spa config as the project entry point
    'main': './src/main.js',
  },
  output: {
    publicPath: '/dist/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  devtool: 'source-map',
  externals: []
};
