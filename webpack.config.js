const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/,
      use: ['file-loader']
    },
    {
      test: /\.html$/,
      use: {
        loader: 'html-loader',
        options: {
          interpolate: true
        }
      }
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      hash: true
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    //add config to production only
  }
  return config;
}
