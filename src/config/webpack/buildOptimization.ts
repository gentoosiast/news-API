import type { Configuration } from 'webpack';
import type { WebpackConfig } from './types';
import { EsbuildPlugin } from 'esbuild-loader';

type Optimization = Configuration['optimization'];

export const buildOptimization = (config: WebpackConfig): Optimization => ({
  minimizer: [
    new EsbuildPlugin({
      target: config.transpilationTarget,
      css: true,
    }),
  ],
});
