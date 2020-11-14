const path = require("path");
module.exports = {
  entry: [
    "./js/load.js",
    "./js/card.js",
    "./js/pin.js",
    "./js/debounce.js",
    "./js/form.js",
    "./js/preview.js",
    "./js/filter.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
