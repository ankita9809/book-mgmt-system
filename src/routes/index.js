const { checkCustomToken } = require("../middleware/customToken");

exports.BooksRoutes = (app) => {
  app.use(checkCustomToken, require("./books"));
};