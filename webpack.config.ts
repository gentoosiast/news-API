import type { Configuration } from 'webpack';
import type { WebpackConfig, WebpackBuildMode } from '@/config/webpack/types';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildLoaders } from '@/config/webpack/buildLoaders';
import { buildPlugins } from '@/config/webpack/buildPlugins';
import { buildResolvers } from '@/config/webpack/buildResolvers';
import { buildOptimization } from '@/config/webpack/buildOptimization';
import { buildDevServer } from '@/config/webpack/buildDevServer';

const DEFAULT_DEV_SERVER_PORT = 8080;

const TRANSPILATION_TARGET = 'es2015';

const projectDirname = path.dirname(fileURLToPath(import.meta.url));

const getConfig = (mode: WebpackBuildMode, port: number): WebpackConfig => {
  return {
    mode,
    transpilationTarget: TRANSPILATION_TARGET,
    devServerPort: port,
    paths: {
      faviconPath: path.join(projectDirname, 'src', 'assets', 'favicon.svg'),
      templatePath: path.join(projectDirname, 'src', 'index.html'),
      tsConfigPath: path.join(projectDirname, 'tsconfig.json'),
    },
  };
};

export default (env: Record<string, string | boolean>, argv: Record<string, string>): Configuration => {
  const mode = argv.mode === 'development' ? 'development' : 'production';
  const devServerPort = Number(env.PORT ?? DEFAULT_DEV_SERVER_PORT);
  const isDev = mode === 'development';
  const isProd = !isDev;

  const config = getConfig(mode, devServerPort);

  const webpackConfig: Configuration = {
    mode: config.mode,
    context: path.join(projectDirname, 'src'),
    entry: { bundle: './index.js' },
    output: {
      filename: '[name]-[contenthash].js',
      clean: true,
    },
    devtool: isDev && 'eval-cheap-module-source-map',
    plugins: buildPlugins(config),
    module: {
      rules: buildLoaders(config),
    },
    resolve: buildResolvers(),
    devServer: buildDevServer(config),
  };

  if (isProd) {
    webpackConfig.optimization = buildOptimization(config);
  }

  return webpackConfig;
};
