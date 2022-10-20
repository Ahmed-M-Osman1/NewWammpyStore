/* Create orders table */
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
	status VARCHAR(10) NOT NULL,
	user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);