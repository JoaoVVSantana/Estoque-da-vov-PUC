import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//configurar na próxima sprint
const autenticarToken = function(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const payload = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY); 
    req.userId = payload.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}



export default autenticarToken;
