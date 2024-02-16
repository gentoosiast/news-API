import type { RuleSetRule } from 'webpack';
import type { WebpackConfig } from './types';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

type RuleUse = RuleSetRule['use'];

const getCssLoaders = (isProd: boolean): RuleUse => [
  isProd ? MiniCssExtractPlugin.loader : 'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: {
        auto: true,
        localIdentName: isProd ? '[hash:base64]' : '[name]-[local]-[hash:base64:8]',
      },
    },
  },
];

export const buildLoaders = (config: WebpackConfig): RuleSetRule[] => {
  const isProd = config.mode === 'production';

  return [
    {
      test: /\.[jt]sx?$/,
      loader: 'esbuild-loader',
      options: {
        target: config.transpilationTarget,
      },
      resolve: {
        fullySpecified: false,
      },
      exclude: /node_modules/,
    },
    {
      test: /\.css$/i,
      use: getCssLoaders(isProd),
    },
    {
      test: /\.(eot|otf|ttf|woff2?)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'fonts/[hash][ext][query]',
      },
    },
    {
      test: /\.(avif|gif|jpe?g|png|svg|webp)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'images/[hash][ext][query]',
      },
    },
  ];
};
