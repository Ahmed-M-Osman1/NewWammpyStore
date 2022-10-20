import client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductModel {
  // show one product model:
  async show(id: number): Promise<Product> {
    try {
      const connection = await client.connect();
      // sql query:
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      // return results:
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Can't load this product because of the following error: ${error}`
      );
    }
  }

  // create product model:
  async create(product: Product): Promise<Product> {
    try {
      const connection = await client.connect();
      // sql query:
      const sql =
        'INSERT INTO products (name, price, category) VALUES ($1,$2,$3) RETURNING *';
      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      connection.release();
      // return results:
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Can't create product because of the following error: ${error}`
      );
    }
  }

  // select category for product model:
  async selectCategory(category: string): Promise<Product[]> {
    try {
      const connection = await client.connect();
      // sql query:
      const sql = 'SELECT * FROM products WHERE category=($1)';
      const result = await connection.query(sql, [category]);
      connection.release();
      // return results:
      return result.rows;
    } catch (error) {
      throw new Error(
        `Can't select this categoty because of the following error: ${error}`
      );
    }
  }

  // index all product model:
  async index(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      // sql query:
      const sql = 'SELECT * FROM products';
      const result = await connection.query(sql);
      connection.release();
      // return results:
      return result.rows;
    } catch (error) {
      throw new Error(
        `Can't load product because of the following error: ${error}`
      );
    }
  }

  // delete product model:
  async deleteProduct(id: number): Promise<Product> {
    try {
      const connection = await client.connect();
      // sql query:
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [id]);
      connection.release();
      // return results:
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Can't delete product because of the following error: ${error}`
      );
    }
  }

  // update product model:
  async update(product: Product): Promise<Product> {
    try {
      const connection = await client.connect();
      // sql query:
      const sql =
        'UPDATE products SET name=($1) price=($2) category=($3) WHERE id=($4) RETURNING *';
      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.category,
        product.id,
      ]);
      connection.release();
      // return results:
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Can't update product because of the following error: ${error}`
      );
    }
  }
}
