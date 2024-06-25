const {extractLines} = require("./utils");
const {folders, files} = require("../templates");
const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');

class InitHandler {
    handleRequest(argument) {
        const createFolders = (folders) => {
            return new Promise(resolve =>
                this.#createFolders(folders)
                    .then(count => {
                        if (count === 0) {
                            console.log('All folders already exist.');
                        } else if (count <= folders.length) {
                            console.log(count + ' of ' + folders.length + ' folders were created.');
                        } else {
                            console.log('All folders successfully created.');
                        }
                    })
                    .catch(console.log)
                    .finally(resolve)
            )
        }

        const createFiles = (files) => {
            this.#createFiles(files)
                .then(count => {
                    if (count === 0) {
                        console.log('All files already exist.');
                    } else if (count <= files.length) {
                        console.log(count + ' of ' + files.length + ' files were created.');
                    } else {
                        console.log('All files successfully created.');
                    }
                })
                .catch(console.log)
        }

        switch (argument) {
            case '--help':
                extractLines('/../usage.txt', 4, 8)
                    .then((lines) => {
                        console.log('cli init help information\n')
                        console.log(lines)
                    })
                    .catch(console.log)
                break
            case '--all':
                createFolders(folders)
                    .then(() => createFiles(files))
                    .catch(console.log)
                break
            case '--mk':
                createFolders(folders)
                break
            case '--cat':
                createFiles(files)
                break
            default:
                break
        }
    }

    async #createFolders(folders) {
        let count = 0;

        await Promise.all(folders.map(async (folder) => {
            try {
                const folderPath = path.join(__dirname, '/../', folder)

                if (!fs.existsSync(folderPath)) {
                    await fsPromises.mkdir(folderPath);
                    count++;
                }
            } catch (error) {
                if (error.code !== 'EEXIST') {
                    throw error
                }
            }
        }))

        return count
    }

    async #createFiles(files) {
        let count = 0;

        await Promise.all(files.map(async (file) => {
            const folderPath = path.join(__dirname, '/../', file.path)
            const filePath = path.join(folderPath, file.name)

            if (fs.existsSync(folderPath)) {
                if (!fs.existsSync(filePath)) {
                    await fsPromises.writeFile(filePath, file.content);
                    count++;
                }
            } else {
                throw new Error(`Folder ${folderPath} doesnt exist! Run "node cli --mk" first!`)
            }
        }))

        return count
    }
}

module.exports = {InitHandler}
