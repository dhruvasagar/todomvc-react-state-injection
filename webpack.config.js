var path = require("path");
var webpack = require("webpack");
var CompressionPlugin = require("compression-webpack-plugin");

var publicPath = "bundle/js/";
var devEntryPoints = [
    "webpack-dev-server/client?http://localhost:4000",
    "webpack/hot/only-dev-server"
];
var entryPoints = ["./client/app"];
var loaders = [
  "babel?presets[]=react,presets[]=es2015"
];
if(process.env.NODE_ENV !== "production"){
  publicPath = "http://localhost:4000/" + publicPath;
  entryPoints = devEntryPoints.concat(entryPoints);
  loaders.unshift("react-hot");
}

console.log(__dirname);
console.log("=========");

module.exports = {
  devtool: "eval",
  entry: entryPoints,
  output: {
    path: path.join(__dirname, "public/bundle/js"),
    filename: "app.js",
    publicPath: publicPath
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new CompressionPlugin({
      asset: "[file].gz",
      algorithm: "gzip",
      regExp: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: loaders,
        include: path.join(__dirname, "client")
      }
    ]
  }
};
