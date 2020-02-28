import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../src/app';

describe('Session', () => {
  /**
   * A criacao dos testes referece a ordem de codificacao do controller, cada condicao
   * deve ser testada.
   * basedo no grafico informado no coverage
   */
  it('Se eu enviar um usuario e senha valido ele retorna um token jwt', async done => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'ivanhweb@gmail.com',
        password: '20401359',
      });

    let decoded = jwt.decode(response.body.token, { complete: true });
    expect(response.body.token).toBeDefined(); // token retornado e decodificado
    expect(decoded.payload.email).toBe('ivanhweb@gmail.com'); // email enviado decodificado
    done();
  });
});
