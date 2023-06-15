import { openDb } from '../db/conn.js';
const db = await openDb();

export const occurrenceModel = {
    getAllOCcurrences: async () => {
        return await db.all(`
            SELECT 
                idOcurrence as id,
                registered_at,
                local,
                idOccurrenceType as occurrence_type,
                km,
                user_id
            FROM occurrences
        `);
    },

    insertOccurrence: async (occurrence) => {
        const { registered_at, local, occurrence_type, km, user_id } = occurrence;
        await db.run(`
            INSERT INTO occurrences (registered_at, local, idOccurrenceType, km, user_id) VALUES ('${registered_at}', '${local}', ${occurrence_type}, ${km}, ${user_id})
        `);
        const id = await db.get(`SELECT last_insert_rowid() as id FROM occurrences`);
        return {
            id: id.id,
            registered_at,
            local,
            occurrence_type: parseInt(occurrence_type),
            km,
            user_id
        }
    }
}