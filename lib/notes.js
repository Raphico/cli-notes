import { getDB, saveDB, insertNote } from "./db.js";

export async function addNote({ content, tags }) {
    const note = {
        id: new Date().getTime(),
        content,
        tags,
    };
    await insertNote(note);
    return note;
}

export async function getAllNotes() {
    const { notes } = await getDB();
    return notes;
}

export async function findNotes(filter) {
    const { notes } = await getDB();
    const matches = notes.filter(function filterNotesByContent({ content }) {
        return content.toLowerCase().includes(filter.toLowerCase());
    });
    return matches;
}

export async function removeNote(id) {
    const { notes, ...rest } = await getDB();
    const match = notes.find(function findNoteWithId(note) {
        return note.id === id;
    });

    if (match) {
        const updatedNotes = notes.filter(function removeNoteWithId(note) {
            return match.id !== note.id;
        });
        await saveDB({ ...rest, notes: updatedNotes });
        return match.id;
    }
}

export async function removeAllNotes() {
    const { notes, ...rest } = await getDB();
    await saveDB({ ...rest, notes: [] });
}
