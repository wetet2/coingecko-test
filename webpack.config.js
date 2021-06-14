const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let config = {

   entry: {
      main: './client/main.js',
   },

   output: {
      path: __dirname + '/client_dist',
      publicPath: '/',
      filename: '[name].js',
   },

   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            include: [path.resolve(__dirname, 'client')],
            exclude: [/node_modules/, path.resolve(__dirname, 'client_dist')],
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],
                  plugins: [
                     '@babel/plugin-transform-runtime'
                  ]
               }
            }
         },
         {
            test: /\.(css|scss)$/,
            use: [
               MiniCssExtractPlugin.loader,
               'css-loader',
               'sass-loader'
            ]
         },
         {
            test: /\.(ttf|eot|woff|woff2|otf)$/,
            use: ['file-loader']
         },

      ]
   },

   plugins: [
      new MiniCssExtractPlugin({
         filename: "[name].css",
         chunkFilename: "[name]_bundle.css",
      }),
      new OptimizeCssAssetsPlugin({
         assetNameRegExp: /\.css$/,
         cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
         },
      }),
   ],
   
};
module.exports = (env, options) => {
   if(options.mode === 'development'){
      config.devtool = 'source-map';
      config.stats = {
         hash: false,
         version: false,
         assets: false,
         entrypoints: false,
         modules: false,
         errorDetails: false,
      };

      let htmlwebpack = new HtmlWebpackPlugin({
         filename: 'main.html',
         template: 'client/main.dev.html',
         chunks: ["main"],
      });
      config.plugins = [htmlwebpack].concat(config.plugins);

   }
   else{

      let htmlwebpack = new HtmlWebpackPlugin({
         filename: 'main.html',
         template: 'client/main.html',
         chunks: ["main"],
      });
      config.plugins = [htmlwebpack].concat(config.plugins);
      
   }
   return config;
}
