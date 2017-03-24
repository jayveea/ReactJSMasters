import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';

let config = {
  devtool: "inline-source-map",
  entry: {
      bundle: __dirname + "/app/app.js",
      style: [
        path.join(__dirname + "/app/assets/style.css"),
        path.join(__dirname + "/node_modules/bootstrap/dist/css/bootstrap.css"),
        path.join(__dirname + "/node_modules/bootstrap/dist/css/bootstrap-theme.css"),
        path.join(__dirname + "/node_modules/font-awesome/css/font-awesome.css")
      ]
  },
  output: {
    path: "./public/js/",
    publicPath: "/js/",
    filename: "[name].js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
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
        test: /\.es6$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    },
    {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      loader: "file-loader?name=../_css/_images/[name].[ext]&publicPath=../"
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

export default config;