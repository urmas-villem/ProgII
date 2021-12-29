import { emailCheck } from "../../functions";
import hashService from "../general/services/hashService";
import jwtService from "../general/services/jwtService";

var currentuser:any = undefined;

const loginService = {
    login: async (email: any, password: any) => {
        const user = await emailCheck(email);
        if (user === 'Email is invalid') {
            return false;
        }
        const hash = await hashService.hash(password)
        const match = await hashService.match(password, hash);
        if (!match){
            return false;
        }
        const token = await jwtService.sign(user);
        currentuser = user;
        return token;
    }
};

export default loginService;
export { currentuser };