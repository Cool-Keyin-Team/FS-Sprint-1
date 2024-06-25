const {extractLines} = require("./utils");
const {folders} = require("../templates");
const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');

class InitHandler {
    handleRequest(argument) {
        const createFolders = (folders) => {
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
                .catch(error => {
                    if (error.code !== 'EEXIST') {
                        console.log(error)
                    }
                })
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
                break
            case '--mk':
                createFolders(folders)
                break
            case '--cat':
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
            } catch {
            }
        }))

        return count
    }

    #createFiles() {

    }
}

module.exports = {InitHandler}
