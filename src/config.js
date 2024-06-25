const {extractLines} = require("./utils");
const fs = require('fs');
const path = require('path')
const {config} = require("../templates");

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
                this.#resetConfig()
                break
            case '--set':
                break
            default:
                break
        }
    }

    #resetConfig() {
        const filePath = path.join(__dirname, '/../json/config.json')

        fs.writeFile(filePath, JSON.stringify(config), (err) => {
            if (err) {
                return console.log('Error while resetting config')
            }

            console.log('Config has been reset')
        });
    }

    #setConfig() {

    }

    #showConfig() {
        let fileName = '/../json/config.json'
        fs.readFile(__dirname + fileName, (error, data) => {
            if (error) {
                return console.log('Config not found!')
            }

            console.log(JSON.parse(data));
        });
    }
}

module.exports = {ConfigHandler}
