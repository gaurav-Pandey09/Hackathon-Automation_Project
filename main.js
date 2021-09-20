const puppeteer = require("puppeteer");
console.log(process.argv);

//write the checkin and checkout date in given format with city to search for hotels in the given city
let city = process.argv[2];
let checkInDate = process.argv[3]; //Tue Sep 21 2021
let checkOutDate = process.argv[4]; //Tue Sep 21 2021

//create headless browser
let browserStartPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized", "--disable notifications"],
});

let page;
browserStartPromise
  .then((browserObject) => {
    console.log("Browser opened");
    let browserTabOpenPromise = browserObject.newPage();
    return browserTabOpenPromise;
  })
  .then((newTab) => {
    page = newTab;
    let gPageOpenPromise = newTab.goto("https://www.google.com");
    console.log("New page opened");
    return gPageOpenPromise;
  })
  .then(() => {
    console.log("Google page opened");
    //keyboard data entry
    let waitForTypingPromise = page.type(
      "input[title='Search']",
      "make my trip"
    );
    return waitForTypingPromise;
  })
  .then(() => {
    //keyboard -> specific keys
    let enterWillBeDonePromise = page.keyboard.press("Enter", { delay: 100 });
    return enterWillBeDonePromise;
  })
  .then(() => {
    let wcPromise = handleIfNotPresent(".LC20lb.DKV0Md", page);
    return wcPromise;
  })
  .then(() => {
    let wCPromise = handleIfNotPresent(".#lp_modal_close", page);
    return wCPromise;
  })
  .then(() => {
    let waitForLoginFnPromise = waitAndClick(
      ".makeFlex.column.flexOne.whiteText.latoBold",
      page
    );
    return waitForLoginFnPromise;
  })
  .then(() => {
    console.log("Wait for the sign in page to open");
    let waitForSignUpPromise = page.waitForSelector("#username", {
      visible: true,
    });
    return waitForSignUpPromise;
  })
  .then(() => {
    console.log("Enter Details");
    let userNamePromise = page.type("#username", "hitoxem457@soulsuns.com", {
      delay: 50,
    });
    return userNamePromise;
  })
  .then(() => {
    console.log("Sign up");
    let signInPromise = page.keyboard.press("Enter", { delay: 100 });
    return signInPromise;
  })
  .then(() => {
    console.log("Wait for the sign in page to open");
    let waitForSignUpPromise = page.waitForSelector("#password", {
      visible: true,
    });
    return waitForSignUpPromise;
  })
  .then(() => {
    let userMailPromise = page.type("#password", "HelloThere@123", {
      delay: 50,
    });
    return userMailPromise;
  })
  .then(() => {
    console.log("Sign up");
    let signInPromise = page.keyboard.press("Enter", { delay: 100 });
    return signInPromise;
  })
  .then(() => {
    let waitFor3SecPromise = page.waitFor(3000);
    return waitFor3SecPromise;
  })
  .then(() => {
    let waitFilterPromise = waitAndClick(".menu_Hotels", page);
    console.log("Select hotels");
    return waitFilterPromise;
  })

  .then(() => {
    let waitForCityPromise = waitAndClick("#city", page);
    return waitForCityPromise;
  })
  .then(() => {
    let waitFor3SecPromise = page.waitFor(2000);
    return waitFor3SecPromise;
  })
  .then(() => {
    console.log("Selecting city");
    //keyboard data entry
    let waitForTypingPromise = page.type(
      ".react-autosuggest__input.react-autosuggest__input--open",
      city
    );
    return waitForTypingPromise;
  })
  .then(() => {
    //keyboard -> specific keys
    let enterWillBeDonePromise = page.keyboard.press("Enter", { delay: 100 });
    return enterWillBeDonePromise;
  })
  .then(() => {
    let clickCityPromise = waitAndClick(
      "#react-autowhatever-1-section-0-item-0",
      page
    );
    return clickCityPromise;
  })
  .then(() => {
    //keyboard -> specific keys
    let enterWillBeDonePromise = page.keyboard.press("Enter", { delay: 100 });
    return enterWillBeDonePromise;
  })
  .then(() => {
    let checkInPromise = waitAndClick(`[aria-label='${checkInDate}']`, page);
    return checkInPromise;
  })
  .then(() => {
    let checkOutPromise = waitAndClick(`[aria-label='${checkOutDate}']`, page);
    return checkOutPromise;
  })
  .then(() => {
    let numberOfGuestsPromises = waitAndClick(".roomGuests", page);
    return numberOfGuestsPromises;
  })
  // .then(() => {
  //   let numberOfAdultsPromise = page.$$(".addRooomDetails");
  //   console.log(numberOfAdultsPromise);
  //   return numberOfAdultsPromise;
  // })
  // .then((array) => {
  //   console.log(array);
  //   let checkInPromise = array[0].click();
  //   return checkInPromise;
  // })
  // .then((adults) => {
  //   let adultsArrayPromise = page.$$(adults);
  //   return adultsArrayPromise;
  // })
  // .then((array) => {
  //   let numberOfAdultsPromise = waitAndClick(array[1], page);
  //   return numberOfAdultsPromise;
  // });
  .then(() => {
    let applyPromise = waitAndClick(".primaryBtn.btnApply", page);
    return applyPromise;
  })
  .then(() => {
    let searchPromise = waitAndClick("#hsw_search_button", page);
    return searchPromise;
  })
  .then(() => {
    let waitFor3SecPromise = page.waitFor(5000);
    return waitFor3SecPromise;
  });
// .then(() => {
//   let evaluatePromise = page.evaluate(() => {
//     let arr = document.querySelector("#seoH1DontRemove");
//     console.log(arr);
//     return arr;
//   });
//   return evaluatePromise;
// })
// .then((array) => {
//   console.log(array);
// });
// .then((url) => {
//   console.log(decodeURIComponent(url));
//   let url2 =
//     "https://www.makemytrip.com/hotels/hotel-listing/?checkin=09222021&city=CTGOI&checkout=09232021&roomStayQualifier=2e0e&locusId=CTGOI&country=IN&locusType=city&searchText=Goa,%20India&visitorId=7f8d5042-cf87-4d71-8cf8-df5d0d41e4a6&regionNearByExp=3";
//   request(url2, cb);

//   function cb(error, response, html) {
//     console.log("object");
//     if (error) {
//       console.error("error:", error); // Print the error if one occurred
//     } else if (response.statusCode == 404) {
//       console.log("Page Not Found");
//     } else {
//       // console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
//       // console.log("body:", html); // Print the HTML for the Google homepage.
//       dataExtractor(html);
//       console.log(html);
//     }
//   }

//   function dataExtractor(html) {
//     //search tool
//     let searchTool = cheerio.load(html);
//     let hotelArray = searchTool(".infinite-scroll-component");
//     for (let i = 0; i < hotelArray.length; i++) {
//       console.log(hotelArray[i]);
//     }
//   }
// });

//------------Wait and Click function--------------------
function waitAndClick(selector, cPage) {
  return new Promise((resolve, reject) => {
    //wait for element to be visible on page
    let waitForTheElementPromise = cPage.waitForSelector(selector, {
      visible: true,
    });
    waitForTheElementPromise
      .then(() => {
        let elementClickPromise = cPage.click(selector);
        return elementClickPromise;
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

//promise -> promise banner present or not -> code will run
function handleIfNotPresent(selector, cPage) {
  return new Promise((resolve, reject) => {
    let waitAndClickPromise = waitAndClick(selector, cPage);
    waitAndClickPromise
      .then(() => {
        resolve();
      })
      .catch((err) => {
        resolve();
      });
  });
}
