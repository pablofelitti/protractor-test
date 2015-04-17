describe('ford mobile footer page links', function () {

    it('showroom page can be entered', function () {

        browser.driver.get(browser.baseUrl);

        var footer = browser.driver.findElement(by.tagName("footer"));
        var menuList = footer.findElement(by.id("global-large-menu"));
        var carsLink = menuList.findElement(by.partialLinkText("CARS"));

        carsLink.click();

        expect(browser.driver.getCurrentUrl()).toBe(browser.baseUrl + "/showroom.html/#cars");
    });

    it("11 cars only exist in showroom", function () {

        var CAR_SIZE = 11;

        browser.driver.get(browser.baseUrl);

        var carsLink = browser.driver.findElement(by.partialLinkText("CARS"));

        carsLink.click();

        var cars = browser.driver.findElement(by.css("[data-show=crossovers]"));
        var carItems = cars.findElements(by.css(".sh-vehicle-item"));

        carItems.then(function (carItemsValue) {
            expect(carItemsValue.length).toBe(CAR_SIZE);
        }, function (error) {
            console.log(error);
        });
    })
});