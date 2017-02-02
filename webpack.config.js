const webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

const config = {
  devtool: "inline-source-map",
  entry: {
      bundle: __dirname + "/app/app.js",
      style: [
        path.join(__dirname + "/app/assets/style.css"),
        path.join(__dirname + "/node_modules/bootstrap/dist/css/bootstrap.css"),
        path.join(__dirname + "/node_modules/bootstrap/dist/css/bootstrap-theme.css")
      ]
  },
  output: {
    path: "./public/js/",
    publicPath: "/js/",
    filename: "[name].js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query: {
      presets: ["es2015","react","stage-0"]
      }
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    },
    {
      test: /\.(jpg|png|ttf|eot|woff|woff2|svg)$/,
      loader: "file-loader?name=_css/_images/[name].[ext]&publicPath=../"
    }
    ]
  },
  plugins: [
        new ExtractTextPlugin("./../css/bundle.css")
  ],
  devServer: {
    contentBase: "./public",
    colors: true,
    historyApiFallback: true,
    inline: true
  },
}
if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
  config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({comments: false}),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  ];
};

module.exports = config;