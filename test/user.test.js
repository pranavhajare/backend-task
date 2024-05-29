import chai, { use, request } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

use(chaiHttp);
const { expect } = chai;

describe('User Routes', () => {
  it('should register a new user', (done) => {
    request(app)
      .post('/users/register')
      .send({ username: 'testUser2024', email: 'testuser2024@example.com', password: 'T3stP@ssw0rd!2024' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('token');
        done();
      });
  });
});