// own modules
const {validateTokenAccessBind} = require("../../../modules/validateToken");
const {searchData, customQuery} = require("../../../modules/database");
const {getRandomText} = require("../../../modules/getRandomText");


const mainContainerTypes = {
  "body-container-main": "body-container-main",
  "body-container-full-page": "body-container-full-page"
};

function htmlPages(app, db) {
  app.get("/profile",
    (request, response, next) => validateTokenAccessBind(request, response, next, false),
    async (request, response) => {
      const user = request.user;
      const isUser = request.isUser;


      if (isUser) {
        const averageSpeedUserQueryResult = await customQuery(db, `SELECT AVG(speed_value) as "speed" FROM user_statistic_typing`);
        const averageAccuracyUserQueryResult = await customQuery(db, `SELECT AVG(accuracy_value) as "accuracy" FROM user_statistic_typing`);
        const avgStatistic = {
          speed: Math.floor(averageSpeedUserQueryResult.result[0].speed) || 0,
          accuracy: Math.floor(averageAccuracyUserQueryResult.result[0].accuracy) || 0
        }

        response.render("profile", {
          title: "Profile Keyboard trainer - govorov",
          mainContainerClass: mainContainerTypes["body-container-main"],
          userData: { // todo mock value(helpers)
            exist: true,
            name: user.name,
            imagePath: user.imagePath || "/fake"
          },
          statistic: avgStatistic
        })
      } else {
        response.render("profile", {
          title: "Profile Keyboard trainer - govorov",
          mainContainerClass: mainContainerTypes["body-container-main"],
          userData: { // todo mock value(helpers)
            exist: false,
            name: "",
            imagePath: "/fake",
          },
          statistic: {
            speed: 0,
            accuracy: 0
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
    async (request, response) => {
    const user = request.user;
    const isUser = request.isUser;

    const testingText = await getRandomText(2);

    if(isUser) {
      response.render("testing", {
        title: "Testing Keyboard trainer - govorov",
        mainContainerClass: mainContainerTypes["body-container-full-page"],
        testingText: testingText,
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
        testingText: testingText,
        userData: { // todo mock value(helpers)
          exist: false,
          name: "",
          imagePath: "/fake"
        }
      })
    }
  })
  app.get("/trainer",
    (request, response, next) => validateTokenAccessBind(request, response, next, false),
    async (request, response) => {
      const user = request.user;
      const isUser = request.isUser;
      const testingText = await getRandomText(1);

      if(isUser) {
        response.render("trainer", {
          title: "Trainer Keyboard trainer - govorov",
          mainContainerClass: mainContainerTypes["body-container-full-page"],
          testingText: testingText,
          userData: { // todo mock value(helpers)
            exist: true,
            name: user.name,
            imagePath: user.imagePath || "/fake"
          }
        })
      }
      else {
        response.render("trainer", {
          title: "Trainer Keyboard trainer - govorov",
          mainContainerClass: mainContainerTypes["body-container-full-page"],
          testingText: testingText,
          userData: { // todo mock value(helpers)
            exist: false,
            name: "",
            imagePath: "/fake"
          }
        })
      }
    })
  app.get("/testing/custom",
    (request, response, next) => validateTokenAccessBind(request, response, next, false),
    async (request, response) => {
      const user = request.user;
      const isUser = request.isUser;

      if(isUser) {
        response.render("testing-custom", {
          title: "Custom Testing Keyboard trainer - govorov",
          mainContainerClass: mainContainerTypes["body-container-full-page"],
          userData: { // todo mock value(helpers)
            exist: true,
            name: user.name,
            imagePath: user.imagePath || "/fake"
          }
        })
      }
      else {
        response.render("testing-custom", {
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