# Market API - README

# Overview
Market API is a Flask-based web application designed for managing an online marketplace. It features functionalities such as user authentication, product listing, reviews, and shopping cart management. The application utilizes Flask-SQLAlchemy for database interactions and Flask-JWT-Extended for JWT-based authentication.

# Installation
Prerequisites
Python 3.x
pip (Python package installer)
PostgreSQL database
# Steps to Install
Clone the Repository:

git clone [repository_url]
cd [repository_name]

# Install Dependencies:

pip install -r requirements.txt
# Set up the Database:

Create a PostgreSQL database.
Update the SQLALCHEMY_DATABASE_URI in the app configuration with your database credentials.

# Initialize the Database:



flask db init
flask db migrate
flask db upgrade
# Run the Application:
flask run

# Features

User Authentication: Secure signup and login with JWT tokens.
Product Management: Add, update, delete, and list products.
Reviews: Users can post reviews for products.
Shopping Cart: Manage shopping cart items.
Filtering and Sorting: Retrieve products based on different criteria like category, highest rated, new arrivals, etc.

# Endpoints
User Authentication
POST /signup: Register a new user.
POST /login: Authenticate a user and receive a JWT.
# Product Management
GET /products: List all products.
POST /api/products: Add a new product.
PATCH /api/product/<int:product_id>: Update a product.
DELETE /api/product/<int:product_id>: Delete a product.
# Reviews
GET /product/<int:product_id>/reviews: Get reviews for a product.
POST /product/<int:product_id>/review: Add a review for a product.
#Shopping Cart
GET /api/cart: Retrieve cart items for the logged-in user.
POST /api/cart: Add an item to the cart.
PUT /api/cart/<int:item_id>: Update a cart item.
DELETE /api/cart/<int:item_id>: Remove a cart item.
# User Information
GET /api/user: Retrieve information about the logged-in user.
GET /user/products: Get products added by the logged-in user.
# Development
Flask: Web framework.
SQLAlchemy: ORM for database interactions.
Flask-Migrate: Database schema migrations.
Flask-JWT-Extended: JWT-based authentication.
Werkzeug: Password hashing and checking.
Faker: Data seeding for testing

# Testing
   pytest
  
