import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


function gerarToken(id) {
    const payload = { id };
    const options = { expiresIn: process.env.JWT_EXPIRATION,};
    return jwt.sign(payload, process.env.SECRET_KEY, options);
}

export default gerarToken;

