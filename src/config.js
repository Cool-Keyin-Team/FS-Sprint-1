const {extractLines} = require("./utils");

class ConfigHandler {
    handleRequest(argument, {option, value}) {
        switch (argument) {
            case '--help':
                extractLines('/../usage.txt', 10, 13)
                    .then((lines) => {
                        console.log('cli config help information\n')
                        console.log(lines)
                    })
                    .catch(console.log)
                break
            case '--show':
                break
            case '--reset':
                break
            case '--set':
                break
            default:
                break
        }
    }

    setConfig() {

    }

    showConfig() {

    }
}

module.exports = {ConfigHandler}
