import {pool} from '../utils/db.js';
import {v4 as uuid} from 'uuid';


export class BookRecord {
    constructor(obj) {
        this.id = uuid();
        this.title = obj.title;
        this.isbn = obj.isbn;
        this.autor = obj.autor;
    }


    async insert() {

        await pool.execute('INSERT INTO `books` VALUES(:id, :name, :ISBN, :autor)', {
            id: this.id,
            name: this.title,
            ISBN: this.isbn,
            autor: this.autor,
        })
        return this.id;
    }



    static async show() {
        const [results] = await pool.execute("SELECT * FROM `books` WHERE `borrow` = 'Nie'");

        return results;

    }


    static async delete(id) {

        await pool.execute('DELETE FROM `books` WHERE `id` = :id', {
            id,
        });
    }


    static async edit(id) {

        // await pool.execute('UPDATE `users_books` SET `userId` = :userId,`bookId` = :bookId');
        await pool.execute('INSERT INTO `users_books`(`userId`, `bookId`) VALUES (:userId, :bookId)', {
            userId,
            bookId,
        });
    }


}
