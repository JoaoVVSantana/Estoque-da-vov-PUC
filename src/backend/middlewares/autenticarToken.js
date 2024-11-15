import jwt from 'jsonwebtoken';
const SECRET_KEY = '7Th6l0Od3Vw3VxqfF3FvYw4nvsC0cedF';

const autenticarToken = function autenticarT(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const payload = jwt.verify(token.split(' ')[1], SECRET_KEY); 
    req.userId = payload.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}



export default autenticarToken;
