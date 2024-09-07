const path = require('path');

module.exports = {
  mode: 'production', // Use 'development' for debugging and 'production' for deployment
  entry: './src/main.js', // Entry point for your application
  output: {
    filename: 'bundle.js', // Name of the bundled file
    path: path.resolve(__dirname, 'public/js') // Output folder for the bundle
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply Babel to .js files
        exclude: /node_modules/, // Exclude node_modules from transpilation
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'] // Use preset-env to transpile ES6+ to ES5
          }
        }
      }
    ]
  }
};
