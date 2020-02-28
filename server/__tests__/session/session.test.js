import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../src/app';

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

  it('Se nao existir usuario ele retonar um erro 401 e mensagem de erro', async done => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: '0000000@gmail.com',
        password: '20401359',
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('User not found');
    done();
  });

  it('Se a senha estiver errada ele retorna 401 e senha incorreta', async done => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'ivanhweb@gmail.com',
        password: '20401352',
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Password does not match!');
    done();
  });

  it('Se a nao informar um dos parametros', async done => {
    const response = await request(app)
      .post('/sessions')
      .send({
        password: '20401352',
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation fails');
    done();
  });

  it('Se nao tiver um email valido', async done => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'iva2nhweb@gmail..com',
        password: '20401352',
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation fails');
    done();
  });
});
