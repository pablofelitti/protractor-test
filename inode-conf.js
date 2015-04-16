exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['inode-tests/tc1.js', 'inode-tests/tc2.js'],
    multiCapabilities: [
        {
            browserName: 'chrome'
        }],
    //json file
    params: require('./inode-tests/test-data.json'),

    onPrepare: function () {

        global.isAngularSite = function (flag) {
            //This forces protractor to forget about his dedicated patience for angular to load and finish its tasks. This allowed us to start using the same DSL
            browser.driver.ignoreSynchronization = !flag;
        };
        // The require statement must be down here, since jasmine-reporters
        // needs jasmine to be in the global and protractor does not guarantee
        // this until inside the onPrepare function.
        //require('jasmine-reporters');
        //jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter('xmloutput', true, true));

    },

    jasmineNodeOpts: {defaultTimeoutInterval: 150000}

};