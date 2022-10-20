/* login to the psql as the defualt user (postgres). */
psql -U postgres

/* Create my database (store) */
CREATE DATABASE Wamppy;

/* connect to my database Wamppy */
\c Wamppy;


/* Create users table */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
	lastName VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
);

/* Create products table */
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
	price DECIMAL(10,3) NOT NULL,
	category VARCHAR(100) NOT NULL,
);

/* Create orders table */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    quantity REAL NOT NULL,
	status VARCHAR(10) NOT NULL
);

ALTER TABLE orders ADD COLUMN pro_id INTEGER REFERENCES products(id);
ALTER TABLE orders ADD COLUMN user_id INTEGER REFERENCES users(id);


/* Insert data into the users table (add 2 users) */
INSERT INTO users (firstName, lastName, password) VALUES ('Ahmed','M.Osman','aa');
INSERT INTO users (firstName, lastName, password) VALUES ('Tariq','Mamdouh','bb');


/* Insert data into the products table (add 2 products) */

INSERT INTO products (name, price, category) VALUES ('Iphone20',100.50,'electronics');
INSERT INTO products (name, price, category) VALUES ('AvengerT-shirt',40.00,'clothes');

/* Insert data into the orders table (add 1 order) */
INSERT INTO products (quantity, status, pro_id, user_id) VALUES (2,'active',1,1);

