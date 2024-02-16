export type WebpackBuildMode = 'production' | 'development';

type WebpackConfig = {
  mode: WebpackBuildMode;
  transpilationTarget: string;
  devServerPort: number;
  paths: {
    faviconPath: string;
    templatePath: string;
    tsConfigPath: string;
  };
};

export type { WebpackConfig };
