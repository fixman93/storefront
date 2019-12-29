const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy(["/public"], {
      target: "http://api-test.services.distll.com"
    })
  );
};

// app.use (
//   proxy(['/public', '/cart'], {target: "https://api-test.services.distll.com",
// changeOrigin: true}));
