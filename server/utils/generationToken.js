import jwt from 'jsonwebtoken'
import config from '../config/config.js';

const private_key= config.PRIVATE_KEY;

function generationToken(payload) {
    const token = jwt.sign(payload, private_key)
    return token;
}
export default generationToken;