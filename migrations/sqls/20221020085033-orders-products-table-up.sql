/* Create orders-products table */
CREATE TABLE orders_products (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    pro_id INTEGER REFERENCES products(id),
    quantity INTEGER
);