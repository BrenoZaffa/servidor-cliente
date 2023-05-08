import { openDb } from '../db/conn.js';
const db = await openDb();

export const usersModel = {

    insertUser: async (user) => {
        db.exec(`
            INSERT INTO users (name, email, password)
            VALUES ('${user.name}', '${user.email}', '${user.password}')
        `);
        let user = db.get(`SELECT * FROM users WHERE email = '${user.email}'`);
        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    },

    findUserByEmail: async (email) => {
        return db.get(`
            SELECT * FROM users WHERE email = '${email}'
        `);
    }
    
}

module.exports = usersModel;