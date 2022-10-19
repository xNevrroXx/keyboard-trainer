import {IMatchPagesUrl} from "./types";

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
  "results": {
    pathname: "/results",
  },
  "recovery": {
    pathname: "/recovery",
    possibleSearchValue: {
      "email": "email",
      "code": "code",
      "password": "password"
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

export {MATCH_PAGES_URL, MAIN_URL};