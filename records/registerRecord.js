import {pool} from '../utils/db.js';
import {v4 as uuid} from 'uuid';


export class RegisterRecord {
    constructor(obj) {

        this.id = uuid();
        this.login = obj.login;
        this.name = obj.name;
        this.password = obj.password;
        this.status = obj.status;


    }


    async register() {
        await pool.execute('INSERT INTO `users`(`id`, `login`, `name`, `password`, `status`) VALUES (:id, :login, :name, :password, :status)', {
            id: this.id,
            login: this.login,
            name: this.name,
            password: this.password,
            status: this.status,
        });
    }


}
