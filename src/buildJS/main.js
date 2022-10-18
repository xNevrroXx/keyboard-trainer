var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import navMenu from "./modules/navMenu";
import login from "./pagesSplitting/login";
import recovery from "./pagesSplitting/recovery";
import testing from "./pagesSplitting/testing";
import results from "./pagesSplitting/results";
import editProfile from "./pagesSplitting/editProfile";
import { getProfile } from "./services";
const MAIN_URL = "http://localhost:5000";
const MATCH_PAGES_URL = {
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
};
window.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = yield getProfile();
    console.log("authorization: ", authorization);
    navMenu();
    // scaleElements(document.querySelector("body"), document.querySelectorAll("body > *"));
    // window.addEventListener("resize", () => {
    //   scaleElements(document.querySelector("body"), document.querySelectorAll("body > *"));
    // })
    if (window.location.pathname === MATCH_PAGES_URL["testing"].pathname) {
        testing(MATCH_PAGES_URL);
    }
    else if (window.location.pathname === MATCH_PAGES_URL["results"].pathname) {
        results();
    }
    else if (window.location.pathname === MATCH_PAGES_URL["login"].pathname) {
        login(MATCH_PAGES_URL);
    }
    else if (window.location.pathname === MATCH_PAGES_URL["recovery"].pathname) {
        recovery(MATCH_PAGES_URL);
    }
    else if (window.location.pathname === MATCH_PAGES_URL["profile"].pathname) {
    }
    else if (window.location.pathname === MATCH_PAGES_URL["editprofile"].pathname) {
        editProfile(MATCH_PAGES_URL);
    }
    else if (window.location.pathname === "/") {
        window.location.href = MATCH_PAGES_URL["testing"].pathname;
    }
}));
