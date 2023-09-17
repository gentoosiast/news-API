import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type Webpack from 'webpack';
import 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const projectDirname = path.dirname(fileURLToPath(import.meta.url));

const config: Webpack.Configuration = {
  entry: './src/index.js',
  output: {
    path: path.resolve(projectDirname, 'dist'),
  },
  devServer: {
    open: true,
    hot: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(projectDirname, 'src', 'index.html'),
      filename: 'index.html',
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/i,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
};

if (isProduction) {
  config.mode = 'production';
  if (Array.isArray(config.plugins)) {
    config.plugins.push(new MiniCssExtractPlugin());
  }
} else {
  config.mode = 'development';
}

export default config;
