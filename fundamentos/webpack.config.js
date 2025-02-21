const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // entrada
  entry: path.resolve(__dirname, "transpiled", "index.js"), // usa o resolve para pegar o caminho relativo
  // saída
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle[hash].js", // hash para gerar um hash aleatório para o arquivo
  },
  plugins: [
    // Plugin que injeta a tag scripts dentro do index.html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new CleanWebpackPlugin(),
  ],
};
