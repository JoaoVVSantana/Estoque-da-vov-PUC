import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

function gerarToken(id) {
  const payload = { id };
  const options = { expiresIn: process.env.JWT_EXPIRATION };
  return jwt.sign(payload, process.env.SECRET_KEY, options);
}

router.post('/login', async (req, res) => {
  const { id, senha } = req.body;
  if (id === process.env.SECRET_USER && senha === process.env.SECRET_KEY) {
    try {
      const token = gerarToken(id);
      return res.status(200).json({ token });
    } catch (error) {
      console.error('Erro ao gerar token:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Login inválido
  return res.status(401).json({ error: 'Credenciais inválidas' });
});

export default router;
