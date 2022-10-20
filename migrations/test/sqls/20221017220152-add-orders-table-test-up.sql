/* Create orders table */
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    quantity REAL NOT NULL,
	status VARCHAR(10) NOT NULL,
	pro_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
	user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);