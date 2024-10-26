import {
    addNote,
    getAllNotes,
    findNotes,
    removeNote,
    removeAllNotes,
} from "./notes.js";
import { launchServer } from "./server.js";

export async function handleAddNote({ note, tags }) {
    try {
        const newNote = await addNote({
            content: note,
            tags: tags.split(", "),
        });
        console.log("note added", newNote.id);
    } catch (error) {
        console.error(error);
    }
}

export async function handleGetAllNotes() {
    try {
        const allNotes = await getAllNotes();
        if (allNotes.length > 0) {
            allNotes.forEach(function displayNotes(note, index) {
                const isLastNote = index == allNotes.length - 1;
                displayNote(note, isLastNote);
            });
            return;
        }
        console.log("no notes found");
    } catch (error) {
        console.error(error);
    }
}

export async function handleFindNotes({ filter }) {
    try {
        const matches = await findNotes(filter);
        matches.forEach(function displayMatches(match, index) {
            const isLastMatch = index == matches.length - 1;
            displayNote(match, isLastMatch);
        });
    } catch (error) {
        console.error(error);
    }
}

export async function handleRemoveNote({ id }) {
    try {
        const noteId = await removeNote(id);
        if (noteId) {
            console.log("note removed");
            return;
        }
        console.log("unable to remove note");
    } catch (error) {
        console.error(error);
    }
}

export async function handleRemoveAllNotes() {
    try {
        await removeAllNotes();
        console.log("removed all notes");
    } catch (error) {
        console.error(error);
    }
}

export async function handleLaunchWeb({ port }) {
    try {
        const notes = await getAllNotes();
        launchServer(notes, port);
    } catch (error) {
        console.error(error);
    }
}

function displayNote(note, isLastNote) {
    console.log(`id: ${note.id}`);
    console.log(`tags: ${note.tags.join(", ")}`);
    console.log(`note: ${note.content}`);
    !isLastNote && console.log("---------------------");
}
