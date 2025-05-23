const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // entrada
  entry: path.resolve(__dirname, "src", "index.js"), // usa o resolve para pegar o caminho relativo
  // saída
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle[hash].js", // hash para gerar um hash aleatório para o arquivo
    publicPath: "/", // especifica aonde vão estar o arquivos de bundle no projeto
  },
  plugins: [
    // Plugin que injeta a tag scripts dentro do index.html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
};
