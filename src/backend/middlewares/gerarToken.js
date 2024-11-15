import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || "sua_chave_secreta";

function gerarToken(id) {
    const payload = { id };
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, SECRET_KEY, options);
}

export default gerarToken;

