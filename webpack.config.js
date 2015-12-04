module.exports = {
  context: __dirname,
  entry: "./js/main.js",
  output: {
    path: "./js",
    publicPath: "",
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-maps',
};
