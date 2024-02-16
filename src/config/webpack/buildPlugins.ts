import type { WebpackPluginInstance } from 'webpack';
import type { WebpackConfig } from './types';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Dotenv from 'dotenv-webpack';

export const buildPlugins = (config: WebpackConfig): WebpackPluginInstance[] => {
  const plugins: WebpackPluginInstance[] = [];
  const isProd = config.mode === 'production';

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name]-[contenthash].css',
        chunkFilename: '[name]-[contenthash].css',
      }),
    );
  }

  plugins.push(
    ...[
      new HtmlWebpackPlugin({
        template: config.paths.templatePath,
        favicon: config.paths.faviconPath,
      }),
      new Dotenv(),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: config.paths.tsConfigPath,
        },
      }),
      new ESLintPlugin({
        extensions: ['js', 'ts'],
      }),
    ],
  );

  return plugins;
};
