const {extractLines} = require("./utils");
const crc32 = require('crc/crc32');
const fs = require('fs')
const path = require('path')

class TokenHandler {
    handleRequest(argument, additionalArgument) {
        switch (argument) {
            case '--count':
                this.#countTokens()
                break
            case '--new':
                this.#createToken(additionalArgument[0])
                break
            case '--upd':
                const key = additionalArgument[0] === 'p' ? 'phone' :
                    additionalArgument[0] === 'e' ? "email" : ''

                if(!key) {
                    return console.log('Unknown key provided, please check "node cli token --help"')
                }

                this.#updateToken(additionalArgument[1], key, additionalArgument[2])
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

    #countTokens() {
        const tokenPath = path.join(__dirname, '/../json/tokens.json')

        fs.readFile(tokenPath, 'utf-8', (error, data) => {
            if (error) {
                console.log(error)
            }
            let tokens = JSON.parse(data);
            console.log(`Tokens count: ${tokens.length}`)
        })
    }

    #createToken(username, email = null, phone = null) {
        const token = {
            username,
            email,
            phone,
            created: Date.now(),
            expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
            token: crc32(username).toString(8)
        }
        const tokenPath = path.join(__dirname, '/../json/tokens.json')

        fs.readFile(tokenPath, 'utf-8', (error, data) => {
            if (error) {
                console.log(error)
            }
            let tokens = JSON.parse(data);
            tokens.push(token);

            fs.writeFile(tokenPath, JSON.stringify(tokens), (err) => {
                if (err) console.log(err);
                else {
                    console.log(`New token ${token.token} was created for ${username}.`);
                }
            })

        });

        return token.token;
    }

    #updateToken(username, key, value) {
        const tokenPath = path.join(__dirname, '/../json/tokens.json')

        fs.readFile(tokenPath, 'utf-8', (error, data) => {
            if (error) {
                console.log(error)
            }
            let tokens = JSON.parse(data);
            const index = tokens.findIndex(token => token.username === username);

            if (index === -1) {
                return console.log('Token not found')
            }

            tokens[index] = {...tokens[index], ...{[key]: value}}

            fs.writeFile(tokenPath, JSON.stringify(tokens), (err) => {
                if (err) console.log(err);
                else {
                    console.log(`Token ${tokens[index].token} was updated for ${username}.`);
                }
            })

        });
    }

    searchToken() {

    }
}

module.exports = {TokenHandler}
