const path = require('path');

module.exports = function override(config, env) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@sharedComponents': path.resolve(__dirname, 'src/components/sharedComponents/')
  };
  return config;
};