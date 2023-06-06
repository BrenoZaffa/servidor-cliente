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
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password VARCHAR(32) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS occurrence_type (
                idOccurrenceType INTEGER PRIMARY KEY AUTOINCREMENT,
                description TEXT NOT NULL
            );

            INSERT INTO occurrence_type (description) VALUES ('Atropelamento'), ('Deslizamento'), ('Colisão frontal'), ('Capotagem'), ('Saída de pista'), ('Batida em objeto fixo'), ('Veículo avariado'), ('Colisão com motocicletas'), ('Colisão no mesmo sentido ou transversal'), ('Construção');

            CREATE TABLE IF NOT EXISTS occurrences (
                idOcurrence INTEGER PRIMARY KEY AUTOINCREMENT,
                registered_at DATETIME NOT NULL,
                local TEXT NOT NULL,
                idOccurrenceType INTEGER NOT NULL,
                km INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (idOccurrenceType) REFERENCES occurrence_type(idOccurrenceType)
            );
        `);
    });
}