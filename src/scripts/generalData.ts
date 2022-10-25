import {IBackendUrls, IMatchPagesUrl} from "./types";

const MAIN_URL = "http://localhost:5000";
// frontend urls
const MATCH_PAGES_URL: IMatchPagesUrl = {
  "profile": {
    pathname: "/profile",
  },
  "editprofile": {
    pathname: "/profile/edit",
  },
  "login": {
    pathname: "/login",
    possibleHashValue: {
      "sign-in": "#sign-in",
      "register": "#register"
    },
  },
  "testing": {
    pathname: "/testing",
  },
  "testing-custom": {
    pathname: "/testing/custom"
  },
  "trainer": {
    pathname: "/trainer"
  },
  "results": {
    pathname: "/results",
  },
  "recovery": {
    pathname: "/recovery",
    possibleHashValue: {
      "email": "#email",
      "code": "#code",
      "password": "#password"
    }
  },
  // not for html routes
  "assets": {
    pathname: "/assets",
    possibleSearchValue: {
      "file": "?file"
    }
  },
}

// backend urls
const BACKEND_MAIN_URL = MAIN_URL + "/api";
const MATCH_BACKEND_URL: IBackendUrls = {
  login: BACKEND_MAIN_URL + "/login",
  register: BACKEND_MAIN_URL + "/register",
  refreshToken: BACKEND_MAIN_URL + "/refreshtoken",
  logout: BACKEND_MAIN_URL + "/logout",
  authenticate: BACKEND_MAIN_URL + "/authenticate",
  recover: {
    stageEmail: BACKEND_MAIN_URL + "/recover/getcode",
    stageCode: BACKEND_MAIN_URL + "/recover/verifycode",
    stagePassword: BACKEND_MAIN_URL + "/recover/changepassword"
  },
  resetProgress: BACKEND_MAIN_URL + "/resetprogress",
  deleteAccount: BACKEND_MAIN_URL + "/deleteaccount",
  changePassword: BACKEND_MAIN_URL + "/changepassword",
  changeMainData: BACKEND_MAIN_URL + "/changemaindata",
  statistic: BACKEND_MAIN_URL + "/statistic"
};

// keyboard functional
const ENGLISH_ALPHABET: string = 'abcdefghijklmnopqrstuvwxyz';
const RUSSIAN_ALPHABET: string = "абвгдеёжзийклмопрстуфхцчшщъэюя";
const SPECIAL_SYMBOLS: string = "(!@#$%^&*";
const DIGITS: string = "0123456789";

export { ENGLISH_ALPHABET, RUSSIAN_ALPHABET, SPECIAL_SYMBOLS, DIGITS, MAIN_URL, BACKEND_MAIN_URL, MATCH_PAGES_URL, MATCH_BACKEND_URL };