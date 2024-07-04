# Magic Transporters API Documentation

Welcome to the Magic Transporters API documentation. This API project was developed to test my knowledge for a Node.js Developer position at Unifi Solutions. The API allows you to manage and interact with the transportation services offered by Magic Transporters.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Technologies Used](#technologies-used)
4. [Swagger Documentation](#swagger-documentation)
5. [Error Handling](#error-handling)
6. [Automated Testing](#automated-testing)

## Getting Started

To start using the Magic Transporters API, you need to set up the application and generate the models using Prisma. Follow the steps below to get started:

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (v18.x or later)
- npm (v6.x or later)
- Prisma CLI
- MongoDB Server

### Clone the Repository

First, clone the Magic Transporters API repository from GitHub:

```bash
git clone https://github.com/kadukko/magic-transporters-api.git
cd magic-transporters-api
```

### Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
npm install
```

### Generate Prisma Models

Prisma is used for database schema management and querying. To generate the Prisma models, run the following command:

```bash
npx prisma generate
```

This command reads the `schema.prisma` file located in the `prisma` directory and generates the Prisma Client, which is a type-safe query builder for your database. The generated client will be located in the `node_modules/@prisma/client` directory.

### Environment Variables Configuration

The Magic Transporters API requires certain environment variables to be set for proper configuration. Create a `.env` file in the root of your project and define the following variables:

### Example `.env` file

```env
DATABASE_URL="mongodb+srv://user:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority"
```

- `DATABASE_URL`: The connection string for your MongoDB database. Replace `user`, `password`, `cluster`, and `database_name` with your actual MongoDB credentials and database name.

This environment variable is used by Prisma to connect to your MongoDB database. Ensure that your MongoDB server is running and accessible.

### Build the Application

To build the application, run:

```bash
npm run build
```

This will compile the TypeScript code to JavaScript and output the result in the `dist` directory.

### Run the Application

Before running the application, ensure that the environment variables are configured properly. Then, you can start the server with:

```bash
npm start
```

The server should now be running, and you can start making API requests to `http://localhost:4000`.

## Technologies Used

The Magic Transporters API utilizes the following technologies:

- **Node.js (v18.x or later)**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **MongoDB**: A document-based NoSQL database used for storing application data.
- **Prisma**: An ORM (Object-Relational Mapping) tool for database schema management and querying.
- **TypeScript**: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- **Jest**: A delightful JavaScript testing framework with a focus on simplicity.
- **Swagger**: A tool for API design and documentation that helps create interactive API documentation.

## Swagger Documentation

The Magic Transporters API provides interactive API documentation using Swagger. You can access the Swagger UI to explore and test the API endpoints.

**Endpoint**: `GET /swagger`

Access the Swagger documentation at:

```
http://localhost:4000/swagger
```

This documentation provides detailed information about the available endpoints, request parameters, and response formats.

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of an API request. 

- `200 OK`: The request was successful.
- `400 Bad Request`: The request was invalid or cannot be otherwise served.
- `404 Not Found`: The requested resource could not be found.
- `500 Internal Server Error`: An error occurred on the server.

## Automated Testing

Automated tests are crucial for ensuring the reliability and stability of the Magic Transporters API. We use Jest for our testing framework.

### Controller Tests

The tests created are responsible for testing each controller of the API. These tests ensure that all endpoints and their respective functionalities work as expected. The controller tests are located in the `src/controllers` directory.

### Running the Tests

To run the tests, ensure your development environment is set up correctly and your database is running. Then execute:

```bash
npm run test
```

The test results will be displayed in the console, indicating the number of tests passed and failed.