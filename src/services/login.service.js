import axios from 'axios';

export class LoginService {
    constructor() {}

    async login() {
        try {
            return await axios.get('http://localhost:3000/users')
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
}