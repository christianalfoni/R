var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var srcPath = path.resolve(__dirname, 'src');
var demoPath = path.resolve(__dirname, 'demo');
var buildPath = path.resolve(__dirname, 'build');

var config = {
  entry: [path.resolve(srcPath, 'R.js'), path.resolve(demoPath, 'main.js')],
  output: {
    path: buildPath,
    filename: 'lib.js',
    /*
    libraryTarget: 'umd',
    library: 'R'
    */
  },
  resolve: {
    alias: {
      'R': path.resolve(srcPath, 'R.js')
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel!virtual-dom?jsx=DOM',
      exclude: [nodeModulesPath]
    }]
  }
};

module.exports = config;
