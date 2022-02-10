const HtmlWebPackPlugin = require("html-webpack-plugin");

const deps = require("./package.json").dependencies;
module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3002,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        // resolve: {
        //   fullySpecified: false,
        // },
        resolve: {
          enforceExtension: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules(?!(\/|\\)host)/, //notice transpile of host package, so jsx will work
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-react'] //added this to process jsx in host package
          }
        },
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
  devtool: 'source-map'
};
