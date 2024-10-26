import { jest, beforeEach, expect } from "@jest/globals";

jest.unstable_mockModule("../lib/db.js", () => ({
    insertNote: jest.fn(),
    getDB: jest.fn(),
    saveDB: jest.fn(),
}));

const { addNote, getAllNotes, removeNote } = await import("../lib/notes.js");
const { insertNote, getDB, saveDB } = await import("../lib/db.js");

beforeEach(() => {
    insertNote.mockClear();
    getDB.mockClear();
    saveDB.mockClear();
});

const mockNotesData = [
    {
        id: 1729944079877,
        content: "wash the dishes",
        tags: ["chores", " home"],
    },
    {
        id: 1729944098870,
        content: "test goldnlilies store",
        tags: ["work"],
    },
];

test("addNote should add a new note to DB", async () => {
    const content = "clean the dishes";
    const tags = ["chore", "home"];

    const expectedNoteData = {
        id: new Date().getTime(),
        content,
        tags,
    };

    insertNote.mockResolvedValue(expectedNoteData);

    const result = await addNote({ content, tags });
    expect(result).toEqual(expectedNoteData);
});

test("getAllNotes should get all notes from DB", async () => {
    getDB.mockResolvedValue({ notes: mockNotesData });

    const result = await getAllNotes();
    expect(result).toEqual(mockNotesData);
});

test("removeNote should remove specified note with id if found", async () => {
    const idToRemove = 1729944079877;
    getDB.mockResolvedValue({ notes: mockNotesData });

    const result = await removeNote(idToRemove);
    expect(result).toBe(idToRemove);
    expect(saveDB).toHaveBeenCalledTimes(1);
});

test("removeNote should do nothing if note with id is not found", async () => {
    const idToRemove = 1829944079878;
    getDB.mockResolvedValue({ notes: mockNotesData });

    const result = await removeNote(idToRemove);
    expect(result).toBeUndefined();
    expect(saveDB).not.toHaveBeenCalled();
});
