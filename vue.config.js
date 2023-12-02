/* Vue Config File */
const path = require('path');
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': path.resolve('./src/assets'),
        '@mixins': path.resolve('./src/mixins'),
        '@components': path.resolve('./src/components'),
        '@views': path.resolve('./src/views'),
        '@api': path.resolve('./src/api')
      }
    }
  }
};
