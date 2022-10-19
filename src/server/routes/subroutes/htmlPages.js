// own modules
const {validateTokenAccessBind} = require("../../modules/validateToken");
const {searchData} = require("../../modules/database");


const mainContainerTypes = {
  "body-container-main": "body-container-main",
  "body-container-full-page": "body-container-full-page"
};

function htmlPages(app, db) {
  app.get("/profile",
    (request, response, next) => validateTokenAccessBind(request, response, next, false),
    (request, response) => {
      const user = request.user;
      const isUser = request.isUser;

      if(isUser) {
        response.render("profile", {
          title: "Profile Keyboard trainer - govorov",
          mainContainerClass: mainContainerTypes["body-container-main"],
          userData: { // todo mock value(helpers)
            exist: true,
            name: user.name,
            imagePath: user.imagePath || "/fake"
          }
        })
      }
      else {
        response.render("profile", {
          title: "Profile Keyboard trainer - govorov",
          mainContainerClass: mainContainerTypes["body-container-main"],
          userData: { // todo mock value(helpers)
            exist: false,
            name: "",
            imagePath: "/fake",
          }
        })
      }
  })

  app.get("/profile/edit",
    (request, response, next) => validateTokenAccessBind(request, response, next, false),
    async (request, response) => {
      const user = request.user;
      const isUser = request.isUser;

      if (isUser) {
        const findingResultUser = await searchData(db, "user", user.id, "id");
        const fullUserData = findingResultUser.data[0];

        response.render("profile-edit", {
          title: "Edit profile Keyboard trainer - govorov",
          mainContainerClass: mainContainerTypes["body-container-main"],
          userData: { // todo mock value(helpers)
            exist: true,
            name: fullUserData.name,
            email: fullUserData.email,
            imagePath: fullUserData.imagePath || "/fake"
          }
        })
      } else {
        response.render("profile-edit", {
          title: "Edit profile Keyboard trainer - govorov",
          mainContainerClass: mainContainerTypes["body-container-main"],
          userData: { // todo mock value(helpers)
            exist: false,
            name: "",
            imagePath: "/fake"
          }
        })
      }
    })

  app.get("/results",
    (request, response, next) => validateTokenAccessBind(request, response, next, false),
    (request, response) => {
    const user = request.user;
    const isUser = request.isUser;

    if(isUser) {
      response.render("results", {
        title: "Results Keyboard trainer - govorov",
        mainContainerClass: mainContainerTypes["body-container-main"],
        userData: { // todo mock value(helpers)
          exist: true,
          name: user.name,
          imagePath: user.imagePath || "/fake"
        }
      })
    }
    else {
      response.render("results", {
        title: "Results Keyboard trainer - govorov",
        mainContainerClass: mainContainerTypes["body-container-main"],
        userData: { // todo mock value(helpers)
          exist: false,
          name: "",
          imagePath: "/fake"
        }
      })
    }
  })

  // this page can be provided to everyone. Both to the authenticating user and not.
  app.get("/testing",
    (request, response, next) => validateTokenAccessBind(request, response, next, false),
    (request, response) => {
    const user = request.user;
    const isUser = request.isUser;

    if(isUser) {
      response.render("testing", {
        title: "Testing Keyboard trainer - govorov",
        mainContainerClass: mainContainerTypes["body-container-full-page"],
        userData: { // todo mock value(helpers)
          exist: true,
          name: user.name,
          imagePath: user.imagePath || "/fake"
        }
      })
    }
    else {
      response.render("testing", {
        title: "Testing Keyboard trainer - govorov",
        mainContainerClass: mainContainerTypes["body-container-full-page"],
        userData: { // todo mock value(helpers)
          exist: false,
          name: "",
          imagePath: "/fake"
        }
      })
    }
  })

  app.get("/login",
    (request, response, next) => validateTokenAccessBind(request, response, next, false),
    (request, response) => {
    response.render("login", {
      title: "Login Keyboard trainer - govorov",
      mainContainerClass: mainContainerTypes["body-container-main"]
    })
  })

  app.get("/recovery",
    (request, response, next) => validateTokenAccessBind(request, response, next, false),
    (request, response) => {
    response.render("recovery", {
      title: "Recovery Keyboard trainer - govorov",
      mainContainerClass: mainContainerTypes["body-container-full-page"],
    })
  })

  app.get("*",
    (request, response, next) => validateTokenAccessBind(request, response, next, false),
    (request, response) => {
    const user = request.user;
    const isUser = request.isUser;

    if(isUser) {
      response.status(404).render("not-found", {
        title: "Keyboard trainer - govorov",
        mainContainerClass: mainContainerTypes["body-container-full-page"],
        userData: { // todo mock value(helpers)
          exist: true,
          name: user.name,
          imagePath: user.imagePath || "/fake"
        }
      })
    }
    else {
      response.status(404).render("not-found", {
        title: "Keyboard trainer - govorov",
        mainContainerClass: mainContainerTypes["body-container-full-page"],
        userData: { // todo mock value(helpers)
          exist: false,
          name: "",
          imagePath: "/fake"
        }
      })
    }
  })
}

module.exports = htmlPages;