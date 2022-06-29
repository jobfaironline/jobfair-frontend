const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@btn-primary-bg': '#E99937',
              '@primary-color': '#130b56'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};
