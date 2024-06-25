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
            if (error) throw error;
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

    updateToken() {

    }

    searchToken() {

    }
}

module.exports = {TokenHandler}
