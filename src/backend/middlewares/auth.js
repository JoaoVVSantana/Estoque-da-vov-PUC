import {
  jwt,
  gerente,
  database
} from 'src/packages';
const SECRET_KEY = 'senha123'; // Senha secreta //
import { Router } from 'express';
const router = Router();

database.authenticate()
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso.'))
  .catch(error => console.error('Erro ao conectar ao banco de dados:', error));


router.post('api/login', async (req, res) => { // Rota de login
  const { email, senha } = req.body;

  try {
    
    const usuario = await gerente.findOne({ where: { email } }); // Verifica se tem gerente
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    
    const senhaValida = usuario.validarSenha(senha);// Criar um método que verifica a senha? Colocar a senha direto no banco de dados?
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

module.exports = auth;
