import {pool} from '../utils/db.js';


export class MyBooksRecord {
    constructor(obj) {
        this.userId = obj.userId;
        this.myBooks = obj.myBooks;
    }


    async show() {
        if (!this.userId) {
            throw new Error("Brak zdefiniowanego identyfikatora użytkownika.");
        }

        const [results] = await pool.execute("SELECT `books`.* FROM `users_books`  JOIN `books` ON `users_books`.`bookId` = `books`.`id`  WHERE `users_books`.`userId` = :userId", {
            userId: this.userId,
        });


        return this.myBooks = results
    }




}
