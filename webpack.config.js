const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './client/dist'),
  },
    module: {
      rules: [
        {
          test: [/\.m?js$/,/\.m?jsx$/],
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-react']
            }
          }
        }
      ]
    }
};