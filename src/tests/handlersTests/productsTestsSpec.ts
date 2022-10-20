import app from '../../index';
import { Product } from '../../DB-models/productsModels';
import supertest from 'supertest';
import { User } from "../../DB-models/usersModels";
import { JwtPayload, verify } from 'jsonwebtoken';

const request = supertest(app);
describe('Test the product endpoint /product', () => {

  // the data of tested product: 
  const testProduct: Product = {
    name: "testItem",
    price: 1.000,
    category: "test",
  };
 // secret form env file:
 const theSecretToken = process.env.TOKEN_SECRET as string;

  // safe some information outside the product to test it:
  let PID: string;
  let UserToken: string;

  const testUser: User = {
    firstname: "ahmed",
    lastname: "mamdouh",
    email: "ahmed@udacity.com",
    password: "password",
  };

  beforeAll(async () => {
    // create user to get the token:
    await request
    .post('/users/create')
    .send(testUser)
    .expect(200)
    .then((res) => {
      // the response is the token:
      UserToken = res.text;
       // verify it:
      const decodedJWT = verify(UserToken as string, theSecretToken) as JwtPayload;
      // get the user ID after decoded the token.
    });
    });

  it('Test the create endpoint with testProduct data', async () => {
    await request
      .post('/products/create')
      .set('Authorization', `Bearer ${UserToken}`)
      .send(testProduct)
      .expect(200)
      .then((res) => {
        // the response is the token:
        PID = res.body.id;
      });
  });
  
  // start the testing:
  it('Test the index endpoint to show all product', async () => {
    await request
      .get('/products')
      .expect(200);
  });

  it('Test the index endpoint to show specific product', async () => {
    await request
      .get(`/products/${PID}`)
      .expect(200);
  });

  it('Test the index endpoint to show specific category', async () => {
    await request
      .get(`/products/category/${testProduct.category}`)
      .expect(200);
  });

  it('Test the delete endpoint with not correct product ID', async () => {
    await request
      .get(`/products/delete/${PID+1}`)
      .expect(404);
  });
});