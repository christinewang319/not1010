var path = require('path');

module.exports = {
  entry: './lib/not1010.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'bundle.js'
  },
  devtool: 'source-map'
};
