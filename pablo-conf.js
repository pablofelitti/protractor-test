exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['pablo-tests/test1.js'],
    baseUrl: 'http://mqa.ford.com'
};

//protractor --baseUrl='http://some.server.com' my.pablo-conf.js