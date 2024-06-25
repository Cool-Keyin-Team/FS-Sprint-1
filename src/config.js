const {extractLines} = require("./utils");
const fs = require('fs');

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
                this.#showConfig()
                break
            case '--reset':
                break
            case '--set':
                break
            default:
                break
        }
    }

    #setConfig() {

    }

    #showConfig() {
        let fileName = '/../json/config.json'
        fs.readFile(__dirname + fileName, (error, data) => {
            if(error) throw error;
            console.log(JSON.parse(data));
        });
    }
}

module.exports = {ConfigHandler}
