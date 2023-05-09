import { openDb } from '../db/conn.js';
const db = await openDb();

export const usersModel = {

    insertUser: async (user) => {
        db.exec(`
            INSERT INTO users (name, email, password)
            VALUES ('${user.name}', '${user.email}', '${user.password}')
        `);
        let userBanco = await db.get(`SELECT * FROM users WHERE email = '${user.email}'`);
        return {
            id: userBanco.id,
            name: userBanco.name,
            email: userBanco.email
        };
    },

    findUserByEmail: async (email) => {
        return await db.get(`
            SELECT * FROM users WHERE email = '${email}'
        `);
    }
};