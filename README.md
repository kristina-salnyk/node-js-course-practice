# NodeJS Course Practice

This Node.js application, built with Express.js, Swagger documentation, TypeScript, and MongoDB integration, aims to
provide a robust and well-documented API for managing movies and genres. The application follows a progressive
development structure, starting with a basic health-check endpoint and gradually evolving into a more complex system
capable of handling CRUD operations for movies and genres, as well as searching for movies by genre.

## Features

#### Node.js Application with Express.js and Swagger Integration

- Express.js Application with TypeScript:

Developed a robust Node.js application using the Express.js framework, seamlessly integrated with TypeScript for
enhanced code quality.

- Health-check Endpoint (/health-check):
  Implemented a health-check endpoint (GET /health-check) to monitor and report the server's operational status.

- Swagger Documentation:

Integrated Swagger documentation for all API endpoints, offering a user-friendly interface to explore and understand the
available functionalities.

#### MongoDB and Movie/Genre APIs

- MongoDB Integration:

Established a connection to a MongoDB database using the Mongoose library, enabling efficient data storage and
retrieval.

- CRUD Operations for "Movies" and "Genres" APIs:

Implemented CRUD operations for managing "Movies" and "Genres," facilitating data manipulation.

- Movie Search by Genre:

Implemented a movie search functionality by genre (e.g., GET /movies/genre/:id), enhancing the user experience with
targeted content retrieval.

#### Unit Testing with Jest

- Testing Environment:

Configured a robust testing environment using Jest, ensuring a reliable platform for unit testing.

- API Unit Tests:

Developed comprehensive unit tests for APIs, covering CRUD operations for both movies and genres, ensuring the
reliability of the core functionalities.

- Movie Genre Search Tests:

Included specific tests for the movie genre search functionality, addressing various scenarios and edge cases to
validate the accuracy of search results.

- High Code Coverage (85%):

Achieved high code coverage in unit tests, excluding services such as database interactions that fall outside the scope
of unit testing.

- Coverage Report:

To access the most recent coverage report, navigate to the **Running Tests** section in the project's README. Refer to
the instructions provided in that section for details on running tests and interpreting the coverage report.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`HOST_URI`: This variable is used to define the connection URI for MongoDB. When setting up your MongoDB instance,
obtain the connection URI and assign it to this variable.

Make sure to include the .env file in your project's root directory and configure it with the appropriate values for the
mentioned environment variables.

## Run Locally

To run the project locally, follow these steps:

1. Clone the project:

```bash
  git clone https://github.com/kristina-salnyk/node-js-course-practice.git
```

2. Go to the project directory:

```bash
  cd node-js-course-practice
```

3. Install dependencies:

```bash
  npm install
```

4. Start the server:

```bash
  npm run start:dev
```

5. Access the application:
   Open your browser and go to http://localhost:3000/api-docs to interact with the Swagger documentation and test the
   API.

## Running Tests

To run unit tests, use the following command:

1. Install dependencies:

```bash
  npm install
```

2. Run tests with coverage:

```bash
  npm run test:coverage
```

This will execute Jest tests and generate a coverage report. The coverage report provides insights into the test
coverage of your application.

3. View Coverage Report:

Once the tests are complete, open the generated coverage report. The report is often available in the coverage
directory. For example, open the index.html file in your browser:

```bash
  open coverage/index.html
```

This will open the coverage report in your default browser, allowing you to analyze the test coverage of your project.
Check the documentation for more details on interpreting test results.

## Documentation

Access Swagger documentation at http://localhost:3000/api-docs when the application is running.

