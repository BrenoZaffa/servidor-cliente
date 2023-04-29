import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export async function openDb () {
    return open({
        filename: './database.db',
        driver: sqlite3.Database
    })
}

export async function createDataBase(){
    openDb().then(db => {
        db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password VARCHAR(32) NOT NULL
            )
        `);
    });
}