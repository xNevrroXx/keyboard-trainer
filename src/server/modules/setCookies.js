// todo !!!  request confirmation of cookies from the user logging in
const ageExpiresCookie = 864e5; // 24 hours
const options = {
  httpOnly: false,
  secure: false,
  path: "/",
  sameSite: "Lax",
  maxAge: ageExpiresCookie
  // domain: www.site.com
}

function setCookies(response, arrCookies = []) {
  arrCookies.forEach(cookie => {
    for (const cookieKey in cookie) {
      if("modifyOptions" in cookie && cookieKey !== "modifyOptions") {
        response.cookie(cookieKey, cookie[cookieKey], {
          ...options,
          ...cookie["modifyOptions"]
        });
      } else if (cookieKey !== "modifyOptions") {
        response.cookie(cookieKey, cookie[cookieKey], options);
      }
    }
  })
}

module.exports = setCookies;