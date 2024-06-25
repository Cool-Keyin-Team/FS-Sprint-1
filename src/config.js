const {extractLines} = require("./utils");
const fs = require('fs');
const path = require('path')
const {config} = require("../templates");

class ConfigHandler {
    handleRequest(argument, {option, value}) {
        switch (argument) {
            case '--show':
                this.#showConfig()
                break
            case '--reset':
                this.#resetConfig()
                break
            case '--set':
                this.#setConfig(option, value)
                break
            case '--help':
            default:
                extractLines('/../usage.txt', 10, 13)
                    .then((lines) => {
                        console.log('cli config help information\n')
                        console.log(lines)
                    })
                    .catch(console.log)
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

    #setConfig(option, value) {
        const fs = require('fs');
        const filePath = path.join(__dirname, '/../json/config.json')

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }

            try {
                const jsonData = JSON.parse(data);

                jsonData[option] = value;

                const updatedJsonData = JSON.stringify(jsonData, null, 2);

                fs.writeFile(filePath, updatedJsonData, 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return;
                    }
                    console.log('File has been updated successfully');
                });
            } catch (err) {
                console.error('Error parsing JSON:', err);
            }
        });

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
