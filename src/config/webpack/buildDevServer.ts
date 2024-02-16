import type { Configuration } from 'webpack-dev-server';
import type { WebpackConfig } from './types';

export const buildDevServer = (config: WebpackConfig): Configuration => ({
  port: config.devServerPort,
  open: true,
  historyApiFallback: true,
});
