import {
  jwt,
  gerente,
  database
} from 'src/packages';
const SECRET_KEY = 'senha123'; // Senha secreta //
import { Router } from 'express';
const router = Router();


function gerarToken(id) {
  // O payload pode incluir dados adicionais, mas o ID é essencial
  const payload = { id };
  // Define opções como tempo de expiração (opcional)
  const options = { expiresIn: '1h' };
  // Gera o token
  return jwt.sign(payload, SECRET_KEY, options);
}

// Exemplo de uso no login
router.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
      // Valide o usuário (isso depende do modelo de usuário no Sequelize)
      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario || !(await usuario.validarSenha(senha))) {
          return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Gere o token após validar o login
      const token = gerarToken(usuario.id);

      // Envie o token ao cliente
      res.json({ token });
  } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = auth;
