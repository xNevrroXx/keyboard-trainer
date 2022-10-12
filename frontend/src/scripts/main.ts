// owm modules
import plugToImgOnError from "./modules/plugToImgOnError";
import scaleElements from "./modules/scaleElements";
import authorize from "./modules/authorize";
import navMenu from "./modules/navMenu";
import login from "./pagesSplitting/login";
import recovery from "./pagesSplitting/recovery";
import testing from "./pagesSplitting/testing";
import results from "./pagesSplitting/results";
// types
import {IMatchPagesUrl} from "./types";


const MAIN_URL = "http://localhost:5001";
const MATCH_PAGES_URL: IMatchPagesUrl = {
  "profile": {
    pathname: "/profile",
    possibleHashValue: [],
    possibleSearchValue: []
  },
  "editprofile": {
    pathname: "/editprofile",
    possibleHashValue: [],
    possibleSearchValue: []
  },
  "login": {
    pathname: "/login",
    possibleHashValue: ["#sign-in", "#register"],
    possibleSearchValue: []
  },
  "testing": {
    pathname: "/testing",
    possibleHashValue: [],
    possibleSearchValue: []
  },
  "results": {
    pathname: "/results",
    possibleHashValue: [],
    possibleSearchValue: []
  },
  "recovery": {
    pathname: "/recovery",
    possibleHashValue: [],
    possibleSearchValue: []
  },
}

window.addEventListener("DOMContentLoaded", async () => {
  navMenu();
  plugToImgOnError();
  await authorize();

  scaleElements(document.querySelector("body"), document.querySelectorAll("body > *"));
  window.addEventListener("resize", () => {
    scaleElements(document.querySelector("body"), document.querySelectorAll("body > *"));
  })

  console.log(window.location)
  if (window.location.pathname === MATCH_PAGES_URL["testing"].pathname) {
    testing(MATCH_PAGES_URL);
  } else if (window.location.pathname === MATCH_PAGES_URL["results"].pathname) {
    results();
  } else if (window.location.pathname === MATCH_PAGES_URL["login"].pathname) {
    login(MATCH_PAGES_URL);
  } else if (window.location.pathname === MATCH_PAGES_URL["recovery"].pathname) {
    recovery();
  } else if (window.location.pathname === MATCH_PAGES_URL["profile"].pathname) {

  } else if (window.location.pathname === MATCH_PAGES_URL["editprofile"].pathname) {

  } else if (window.location.pathname === "/") {
    window.location.href = MATCH_PAGES_URL["testing"].pathname;
  }
})