import client from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export type order_products = {
  id?: number;
  order_id: number;
  pro_id: number;
  quantity: number;
};

export class OrderModel {
  // addProduct to specific orders model:
  async addProductToOrder(
    order_products: order_products
  ): Promise<order_products> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders_products (order_id, pro_id, quantity) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [
        order_products.order_id,
        order_products.pro_id,
        order_products.quantity,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Can't add product: ${order_products.pro_id} this order: ${order_products.order_id} because of the following error: ${error}`
      );
    }
  }

  // show user completed orders model:
  async showUserCompletedOrders(user_id: number): Promise<Order[]> {
    try {
      const connection = await client.connect();
      // sql query:
      const sql =
        "SELECT * FROM orders WHERE user_id=($1) AND status='completed'";
      const result = await connection.query(sql, [user_id]);
      connection.release();
      // return results:
      return result.rows;
    } catch (error) {
      throw new Error(
        `Can't show this user completed orders because of the following error: ${error}`
      );
    }
  }

  // show User orders model:
  async showUserOrder(user_id: number): Promise<Order[]> {
    try {
      const connection = await client.connect();
      // sql query:
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      const result = await connection.query(sql, [user_id]);
      connection.release();
      // return results:
      return result.rows;
    } catch (error) {
      throw new Error(
        `Can't load this user orders because of the following error: ${error}`
      );
    }
  }

  // index all orders model:
  async index(): Promise<Order[]> {
    try {
      const connection = await client.connect();
      // sql query to aggregate the orders to a products:
      const sql = `SELECT orders.*,
			array_agg(row_to_json(orders_products)) 
      AS products
			FROM orders
			FULL JOIN orders_products ON orders.id = orders_products.order_id
			GROUP BY orders.id`;
      const result = await connection.query(sql);
      connection.release();
      // return results:
      return result.rows;
    } catch (error) {
      throw new Error(
        `Can't load orders because of the following error: ${error}`
      );
    }
  }

  // create orders model:
  async create(order: Order): Promise<Order> {
    try {
      const connection = await client.connect();
      // sql query:

      const sql =
        'INSERT INTO orders (status, user_id) VALUES ($1,$2) RETURNING *';
      const result = await connection.query(sql, [
        order.status,
        order.user_id,
      ]);
      connection.release();
      // return results:
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Can't create this order because of the following error: ${error}`
      );
    }
  }

  // delete product model:
  async deleteOrder(id: number): Promise<Order> {
    try {
      const connection = await client.connect();
      // sql query:
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [id]);
      connection.release();
      // return results:
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Can't delete order because of the following error: ${error}`
      );
    }
  }
}
