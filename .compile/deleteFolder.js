import fs from 'fs';

const dir = process.argv[2];
console.log(`Deleting: '${dir}'`)
const run = () => {
    fs.rmdir(dir, { recursive: true }, (e) => {
        if (e) {
            console.error(e)
        } else {
            console.log(`Deleted: '${dir}'`)
        }
    });
}

run()
