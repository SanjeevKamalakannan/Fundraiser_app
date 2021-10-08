const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.getAllStartups
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.get(
    "/api/test/createStartup",
    [authJwt.verifyToken],
    controller.createStartup
  );
  app.post(
    "/api/test/user/startup",
    [authJwt.verifyToken],
    controller.findStartupById
  );
  app.post(
    "/api/test/user/startup/update",
    [authJwt.verifyToken],
    controller.updateStartupById
  );
  app.post(
    "/api/test/user/profile",
    [authJwt.verifyToken],
    controller.getUserStartups
  );
  app.post(
    "/api/test/user/profile/startup/update",
    [authJwt.verifyToken],
    controller.updateStartupDetailsById
  );
  app.post(
    "/api/test/user/profile/addStartup",
    [authJwt.verifyToken],
    controller.createStartup
  );
  app.post(
    "/api/test/admin/deleteStartup",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteStartup
  );
};
