# BOOK MANAGEMENT SYSTEM
Develop a RESTful API using Node.js for managing books

APIs to be created:

1.POST /books - function to add books;
2.GET /books - function to get all books;
3.GET /books-by-id - function to get book by ID;
4.PUT /books - function to update book by ID;
5.DELETE /books - function to delete book by ID;

## PROJECT SETUP

1. Firstly, initialize the git repository using git init .

2. Once it is initialized, use npm init command to install node modules and package.json plus package-lock.json files

3. Once done, install all the necessary node modules like express, mongoose, nodemon, dotenv, body parser.

4. In the root directory, write down your package.json file with name and version details.

5. Once the dependencies are installed, create the folder structure like

- index.js (heart of the project, Write code in index.js to import the required packages from the node_modules and start the server.)
- .env (to store all the environmental variables)
- .gitignore (to untrack the files that git should ignore)
- src folder
- src/routes (For the respective routes of the APIs)
  - src/routes/index.js (Heart of the route folder, to specify all the configuration)
  - src/routes/book.js (contains all the API endpoints)
- src/models/book.js (create a structred schema for the system)
- src/controllers/bookController.js (create every function inside this controller and configure it, so that it is easily accessible by the routes)
- src/middleware/customeToken.js (To secure the routes)
- src/config/database (To configure the database and connect it using URI)
- src/config/env.js (with the help of dot-env dependency, we can easily and securely access the .env variables)
- src/utils/response (this file will have all the ultilites(response function with status codes) to be used throughout the project)

6. Once the project is running successfully, deploy it on the github

## DECISION MAKING

1. To use MongoDB as our Database.
2. To use Mongoose ODM for easier handling of data in MongoDB.
3. To secure the routes by using a customtoken.
4. Using dot-env library for securely accessing environmental variables throughout the project.
5. Creating an easy to understand project structure.
6. Using ExpressJS framework for creating the server side application.
7. Using middlewares for better error handling and security.
8. Describing about the functions before writing it for easy understanding of other developers.
9. Writing comments explaining what each line does.