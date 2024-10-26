#! /usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
    handleAddNote,
    handleGetAllNotes,
    handleFindNotes,
    handleRemoveNote,
    handleRemoveAllNotes,
    handleLaunchWeb,
} from "../lib/commands.js";

const args = hideBin(process.argv);
yargs(args)
    .command(
        "new <note>",
        "create a new note",
        function setupArgs(yargs) {
            return yargs.positional("note", {
                type: "string",
                describe: "the content of the new note",
            });
        },
        (argv) => handleAddNote(argv)
    )
    .option("tags", {
        type: "string",
        alias: "t",
        describe: "the note tags",
    })
    .command("all", "get all notes", () => {}, handleGetAllNotes)
    .command(
        "find <filter>",
        "get matching notes",
        function setupArgs(yargs) {
            return yargs.positional("filter", {
                type: "string",
                describe: "the search parameter",
            });
        },
        (argv) => handleFindNotes(argv)
    )
    .command(
        "remove <id>",
        "remove note by id",
        function setupArgs(yargs) {
            return yargs.positional("id", {
                type: "number",
                describe: "the note id",
            });
        },
        (argv) => handleRemoveNote(argv)
    )
    .command(
        "web [port]",
        "launch a website to view notes",
        function setupArgs(yargs) {
            return yargs.positional("port", {
                type: "number",
                default: 5000,
                describe: "port to bind on",
            });
        },
        handleLaunchWeb
    )
    .command("clean", "remove all notes", () => {}, handleRemoveAllNotes)
    .demandCommand(1)
    .parse();
