import { openDb } from '../db/conn.js';
const db = await openDb();

export async function insertUser(user) {
    return db.exec(`
        INSERT INTO users (nome, email, password)
        VALUES ('${user.nome}', '${user.email}', '${user.password}')
    `);
}