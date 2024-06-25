const {extractLines} = require("./utils");

class InitHandler {
    handleRequest(argument) {
        switch (argument) {
            case '--help':
                extractLines('/../usage.txt', 4,8)
                    .then((lines) => {
                        console.log('cli init help information\n')
                        console.log(lines)
                    })
                    .catch(console.log)
                break
            case '--all':
                break
            case '--mk':
                break
            case '--cat':
                break
            default:
                break
        }
    }

    #createFolders() {

    }

    #createFiles() {

    }
}

module.exports = {InitHandler}
