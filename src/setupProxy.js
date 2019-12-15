const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/public", {
      target: "https://api-test.services.distll.com",
      changeOrigin: true
    })
  );
};
