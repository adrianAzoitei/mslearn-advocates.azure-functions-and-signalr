const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
require('dotenv').config();

module.exports = {

    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3000,
        allowedHosts: 'all',
        client: {
            logging: 'verbose',
            overlay: true,
          },
          proxy: [
            {
              context: ['/api'],
              target: 'http://localhost:7071',
            },
          ],
      },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
            "test": /\.js$/,
            "exclude": /node_modules/,
            "use": {
              "loader": "babel-loader",
              "options": {
                "presets": [
                  "@babel/preset-env",
                ]
              }
            }
        }
        ]
      },
      plugins: [
        new Dotenv({ systemvars: true, path: path.resolve(__dirname, './.env') }),
        new CopyWebpackPlugin({
            patterns: [
              { from: './src/favicon.ico', to: './' },
              { from: './index.html', to: './'}
            ],
          }),
    ]
      
}