var path = require("path");

const { merge } = require("webpack-merge");
const common = require("./common.js");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true, // NOTE: To use react router.
  },
});
