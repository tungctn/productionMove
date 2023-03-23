exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['testing/*.js'],
  capabilities: {
    browserName: 'chrome',
  },
  allScriptsTimeout: 30000,
};
