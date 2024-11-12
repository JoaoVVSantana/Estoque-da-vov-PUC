
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'sua_chave_secreta';

function autenticarToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const payload = jwt.verify(token.split(' ')[1], SECRET_KEY); // Ignora o prefixo "Bearer"
    req.userId = payload.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

module.exports = autenticarToken;
