import jwt from 'jsonwebtoken';
import config from '../config';
const createToken = async (id) => {
    return jwt.sign({ userId: id }, config.jwt_secret, { expiresIn: '1d' });
};
const getInfoFromToken = async (token) => {
    try {
        const userData = jwt.verify(token, config.jwt_secret);
        return userData;
    }
    catch (error) {
        return error;
    }
};
export const jwtHelper = {
    createToken,
    getInfoFromToken
};
//# sourceMappingURL=jwtValidation.js.map