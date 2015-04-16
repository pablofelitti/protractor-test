var separator = "\n----------------------------------------------";
/*Wait time to page load*/
var waiting_time_load = 5000;

//LINK STATUS CODE http://stackoverflow.com/questions/25137881/how-to-use-protractor-to-get-the-response-status-code-and-response-text
describe('TC1', function () {


    beforeEach(function() {

        //call global 'isAngularSite' function defined within 'pablo-conf.js' to warn protractor that is a page without AngularJS
        isAngularSite(false);
        browser.ignoreSynchronization = true;
    });

    it('Check load site', function() {
        browser.driver.wait(function() {
            browser.driver.get('http://www.ford.com').then(function(elem){
                /*adding Lang cookie (en), this make that  not appear the language selection */
                browser.manage().addCookie("MP_LANG", "en", "/" ,".ford.com");
                //browser.driver.sleep(waiting_time_load);

            });
            expect(element(by.css('[class="top-links clearfix preventNavHide"]')).isPresent()).toBe(true);
            return true;
        });
    });

});