import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const autenticarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY);
    req.user = decoded;
    next(); 
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido ou expirado' });
  }
};

export default autenticarToken;