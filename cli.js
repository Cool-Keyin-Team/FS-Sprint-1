const fs = require('fs');
const {TokenHandler} = require("./src/token");
const {ConfigHandler} = require("./src/config");
const {InitHandler} = require("./src/init");

const arguments = process.argv.slice(2)

switch (arguments[0]) {
    case 'init':
        const initHandler = new InitHandler()
        break
    case 'config':
        const configHandler = new ConfigHandler()
        break
    case 'token':
        const tokenHandler = new TokenHandler()
        break
    case '--help':
        fs.readFile(__dirname + "/usage.txt", (error, data) => {
            if (error) throw error;
            console.log(data.toString());
        });
        break
    default:
        break
}
