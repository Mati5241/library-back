import mysql from 'mysql2/promise';



export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'library',
    decimalNumbers: true,
    multipleStatements: true,
    namedPlaceholders: true,

});

//todo zmienic to przed wyslaniem na serwer


// import {createPool} from "mysql2/promise";
// import {config} from "../config/config";
//
// export const pool = createPool({
//     host: config.dbHost,
//     user: config.dbUser,
//     database: config.dbDatabase,
//     // password: config.dbPassword,
//     namedPlaceholders: true,
//     decimalNumbers: true,
// });
