
const path = require("path");

module.exports = {
  // default mode used 
  mode: "development",
  // webpack starts building the dependency graph here.
  entry: "./src/index.js",
  // where the built output files are put 
  // (multiple can be configured but we wont need this)
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
  },
  // configuration for the webpack-dev-server plugin   
  devServer: {
    // files that will not change 
    // these files are served directly ie they are not processed by webpack.
    static: {
      directory: path.resolve(__dirname),
      watch: {
        ignored: /dist/,
      },
    },

    // write webpack-generated assets to disk as well as serving them
    // through the dev server
    devMiddleware: {
      writeToDisk: true,
    },
    // modules can be updated in the browser without reloading the entire page
    hot: true,
    // when changes are detected to a js file the dev server is reloaded 
    // (hot is in place updates, this is reload page to update)
    liveReload: true,
    // dev server update patches are compressed when sent to the client
    compress: true,
    // port the dev server runs on
    port: 8080,
    // do not automatically open the site in a browser when the server starts
    open: false,
  },
};