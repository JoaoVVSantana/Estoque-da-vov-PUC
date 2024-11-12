const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gerente = require('./back/gerente');

const router = express.Router();
const SECRET_KEY = 'senha123'; // Senha secreta //


router.post('/login', async (req, res) => { // Rota de login
  const { email, senha } = req.body;

  try {
    
    const usuario = await gerente.findOne({ where: { email } }); // Verifica se tem gerente
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    
    const senhaValida = usuario.validarSenha(senha);// Verifica a senha
    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    
    const token = jwt.sign({ id: usuario.id_gerente }, SECRET_KEY, { expiresIn: '1h' }); // Gera o token JWT

    res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro ao processar a solicitação' });
  }
  
});

module.exports = router;
