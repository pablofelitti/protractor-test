describe('This test case verifies that each vehicle category displays correctly.', function () {

    beforeEach(function () {
        browser.driver.get(browser.baseUrl);
    });

    it('verify that Cars section is shown only when clicked', function () {

        browser.driver.findElement(by.css("[class='segment cars hidden']")).then(function () {
            browser.driver.findElement(by.css("[data-segment='cars'][class='cars']")).then(function (globalNavCarElement) {
                globalNavCarElement.click();
                expect(browser.driver.isElementPresent(by.css("[class='segment cars']"))).toBe(true);
            });
        });
    });

    it('verify that it exists only six cars in Cars section', function () {

        var EXPECTED_CAR_SIZE = 6;

        browser.driver.findElement(by.css("[data-segment='cars'][class='cars']")).then(function (globalNavCarElement) {
            globalNavCarElement.click();
            browser.driver.findElement(by.css("[class='segment cars']")).then(function (carsPanel) {
                var carItems = carsPanel.findElements(by.css(".vehicle")); //TODO podria ser mas ajustado??
                carItems.then(function (carItemsValue) { //eleiminar la variable tal vez????????? y ver otros casos...
                    expect(carItemsValue.length).toBe(EXPECTED_CAR_SIZE);
                }, function (error) {
                    console.log(error);
                });
            });
        });

    });

    it('verify that fiesta, focus, mustang, c-max, fusion and taurus exist in Cars section', function () {

        browser.driver.findElement(by.css("[data-segment='cars'][class='cars']")).then(function (globalNavCarElement) {
            globalNavCarElement.click();
            browser.driver.findElement(by.css("[class='segment cars']")).then(function (carsPanel) {
                expect(carsPanel.isElementPresent(by.partialLinkText("FIESTA"))).toBe(true);
                expect(carsPanel.isElementPresent(by.partialLinkText("FOCUS"))).toBe(true);
                expect(carsPanel.isElementPresent(by.partialLinkText("MUSTANG"))).toBe(true);
                expect(carsPanel.isElementPresent(by.partialLinkText("C-MAX"))).toBe(true);
                expect(carsPanel.isElementPresent(by.partialLinkText("FUSION"))).toBe(true);
                expect(carsPanel.isElementPresent(by.partialLinkText("TAURUS"))).toBe(true);
            });
        });
    });

    it('verify that it exists in Cars section all the cars ordered from left to right with MSRP ascending', function () {

        var msrpActual = [];
        var msrpExpected = [];

        browser.driver.findElement(by.css("[data-segment='cars'][class='cars']")).then(function (globalNavCarElement) {
            globalNavCarElement.click();
            browser.driver.findElement(by.css("[class='segment cars']")).then(function (carsPanel) {
                var carItems = carsPanel.findElements(by.css(".vehicle")); //TODO podria ser mas ajustado???
                carItems.then(function (carItemsValue) {

                    browser.driver.wait(function () {
                        for (var i = 0; i < carItemsValue.length; i++) {
                            (function (e1) {
                                carItemsValue[e1].findElement(by.css(".shop-pricing-price")).then(function (carItemsValueMsrp) {
                                    carItemsValueMsrp.getText().then(function (mrspText) {
                                        msrpActual[e1] = mrspText;
                                    });
                                })
                            })(i); //note we handle with a wrapper the i variable used in the closure
                        }
                        return true;
                    }).then(function () {
                        msrpExpected = msrpActual.slice(0);
                        msrpExpected.sort();
                        expect(arraysEqual(msrpActual, msrpExpected)).toBe(true);
                    });

                });
            });
        });
    });

});

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    for (var i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i])
            return false;
    }

    return true;
}