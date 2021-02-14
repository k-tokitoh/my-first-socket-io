module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
};
