import {pool} from '../utils/db.js';

export class LoginRecord {
    constructor(obj) {

        this.login = obj.login;
        this.password = obj.password;


    }


    async checkAccount() {

        const [results] = await pool.execute('SELECT * FROM `users` WHERE `login` = :login;', {
                login: this.login,
            }
        );

        return await results[0]

    }

}
