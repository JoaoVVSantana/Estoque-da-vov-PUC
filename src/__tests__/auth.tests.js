import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../backend/app.js'; // Substitua pelo caminho correto do app
import gerarToken from '../backend/middlewares/gerarToken.js';

// Mock da SECRET_KEY para os testes
process.env.SECRET_KEY = "test_secret_key";

describe('Teste de Autenticação', () => {
    it('Deve gerar um token JWT válido', () => {
        const id = 123;
        const token = gerarToken(id);

        // Decodificar o token para verificar o payload
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        expect(decoded.id).toBe(id);
        expect(decoded.exp).toBeDefined(); // Certifica que o token tem tempo de expiração
    });

    it('Deve negar acesso sem token', async () => {
        const response = await request(app).get('/api/estoque/itemsFaltando');
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe('Acesso negado. Token não fornecido.');
    });

    it('Deve permitir acesso com token válido', async () => {
        const token = gerarToken(123);
        const response = await request(app)
            .get('/api/estoque/itemsFaltando')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200); // Assumindo que a rota retorna 200 para sucesso
    });

    it('Deve rejeitar token inválido', async () => {
        const response = await request(app)
            .get('/api/estoque/itemsFaltando')
            .set('Authorization', `Bearer token_invalido`);
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe('Token inválido ou expirado.');
    });
});
