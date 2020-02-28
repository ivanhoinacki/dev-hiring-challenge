import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../src/app';

describe('Session', () => {
  it('Se eu enviar um usuario e senha valido ele retorna um token jwt', async done => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'ivanhweb@gmail.com',
        password: '20401359',
      });

    let decoded = jwt.decode(response.body.token, { complete: true });
    expect(response.body.token).toBeDefined();
    expect(decoded.payload.email).toBe('ivanhweb@gmail.com');
    done();
  });
});
