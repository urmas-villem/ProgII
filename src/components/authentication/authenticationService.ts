import { emailCheck } from "../../functions";
import hashService from "../general/services/hashService";
import jwtService from "../general/services/jwtService";

const loginService = {
    login: async (email: any, password: any) => {
        const user = emailCheck(email);
        const userInQuestion = await jwtService.sign(user);
        if (user === 'Email is invalid') return false;
        const match = await hashService.match(password, user!.password);
        if (!match) return false;
        const token = await jwtService.sign(user);
        return token;
    }
};

export default loginService;