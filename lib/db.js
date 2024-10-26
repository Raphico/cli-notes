import fs from "node:fs/promises";

const DB_PATH = new URL("../db.json", import.meta.url).pathname;

export async function getDB() {
    const db = await fs.readFile(DB_PATH, { encoding: "utf8" });
    return JSON.parse(db);
}

export async function saveDB(db) {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 4));
}

export async function insertNote(note) {
    const db = await getDB();
    const updatedNotes = [...db.notes, note];
    db.notes = updatedNotes;
    await saveDB(db);
}
