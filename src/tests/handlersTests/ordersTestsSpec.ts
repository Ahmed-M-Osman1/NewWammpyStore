import app from '../../index';
import { Order, order_products } from '../../DB-models/ordersModels';
import supertest from 'supertest';
import { User, UsersModel } from '../../DB-models/usersModels';
import { Product, ProductModel } from '../../DB-models/productsModels';
import { JwtPayload, verify } from 'jsonwebtoken';

const request = supertest(app);
describe('Test the orders endpoint /orders', () => {
  // the data of tested orders:
  const testOrder: Order = {
    status: 'active',
    user_id: 0,
  };

  const testProductAddToOrder: order_products = {
    order_id: 0,
    pro_id: 0,
    quantity: 2,
  };
  // secret form env file:
  const theSecretToken = process.env.TOKEN_SECRET as string;

  // safe some information outside the orders to test it:
  let OID: string;
  let UID: string;
  let UserToken: string;
  // we should create product and user to test orders:
  // Data to create a test user:
  const UserModel = new UsersModel();
  const testUser: User = {
    firstname: 'ahmed',
    lastname: 'mamdouh',
    email: 'ahmed@udacity.com',
    password: 'password',
  };

  // Data to create a test product:
  const ProductsModel = new ProductModel();
  const testProduct: Product = {
    name: 'testItem',
    price: 1.0,
    category: 'test',
  };

  beforeAll(async () => {
    const newUser = await UserModel.create(testUser);
    const newProduct = await ProductsModel.create(testProduct);
    if (newUser.id) testOrder.user_id = newUser.id;
    if (newProduct.id) testProductAddToOrder.pro_id = newProduct.id;
    // create user to get the token:
    await request
      .post('/users/create')
      .send(testUser)
      .expect(200)
      .then((res) => {
        // the response is the token:
        UserToken = res.text;
        // verify it:
        const decodedJWT = verify(
          UserToken as string,
          theSecretToken
        ) as JwtPayload;
        // get the user ID after decoded the token.
        UID = decodedJWT.data.UID;
      });
  });

  it('Test the create endpoint with testOrder data', async () => {
    await request
      .post('/orders/create')
      .set('Authorization', `Bearer ${UserToken}`)
      .send(testOrder)
      .expect(200)
      .then((res) => {
        // the response is the token:
        OID = res.body.id;
        testProductAddToOrder.order_id = res.body.id;
      });
  });
  // start the testing:
  it('Test the index endpoint to show all orders', async () => {
    await request.get('/orders').expect(200);
  });

  it('Test the index endpoint to show specific orders', async () => {
    await request
      .get(`/orders/${OID}`)
      .set('Authorization', `Bearer ${UserToken}`)
      .expect(200);
  });

  it('Test the index endpoint to show all user orders', async () => {
    await request.get(`/orders/${testOrder.user_id}`).expect(200);
  });

  it('Test the index endpoint to show all user completed orders', async () => {
    await request
      .get(`/orders/completed/${testOrder.user_id}`)
      .expect(200);
  });

  it('Test the delete endpoint with not correct orders ID', async () => {
    await request.get(`/orders/delete/${OID + 1}`).expect(404);
  });
});
