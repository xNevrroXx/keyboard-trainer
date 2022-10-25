// owm modules
import scaleElements from "./modules/scaleElements";
import navMenu from "./modules/navMenu";
import login from "./pagesSplitting/login";
import recovery from "./pagesSplitting/recovery";
import testing from "./pagesSplitting/testing";
import results from "./pagesSplitting/results";
import editProfile from "./pagesSplitting/editProfile";
import profile from "./pagesSplitting/profile";
import testingCustom from "./pagesSplitting/testingCustom";
// general statisticData
import {MATCH_PAGES_URL} from "./generalData";
import trainer from "./pagesSplitting/trainer";


window.addEventListener("DOMContentLoaded", async () => {
  navMenu();

  // scaleElements(document.querySelector("body"), document.querySelectorAll("body > *"));
  // window.addEventListener("resize", () => {
  //   scaleElements(document.querySelector("body"), document.querySelectorAll("body > *"));
  // })

  if (window.location.pathname === MATCH_PAGES_URL["testing"].pathname) {
    testing();
  } else if (window.location.pathname === MATCH_PAGES_URL["testing-custom"].pathname) {
    testingCustom();
  } else if (window.location.pathname === MATCH_PAGES_URL["trainer"].pathname) {
    trainer()
  } else if (window.location.pathname === MATCH_PAGES_URL["results"].pathname) {
    results();
  } else if (window.location.pathname === MATCH_PAGES_URL["login"].pathname) {
    login();
  } else if (window.location.pathname === MATCH_PAGES_URL["recovery"].pathname) {
    recovery();
  } else if (window.location.pathname === MATCH_PAGES_URL["profile"].pathname) {
    profile();
  } else if (window.location.pathname === MATCH_PAGES_URL["editprofile"].pathname) {
    editProfile();
  } else if (window.location.pathname === "/") {
    window.location.href = MATCH_PAGES_URL["testing"].pathname;
  }
})