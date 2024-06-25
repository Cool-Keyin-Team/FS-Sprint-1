const {extractLines} = require("./utils");
const crc32 = require('crc/crc32');
const fs = require('fs')
const path = require('path')

class TokenHandler {
    #token = {
        "created": "1969-01-31 12:30:00",
        "username": "username",
        "email": "user@example.com",
        "phone": "5556597890",
        "token": "token",
        "expires": "1969-02-03 12:30:00",
        "confirmed": "tbd"
    }

    handleRequest(argument, additionalArgument) {
        switch (argument) {
            case '--count':
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

    countTokens() {

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
        const filePath = path.join(__dirname, '/../json/tokens.json')

        fs.readFile(filePath, 'utf-8', (error, data) => {
            if (error) throw error;
            let tokens = JSON.parse(data);
            tokens.push(token);

            fs.writeFile(filePath, JSON.stringify(tokens), (err) => {
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
