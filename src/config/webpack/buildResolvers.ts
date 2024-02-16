import type { ResolveOptions } from 'webpack';
import TSConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

export const buildResolvers = (): ResolveOptions => {
  return {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    plugins: [new TSConfigPathsPlugin()],
  };
};
