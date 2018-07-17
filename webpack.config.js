const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let config = {
  entry: ['./src/index.js', './src/less/common.less'],
  output:  {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          interpolate: true
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "less-loader"]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new CopyWebpackPlugin([{
        from: './src/img',
        to: './img'
      },
      {
        from: './src/favicon',
        to: './favicon'
      },
      {
        from: './src/fonts',
        to: './fonts'
      }
    ])
  ],
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
    port: 9000,
    overlay: true,
  }
}

module.exports = (env, options) => {
  const production = options.mode === 'production';
  config.devtool = production ? 'source-map' : 'eval-sourcemap';
  return config;
}
