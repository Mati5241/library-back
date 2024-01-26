import {pool} from '../utils/db.js';
import {v4 as uuid} from 'uuid';


export class RegisterRecord {
    constructor(obj) {

        this.id = uuid();
        this.login = obj.login;
        this.name = obj.name;
        this.password = obj.password;


    }


    async register() {

        const [results] = await pool.execute('SELECT * FROM `admin`;');

        const allLogins = [];

        results.map(item => {
            allLogins.push(item.login)
        })

        const isLoginFree = !allLogins.includes(this.login)

        if (isLoginFree) {
            await pool.execute('INSERT INTO `admin` VALUES(:id, :login, :name, :password)', {
                id: this.id,
                login: this.login,
                name: this.name,
                password: this.password,
            })
        } else {
            console.log('Taki login już istnieje')
        }

    }



    // static async show(day) {
    //     const [results] = await pool.execute('SELECT * FROM `schedule` WHERE `date` = :day ORDER BY `start`;', {
    //             day,
    //         }
    //     );
    //
    //     return results;
    //
    // }
    //
    //
    // static async delete(id) {
    //
    //     await pool.execute('DELETE FROM `schedule` WHERE `id` = :id', {
    //         id,
    //     });
    // }

}
