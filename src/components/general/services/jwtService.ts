import jwt from 'jsonwebtoken';

const jwtPassword = 'asdasdtasfre1af';

const jwtService = {
    sign: async (user:any ) => {
        const userInQuestion = user
        const payload = {
            id: user.id,
            role: user.role,
        };
        const token = await jwt.sign(payload, jwtPassword, { expiresIn: '1h'});
        return token;
    },

    verify: async (token: string) => {
        const verify = jwt.verify(token, jwtPassword);
        return verify;
    }
}

export default jwtService;