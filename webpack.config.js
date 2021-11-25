const path = require('path');


module.exports = {
  entry: path.resolve(__dirname, './dist/bundle.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'production',
  target: 'node',
  module: {
    rules: [
    {test: /\.txt$/, use: 'raw-loader'}
    ]
    },
};