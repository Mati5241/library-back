import {pool} from '../utils/db.js';

export class LoginRecord {
    constructor(obj) {

        this.login = obj.login;
        this.password = obj.password;


    }


    async checkAccount() {

        const [results] = await pool.execute('SELECT * FROM `admin` WHERE `login` = :login;', {
                login: this.login,
            }
        );

        if (results.length > 0) {
            return results[0].password
        } else {
            return '1'
        }
    }

}
