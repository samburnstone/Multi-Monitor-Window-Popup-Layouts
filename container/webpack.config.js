const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    'container': './src/container',
    'popup': './src/popup',
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
