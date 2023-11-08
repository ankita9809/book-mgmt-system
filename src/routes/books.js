const router = require("express").Router();

const bookController = require("../controllers/bookController");

router.post("/books", bookController.addBooks);
router.get("/books", bookController.getBooks);
router.get("/books-by-id", bookController.getBookByID);
router.put("/books", bookController.updateBookByID);
router.delete("/books", bookController.deleteBookByID);

module.exports = router;