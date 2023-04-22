// owm modules
import navMenu from "./modules/navMenu";
import burger from "./modules/burger";
// import login from "./pagesSplitting/login";
// import recovery from "./pagesSplitting/recovery";
// import testing from "./pagesSplitting/testing";
// import results from "./pagesSplitting/results";
// import editProfile from "./pagesSplitting/editProfile";
// import profile from "./pagesSplitting/profile";
// import testingCustom from "./pagesSplitting/testingCustom";
// import trainer from "./pagesSplitting/trainer";
// general statisticData
import {MATCH_PAGES_URL} from "./generalData";


window.addEventListener("DOMContentLoaded", async () => {
  navMenu();
  burger();

  if (window.location.pathname === MATCH_PAGES_URL["testing"].pathname) {
    const testing = await import("./pagesSplitting/testing");
    testing.default();
  } else if (window.location.pathname === MATCH_PAGES_URL["testing-custom"].pathname) {
    const testingCustom = await import("./pagesSplitting/testingCustom");
    testingCustom.default();
  } else if (window.location.pathname === MATCH_PAGES_URL["trainer"].pathname) {
    const trainer = await import("./pagesSplitting/trainer");
    trainer.default()
  } else if (window.location.pathname === MATCH_PAGES_URL["results"].pathname) {
    const results = await import("./pagesSplitting/results");
    results.default();
  } else if (window.location.pathname === MATCH_PAGES_URL["login"].pathname) {
    const login = await import("./pagesSplitting/login");
    login.default();
  } else if (window.location.pathname === MATCH_PAGES_URL["recovery"].pathname) {
    const recovery = await import("./pagesSplitting/recovery");
    recovery.default();
  } else if (window.location.pathname === MATCH_PAGES_URL["profile"].pathname) {
    const profile = await import("./pagesSplitting/profile");
    profile.default();
  } else if (window.location.pathname === MATCH_PAGES_URL["editprofile"].pathname) {
    const editProfile = await import("./pagesSplitting/editProfile");
    editProfile.default();
  } else if (window.location.pathname === "/") {
    window.location.href = MATCH_PAGES_URL["testing"].pathname;
  }
})