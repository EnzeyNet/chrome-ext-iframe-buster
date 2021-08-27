import fs from 'fs';
import path from 'path';

const dirSrc = process.argv[2];
const dirDest = process.argv[3];

async function copyDir(src, dest) {
    try {
        const makingDestDir = fs.promises.mkdir(dest, { recursive: true })
        let entries = await fs.promises.readdir(src, { withFileTypes: true })
        await makingDestDir

        for (let entry of entries) {
            let srcPath = path.join(src, entry.name);
            let destPath = path.join(dest, entry.name);

            entry.isDirectory() ?
                copyDir(srcPath, destPath) :
                fs.promises.copyFile(srcPath, destPath);
        }
    } catch (e) {
        console.error('build failure')
        throw e
    }
}

copyDir(dirSrc, dirDest)
