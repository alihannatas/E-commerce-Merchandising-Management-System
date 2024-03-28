# E-commerce-Merchandising-Management-System

This simple e-commerce application provides a RESTful API for basic functionalities such as adding, updating, deleting products, and filtering products by categories. It is developed using tools like Express.js and Sequelize.

## Getting Started

The following instructions will guide you to clone the project to your local machine and run it.

### Prerequisites

- Node.js (v14 or later versions)
- PostgreSQL
- A RESTful API client (e.g., Postman)

### Installation

Api

1. Clone this repository to your local machine:

git clone https://github.com/alihannatas/E-commerce-Merchandising-Management-System.git

2. Navigate to the project directory:

cd e-commerce-application

3. Install dependencies:

npm install

4. Create your PostgreSQL database and add connection details to the `.env` file:

-DATABASE=your_database_name
-DATABASE_TYPE=postgres /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */ 
-DATABASE_USERNAME=your_database_username
-DATABASE_PASSWORD=your_database_password
-HOST=your_database_host
-PORT=your_database_port

5. Synchronize your database and start the server:

npm start

6. The API should now be running at `http://localhost:3000/api`.

Client

To run the project locally, follow these steps:

1. Navigate to the project directory:

cd client

2. Install dependencies:

npm install

3. Start the project:

npm run dev

4. Visit `http://localhost:5173` in your browser.

## Usage

- On the homepage, you can view existing products.
- You can add new products using the "Add New Product" form.
- Clicking the "Edit" button on products allows you to edit them.
- You can delete products by clicking the "Delete" button.
- You can filter products by using keyword and stock quantity filtering options.
