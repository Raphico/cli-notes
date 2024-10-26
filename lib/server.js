import http from "node:http";
import fs from "node:fs/promises";
import { formatNotes, interpolate } from "./utils.js";
import open from "open";

export function launchServer(notes, port) {
    const server = http.createServer(async (req, res) => {
        try {
            if (req.url == "/") {
                const templateURL = new URL("../index.html", import.meta.url)
                    .pathname;

                const template = await fs.readFile(templateURL, {
                    encoding: "utf8",
                });
                const html = interpolate(template, {
                    notes: formatNotes(notes),
                });

                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(html);
            } else if (req.url == "/css/index.css") {
                const cssPath = new URL("../css/index.css", import.meta.url)
                    .pathname;
                const css = await fs.readFile(cssPath, { encoding: "utf8" });

                res.writeHead(200, { "Content-Type": "text/css" });
                res.end(css);
            } else {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("page not found");
            }
        } catch (error) {
            console.error(error);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal server error");
        }
    });

    server.listen(port, () => {
        console.log(`http://localhost:${port}`);
        console.log("Ready ✅");
    });

    open(`http://localhost:${port}`);
}
