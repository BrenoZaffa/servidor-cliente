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
    },

    findUserById: async (id) => {
        return await db.get(`
            SELECT * FROM users WHERE id = '${id}'
        `);
    },

    updateUser: async (id, user) => {
        let update = "";
        if(user.name)
            update += `name = '${user.name}'`;
        if(user.email)
            update += (update != "" ? ", " : "") + `email = '${user.email}'`;
        if(user.password)
            update += (update != "" ? ", " : "") + `password = '${user.password}'`;
        
        if(update != ""){
            db.exec(`
                UPDATE users
                SET ${update}
                WHERE id = '${id}'
            `);
        }
        let userBanco = await db.get(`SELECT * FROM users WHERE id = '${id}'`);
        return {
            id: userBanco.id,
            name: userBanco.name,
            email: userBanco.email
        };
    },

    deleteUser: async (id) => {
        db.exec(`
            DELETE FROM users WHERE id = '${id}'
        `);
    }
};