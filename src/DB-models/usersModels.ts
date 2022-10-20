import client from '../database';
import bcrypt from 'bcrypt';

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const { PEPPER, SALT_ROUNDS } = process.env;

export class UsersModel {
  // login user using email and password
  async login(email: string, password: string): Promise<User | null> {
    try {
      const conn = await client.connect();
      // sql query:
      const sql = 'SELECT * FROM users WHERE email=($1)';
      const result = await conn.query(sql, [email]);
      const user = result.rows[0];
      if (user) {
        if (bcrypt.compareSync(password + PEPPER, user.password)) {
          return user;
        }
      }
      return null;
    } catch (error) {
      throw new Error(
        `Failed to sign in with this user because of the following error: ${error}`
      );
    }
  }
  // create user model:
  async create(user: User): Promise<User> {
    try {
      const connection = await client.connect();
      // sql query:
      const sql =
        'INSERT INTO users (firstname,lastname,email, password) VALUES ($1,$2,$3, $4) RETURNING *';
      const hashPassword = bcrypt.hashSync(
        user.password + PEPPER,
        Number(SALT_ROUNDS)
      );
      const result = await connection.query(sql, [
        user.firstname,
        user.lastname,
        user.email,
        hashPassword,
      ]);
      connection.release();
      // return results:
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Can't create user because of the following error: ${error}`
      );
    }
  }

  // show one user model:
  async show(id: number): Promise<User> {
    try {
      const connection = await client.connect();
      // sql query:
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      // return results:
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Can't load this user because of the following error: ${error}`
      );
    }
  }

  // update user model:
  async update(user: User): Promise<User> {
    try {
      const connection = await client.connect();
      // sql query:
      const sql =
        'UPDATE user SET firstName=($1) lastName=($2) WHERE id=($3) RETURNING *';
      const result = await connection.query(sql, [
        user.firstname,
        user.lastname,
        user.id,
      ]);
      connection.release();
      // return results:
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Can't update user because of the following error: ${error}`
      );
    }
  }
  // delete user model:
  async deleteUser(id: number): Promise<User> {
    try {
      const connection = await client.connect();
      // sql query:
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [id]);
      connection.release();
      // return results:
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Can't update user because of the following error: ${error}`
      );
    }
  }

  // index all users model:
  async index(): Promise<User[]> {
    try {
      const connection = await client.connect();
      // sql query:
      const sql = 'SELECT * FROM users';
      const result = await connection.query(sql);
      connection.release();
      // return results:
      return result.rows;
    } catch (error) {
      throw new Error(
        `Can't load users because of the following error: ${error}`
      );
    }
  }
}
