const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const { RUNTIME } = require('./config');
const elmSource = __dirname + '/src/elm';

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
  entry: {
    index: './src/elm/index.js',
    chat: './src/elm/chat.js',
  },
  output: {
    path: path.resolve(__dirname, './dist/elm'),
  },
  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: {
          loader: 'elm-webpack-loader',
          options: {
            cwd: elmSource,
            files: [
              path.resolve(__dirname, 'src/elm/src/Main.elm'),
              path.resolve(__dirname, 'src/elm/src/Chat.elm'),
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Wallstreet Elm Client',
      template: './src/elm/index.html',
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
