import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import "webpack-dev-server"; //热更新插件

const config = {
  //webpack打包配置
  mode: "development",
  //输入输出，目前暂时不考虑分包策略
  entry: {
    index: "./index.tsx",
  },
  output: {
    filename: "[name].bundle.js",
    //打包后的路径
    path: path.resolve(__dirname, "./build"),
    clean: true,
    publicPath: "/",
  },
  //sourcemap，便于找错
  devtool: "inline-source-map",
  devServer: {
    static: "./build",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "yemomo",
      template: "./index.html",
    }),
  ],
  //模块配置
  module: {
    rules: [
      //babel配置，处理ts
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              [
                "@babel/preset-react",
                {
                  "runtime": "automatic",
                },
              ],
              "@babel/preset-typescript",
            ],
            plugins: [
              "@babel/plugin-transform-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    //忽略package和scripts
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    runtimeChunk: "single",
  },
};
export default config;
