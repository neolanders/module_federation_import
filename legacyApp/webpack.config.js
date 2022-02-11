const HtmlWebPackPlugin = require("html-webpack-plugin");

const deps = require("./package.json").dependencies;
const devMode = process.env.NODE_ENV === 'development';

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
          test: /\.jsx?$/,
          exclude: {
              and: [/node_modules/], // Exclude libraries in node_modules ...
              not: [
                  // Except for a few of them that needs to be transpiled because they use modern syntax
                  /d3/,
                  /internmap/,
                  /delaunator/
              ]
          },
          use: devMode ? {
              loader: "swc-loader",
              options: {
                  jsc: {
                      parser: {
                          syntax: "ecmascript",
                          jsx: true
                      },
                      target: 'es5'
                  }
              }
          } : {
              loader: 'babel-loader'
          }
      },
      {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: devMode ? {
              loader: "swc-loader",
              options: {
                  jsc: {
                      parser: {
                          syntax: "typescript",
                          tsx: true
                      },
                      target: 'es5'
                  }
              }
          } : {
              loader: 'ts-loader',
              options: {
                  // disable type checker - we will use it in fork plugin
                  transpileOnly: true
              }
          }
      },
      // {
      //   test: /\.(ts|tsx|js|jsx)$/,
      //   exclude: /node_modules(?!(\/|\\)host)/, //notice transpile of host package, so jsx will work
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: ['@babel/preset-react'] //added this to process jsx in host package
      //     }
      //   },
      // },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
  devtool: 'source-map'
};
