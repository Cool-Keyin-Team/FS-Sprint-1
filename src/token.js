const {extractLines} = require("./utils");

class TokenHandler {
    handleRequest(argument, additionalArgument) {
        switch (argument) {
            case '--count':
                break
            case '--new':
                break
            case '--upd':
                break
            case '--search':
                break
            case '--help':
            default:
                extractLines('/../usage.txt', 15, 22)
                    .then((lines) => {
                        console.log('cli token help information\n')
                        console.log(lines)
                    })
                    .catch(console.log)
                break
        }
    }

    countTokens() {

    }

    createToken() {

    }

    updateToken() {

    }

    searchToken() {

    }
}

module.exports = {TokenHandler}
