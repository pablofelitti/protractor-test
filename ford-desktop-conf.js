exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['ford-desktop-tests/tc2.js'],
    baseUrl: 'http://www.ford.com'
};

//protractor --baseUrl='http://some.server.com' my.ford-mobile-conf.js