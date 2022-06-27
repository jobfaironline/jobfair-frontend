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
              '@primary-color': '#E99937'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};
