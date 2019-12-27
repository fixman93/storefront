const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy(["/public", "/cart", "/order"], {
      target: "https://api-test.services.distll.com",
      changeOrigin: true
    })
  );
};

// app.use (
//   proxy(['/public', '/cart'], {target: "https://api-test.services.distll.com",
// changeOrigin: true}));
