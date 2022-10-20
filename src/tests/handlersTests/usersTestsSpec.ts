import app from '../../index';
import { User } from '../../DB-models/usersModels';
import supertest from 'supertest';
import { JwtPayload, verify } from 'jsonwebtoken';

const request = supertest(app);
describe('Test the users endpoint /users', () => {
  // the data of tested user:
  const testUser: User = {
    firstname: 'ahmedM',
    lastname: 'Osman',
    email: 'ahmedMOsman@udacity.com',
    password: 'password123',
  };
  // secret form env file:
  const theSecretToken = process.env.TOKEN_SECRET as string;

  // safe some information outside the user to test it:
  let UID: string;
  let UserToken: string;

  it('Test the create endpoint with testUser data', async () => {
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
  // start the testing:
  it('Test the index endpoint with correct token', async () => {
    await request
      .get('/users')
      .set('Authorization', `Bearer ${UserToken}`)
      .expect(200);
  });

  it('Test the index endpoint with fake token', async () => {
    await request
      .get('/users')
      .set('Authorization', 'Bearer fakeTokenAhmedOsman')
      .expect(500);
  });

  it('Test the show endpoint with correct token and correct user ID', async () => {
    await request
      .get(`/users/${UID}`)
      .set('Authorization', `Bearer ${UserToken}`)
      .expect(200);
  });

  it('Test the show endpoint with correct token and not correct user ID', async () => {
    await request
      .get(`/users/${UID + 1}`)
      .set('Authorization', `Bearer ${UserToken}`)
      .expect(401);
  });

  it('Test the delete endpoint with correct token and not correct user ID', async () => {
    await request
      .get(`/users/delete/${UID + 1}`)
      .set('Authorization', `Bearer ${UserToken}`)
      .expect(404);
  });
});
