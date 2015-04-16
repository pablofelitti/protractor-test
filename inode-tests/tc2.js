//Ford Test case 2

VAR_ARRAY_SECTION = [];
VAR_ARRAY_SECTION_SEGMENT = [];


var separator = "\n----------------------------------------------";
/*Wait time to page load*/
var waiting_time_load = 12000;


/*--process begins - json file--*/

//Look for the section array in json file
for (i = 0; i < browser.params.segmentArray.length; i++) {

    VAR_ARRAY_SECTION[VAR_ARRAY_SECTION.length] = browser.params.segmentArray[i].name

}


//Look for the ssection ection array in json file
for (i = 0; i < browser.params.sectionSegmentArray.length; i++) {

    VAR_ARRAY_SECTION_SEGMENT[VAR_ARRAY_SECTION_SEGMENT.length] = browser.params.sectionSegmentArray[i].name

}


//some checks
if (VAR_ARRAY_SECTION.length <= 0) {

    console.log('** \n JsonFile maybe is wrong, please check the atribute "segmentArray"');
}
if (VAR_ARRAY_SECTION_SEGMENT <= 0) {

    console.log('** \n JsonFile maybe is wrong, please check the atribute "sectionSegmentArray"');
}


/*--process ends - json file--*/


// spec.js
describe('TC2', function () {


    beforeEach(function () {

        //call global 'isAngularSite' function defined within 'inode-conf.js' to warn protractor that is a page without AngularJS
        isAngularSite(false);
        browser.ignoreSynchronization = true;

    });


    it('click on Category', function () {


        for (k = 0; k < VAR_ARRAY_SECTION.length; k++) {

            /*Control Flow  - using Protractor with loops
             (https://github.com/angular/protractor/blob/master/docs/control-flow.md;
             http://stackoverflow.com/questions/27910331/using-protractor-with-loops)

             */
            var func = (function () {
                var l = k;
                return function () {
                    browser.driver.get('http://www.ford.com').then(function (elem) {

                        /*adding Lang cookie (en), this make that  not appear the language selection */
                        browser.manage().addCookie("MP_LANG", "en", "/", ".ford.com");
                        browser.driver.sleep(waiting_time_load);


                        console.log(separator);
                        console.log(separator);
                        VAR_SECTION = VAR_ARRAY_SECTION[l];
                        VAR_SECTION_SEGMENT = VAR_ARRAY_SECTION_SEGMENT[l];
                        console.log('VAR_SECTION ' + VAR_SECTION);
                        console.log('VAR_SECTION_SEGMENT ' + VAR_SECTION_SEGMENT);


                        /*Carga de variables a utilizar*/
                        var el_1 = element(By.css('[class="top-links clearfix preventNavHide"]'));
                        var el_2 = el_1.element(By.linkText(VAR_SECTION));
                        //var el_2 = el_1.all(by.css('[class="link"]'));
                        var el_3 = element(by.css(VAR_SECTION_SEGMENT)).all(by.tagName('h4'));
                        var el_4 = element(by.css(VAR_SECTION_SEGMENT)).all(by.css('[class="shop-pricing-price"]'));

                        /*Variables para comprabaciones*/
                        VAR_CARS = [];
                        VAR_MSRP = [];
                        VAR_MSRP2 = [];


                        /*Step 1: Click the  category section from the Navigation bar */
                        el_2.then(function (items) {


                            browser.driver.wait(function () {
                                //browser.pause();
                                VAR_LINK_SECTION = items;

                                VAR_LINK_SECTION.click();

                                /*Step 2: Click the  elements one by one from category section from get the second data */
                                el_4.then(function (items) {


                                    browser.driver.wait(function () {

                                        /*Complete the  vehicle MSRP's array */
                                        for (i = 0; i < items.length; i++) {


                                            var msrp_info = items[i].getText();


                                            msrp_info.getText().then(function (msrp) {

                                                VAR_MSRP[VAR_MSRP.length] = msrp;

                                            });

                                        }
                                        return true;
                                    });


                                    browser.driver.wait(function () {

                                        /*Check first flyout order by MSRP*/
                                        var_control = true;
                                        var_msrp_lower = 0;
                                        var_msrp_higher = 0;


                                        console.log(separator);

                                        for (i = 0; i < VAR_MSRP.length; i++) {

                                            var_msrp_actual = VAR_MSRP[i];

                                            if (i == 0) {

                                                var_msrp_lower = var_msrp_actual;
                                                var_msrp_higher = var_msrp_actual;

                                            } else {

                                                var_msrp_higher = var_msrp_actual;

                                                if (var_msrp_lower > var_msrp_higher) {
                                                    var_control = false;
                                                }

                                                var_msrp_lower = var_msrp_actual;

                                            }


                                        }

                                        console.log(separator);

                                        expect(var_control).toBe(true);

                                        /*Shows Comments*/
                                        console.log(separator);
                                        if (var_control) {
                                            console.log('NAVIGATION BAR CONTENTS IS "OK" FOR SECTION "' + VAR_SECTION + '"');
                                        } else {
                                            console.log('**WARNING** :  PLEASE CHECK THE MSRP ORDER');
                                        }
                                        console.log(separator);

                                        return true;

                                    });

                                    /*Complete the 2� vehicle MSRP's array */
                                    browser.driver.wait(function () {

                                        /*Enter to second MSRP*/
                                        for (i = 0; i < items.length; i++) {
                                            items[i].click();
                                            //class="item clearfix" - class="right" - class="top-info clearfix"
                                            element.all(by.css('[class="item clearfix"]')).all(by.css('[class="right"]')).all(by.css('[class="shop-pricing-price"]')).then(function (items2) {


                                                /*Take only the first element (MSRP lower)*/
                                                (items2[0].getText()).then(function (msrp) {

                                                    if (msrp.length > 0) {

                                                        VAR_MSRP2[VAR_MSRP2.length] = msrp;

                                                    }

                                                });

                                            });

                                        }

                                        return true;
                                    });


                                    /*Compare both MSRP*/
                                    browser.driver.wait(function () {

                                        console.log('MSPR2  ' + VAR_MSRP2);
                                        var_control = true;

                                        console.log(separator);

                                        for (i = 0; i < VAR_MSRP.length; i++) {

                                            if (VAR_MSRP[i] != VAR_MSRP2[i]) {
                                                var_control = false;
                                            }

                                            console.log('VEHICLE MSRP 1 =  ' + VAR_MSRP[i] + ' --  VEHICLE MSRP 2 =  ' + VAR_MSRP2[i]);

                                        }

                                        console.log(separator);

                                        expect(var_control).toBe(true);


                                        console.log(separator);
                                        if (var_control) {
                                            console.log('MSRP VALUE ON BOTH PLACE IS "OK" FOR SECTION "' + VAR_SECTION + '"');
                                        } else {
                                            console.log('**WARNING** :  PLEASE CHECK THE MSRP ON BOTH PLACE');
                                        }
                                        console.log(separator);

                                        return true;
                                    });


                                });

                                return true;

                            });


                        });

                        /* Step 2: Verify navigation bar contents*/
                        /*Step 2.1: look for names*/
                        el_3.then(function (items) {

                            browser.driver.wait(function () {

                                VAR_CARS = [];

                                /*Complete the  vehicle name's array */
                                for (i = 0; i < items.length; i++) {

                                    var car_info = items[i];
                                    car_info.getText().then(function (name) {

                                        VAR_CARS[VAR_CARS.length] = name;
                                        console.log('VEHICLE NAME =  ' + name);

                                    });

                                }

                                return true;

                            });


                        });
                    });
                    return true;
                }

            })();
            browser.driver.wait(func);

        }
    });


});





