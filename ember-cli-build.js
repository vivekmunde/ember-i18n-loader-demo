/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app'),
  path = require('path'),
  Funnel = require('broccoli-funnel'),
  mergeTrees = require('broccoli-merge-trees'),
  writeFile = require('broccoli-file-creator'),
  md5 = require('md5');

const IS_PRODUCTION = EmberApp.env() === 'production';

module.exports = function (defaults) {

  // Create a md5 hash for fingerprinting
  const fingerprintHash = md5(Date.now());

  let app = new EmberApp(defaults, {
    fingerprint: {
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'json'],
      customHash: fingerprintHash //use a single hash for all assets
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // ------------------------------------------------------------------------------------
  // Bootstrap
  // ------------------------------------------------------------------------------------
  app.import(`${app.bowerDirectory}/bootstrap/dist/css/bootstrap.css`);
  app.import(`${app.bowerDirectory}/bootstrap/dist/css/bootstrap.theme.css`);
  app.import(`${app.bowerDirectory}/bootstrap/dist/js/bootstrap.theme.css`);
  var fontsTree = new Funnel(path.join(app.bowerDirectory, 'bootstrap'), {
    srcDir: 'fonts',
    include: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.eot', '**/*.svg'],
    destDir: 'fonts'
  });

  // ------------------------------------------------------------------------------------
  // Showdown
  // ------------------------------------------------------------------------------------
  app.import(`${app.bowerDirectory}/showdown/dist/showdown.js`);

  // ------------------------------------------------------------------------------------
  // Create a asset-fingerprint.js file which holds the fingerprintHash value 
  // This hash value is used by all the asset loaders to load the assets on-demand 
  // ------------------------------------------------------------------------------------
  var assetMapTree = writeFile('./assets/assets-fingerprint.js', '(function(_window){ _window.DEMO_ASSET_FINGERPRINT_HASH = "' + (IS_PRODUCTION ? fingerprintHash : '') + '"; })(window);');

  return app.toTree(mergeTrees([assetMapTree, fontsTree]));
};
