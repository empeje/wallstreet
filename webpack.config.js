const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const { RUNTIME } = require('./config');

const commonConfig = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
};

const elmConfig = {
  entry: './src/elm/index.js',
  output: {
    path: path.resolve(__dirname, './dist/elm'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Wallstreet Elm Client',
      template: './src/elm/index.html',
    }),
  ],
};

const jsConfig = {
  entry: {
    index: './src/js/index.js',
    chat: './src/js/chat.js',
  },
  output: {
    path: path.resolve(__dirname, './dist/js'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Wallstreet JS Client',
      template: './src/js/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Wallstreet JS Client - Chat',
      template: './src/js/chat.html',
      inject: true,
      chunks: ['chat'],
      filename: 'chat.html',
    }),
  ],
};

const activeConfig = RUNTIME === 'elm' ? elmConfig : jsConfig;

module.exports = merge(commonConfig, activeConfig);
