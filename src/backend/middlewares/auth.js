import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config('../../build/.env');
import express from 'express';
const router = express.Router();

function gerarToken() {
    
    const payload = { id: process.env.SECRET_USER };
    const options = { expiresIn: process.env.JWT_EXPIRATION,};
    
    const token =jwt.sign(payload, process.env.SECRET_KEY, options);

    res.json({ token });
    return token;
}

// Exemplo de uso no login
router.post('/api/login', async (req, res) => {
  const { id, senha } = req.body;

  try {
      // Gere o token após validar o login
      const token = gerarToken(id);

      // Envie o token ao cliente
      res.json({ token });
  } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;
