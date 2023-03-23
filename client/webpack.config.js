const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = (env) => {
  // Load environment variables from .env file
  const envVariables = dotenv.config().parsed;

  return {
    // Other Webpack configurations you need
    devServer: {
      allowedHosts: [envVariables.HOST],
    },
    plugins: [
      new webpack.DefinePlugin(
        Object.keys(envVariables).reduce((prev, next) => {
          prev[`process.env.${next}`] = JSON.stringify(envVariables[next]);
          return prev;
        }, {}),
      ),
    ],
  };
};
