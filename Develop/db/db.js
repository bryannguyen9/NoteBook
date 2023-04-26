// require dependencies
const fs = require('fs');
const util = require('util');
const notes = './db/db.json';

const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);

class db {
    async getNotes() {
        try {
            const notesRaw = await read(noteData, 'UTF8');
            return notesRaw ? JSON.parse(notesRaw) : [];
        } catch (err) {
            throw err;
        }
    }

    async addNotes(data) {
        try {
            await write(notesData, JSON.stringify(data, null, '\t')).then(() => {
                console.log('New note has been added');
            })
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new db();