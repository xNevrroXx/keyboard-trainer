import {IBackendUrls, IMatchPagesUrl} from "./types";

const MAIN_URL = "http://localhost:5000";
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

const backendMainUrlStr = "http://localhost:5000";
const MATCH_BACKEND_URL: IBackendUrls = {
  login: backendMainUrlStr + "/login",
  register: backendMainUrlStr + "/register",
  refreshToken: backendMainUrlStr + "/refreshtoken",
  logout: backendMainUrlStr + "/logout",
  authenticate: backendMainUrlStr + "/authenticate",
  recover: {
    stageEmail: backendMainUrlStr + "/recover/getcode",
    stageCode: backendMainUrlStr + "/recover/verifycode",
    stagePassword: backendMainUrlStr + "/recover/changepassword"
  },
  resetProgress: backendMainUrlStr + "/resetprogress",
  deleteAccount: backendMainUrlStr + "/deleteaccount",
  changePassword: backendMainUrlStr + "/changepassword",
  changeMainData: backendMainUrlStr + "/changemaindata",
  statistic: backendMainUrlStr + "/statistic"
};


const ENGLISH_ALPHABET: string = 'abcdefghijklmnopqrstuvwxyz';
const RUSSIAN_ALPHABET: string = "абвгдеёжзийклмопрстуфхцчшщъэюя";
const SPECIAL_SYMBOLS: string = "(!@#$%^&*";
const DIGITS: string = "0123456789";

export { ENGLISH_ALPHABET, RUSSIAN_ALPHABET, SPECIAL_SYMBOLS, DIGITS, MAIN_URL, MATCH_PAGES_URL, MATCH_BACKEND_URL };