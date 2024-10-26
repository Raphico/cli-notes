export function interpolate(html, data) {
    const templateMatches = /\{\{\s*(\w+)\s*\}\}/g;
    return html.replace(
        templateMatches,
        function replacePlaceholder(match, placeholder) {
            return data[placeholder] || "";
        }
    );
}

export function formatNotes(notes) {
    return notes
        .map(function generateHTMl(note) {
            return `
            <article>
                <h2>${note.content}</h2>
                <ul>
                    ${note.tags
                        .map((tag) => {
                            return `<li>${tag}</li>`;
                        })
                        .join("\n")}
                </ul>
            </article> 
        `;
        })
        .join("\n");
}
