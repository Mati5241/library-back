import {pool} from '../utils/db.js';


export class UsersBooksRecord {
    constructor(obj) {
        this.userId = obj.userId;
        this.bookId = obj.bookId;
    }


    async borrow() {

        await pool.execute('INSERT INTO `users_books`(`userId`, `bookId`) VALUES (:userId, :bookId)', {
            userId: this.userId,
            bookId: this.bookId,
        });
        await pool.execute("UPDATE `books` SET `borrow`= 'Tak' WHERE `id` = :bookId", {
            bookId: this.bookId,
        });
    }


    static async giveBack(bookId) {

        await pool.execute('DELETE FROM `users_books` WHERE `bookId` = :bookId', {
            bookId,
        });
        await pool.execute("UPDATE `books` SET `borrow`= 'Nie' WHERE `id` = :bookId", {
            bookId,
        });

    }



}
