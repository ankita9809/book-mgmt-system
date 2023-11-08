const mongoose = require("mongoose");

const {
  successResponse,
  clientErrorResponse,
  serverErrorResponse,
} = require("../utils/response");
const { Book } = require("../models/books");

/**
 * @function addBooks
 * @description function to add books
 * @method POST
 * @author Ankita
 */
exports.addBooks = async (req, res) => {
  try {
    if (!req.body.title)
      return clientErrorResponse(res, "Book Title is Required!");

    req.body.title = req.body.title
      .trim()
      .split(" ")
      .map((e) => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase())
      .join(" ");

    let isPresent = await Book.findOne(
      {
        title: { $regex: new RegExp("^" + req.body.title + "$", "i") },
        isDeleted: false,
      },
      { _id: 1 }
    );

    //Storing the data in first uppercase letter for easy understanding.
    if (isPresent) return clientErrorResponse(res, "Book is Already Added!");
    req.body.title = req.body.title
      .trim()
      .split(" ")
      .map((e) => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase())
      .join(" ");

    if (!req.body.author)
      return clientErrorResponse(res, "Author is Required!");

    if (!req.body.description)
      return clientErrorResponse(res, "Description is required!");

    if (!req.body.price)
      return clientErrorResponse(res, "Book Price is Required!");

    await Book.create(req.body);

    return successResponse(res, "Book Added Successfully!");
  } catch (error) {
    return serverErrorResponse(res);
  }
};

/**
 * @function getBooks
 * @description function to get all books
 * @method GET
 * @author Ankita
 */
exports.getBooks = async (req, res) => {
  try {
    let getData = await Book.find(
      { isDeleted: false },
      { isDeleted: 0, createdAt: 0, updatedAt: 0 }
    );
    return successResponse(res, "All Books Data", getData);
  } catch (error) {
    return serverErrorResponse(res);
  }
};

/**
 * @function getBookByID
 * @description function to get book by ID
 * @method GET
 * @author Ankita
 */
exports.getBookByID = async (req, res) => {
  try {
    if (!req.query.book_id)
      return clientErrorResponse(res, "Book ID is Required!");
    if (!mongoose.isValidObjectId(req.query.book_id))
      return clientErrorResponse(res, "Invalid Book ID!");

    let getBook = await Book.findOne(
      { _id: req.query.book_id, isDeleted: false },
      { isDeleted: 0, createdAt: 0, updatedAt: 0 }
    );
    if (!getBook) return clientErrorResponse(res, "No Such Book Found!");

    return successResponse(res, `Details of ${getBook.title} Book`, getBook);
  } catch (error) {
    return serverErrorResponse(res);
  }
};

/**
 * @function updateBookByID
 * @description function to update book by ID
 * @method PUT
 * @author Ankita
 */
exports.updateBookByID = async (req, res) => {
  try {
    if (!req.body.book_id)
      return clientErrorResponse(res, "Book ID is Required!");
    if (!mongoose.isValidObjectId(req.body.book_id))
      return clientErrorResponse(res, "Invalid Book ID!");

    let isPresent = await Book.findOne(
      { _id: req.body.book_id, isDeleted: false },
      { _id: 1, title: 1 }
    );
    if (!isPresent) return clientErrorResponse(res, "No Such Book Found!");

    //Checking for if the book with same title is already present or not in db
    if (req.body.title && req.body.title !== "") {
      req.body.title = req.body.title
        .trim()
        .split(" ")
        .map((e) => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase())
        .join(" ");
      if (isPresent.title !== req.body.title) {
        const fetchedBook = await Book.findOne(
          { title: req.body.title, isDeleted: false },
          { title: 1 }
        );
        if (fetchedBook)
          return clientErrorResponse(res, "Book Already Exists!");
      }
    }

    await Book.updateOne({ _id: req.body.id, isDeleted: false }, req.body, {
      new: true,
    });

    return successResponse(res, "Book Data Updated Successfully!");
  } catch (error) {
    return serverErrorResponse(res);
  }
};

/**
 * @function deleteBookByID
 * @description function to delete book by ID
 * @method DELETE
 * @author Ankita
 */
exports.deleteBookByID = async (req, res) => {
  try {
    if (!req.body.book_id)
      return clientErrorResponse(res, "Book ID is Required!");
    if (!mongoose.isValidObjectId(req.body.book_id))
      return clientErrorResponse(res, "Invalid Book ID!");

    let deleteBook = await Book.updateOne(
      { _id: req.body.book_id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (deleteBook.modifiedCount === 0)
      return clientErrorResponse(res, "No Such Book Available!");
    return successResponse(res, "Book Deleted Successfully!");
  } catch (error) {
    return serverErrorResponse(res);
  }
};