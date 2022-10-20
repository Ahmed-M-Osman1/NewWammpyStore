/* Create products table */
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
	price DECIMAL(10,3) NOT NULL,
	category VARCHAR(100) NOT NULL
);

