module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { 
      topLevelAwait: true,
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
};
