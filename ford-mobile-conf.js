exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['ford-mobile-tests/test1.js'],
    baseUrl: 'http://m.ford.com'
};

//protractor --baseUrl='http://some.server.com' my.ford-mobile-conf.js