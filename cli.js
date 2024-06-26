const fs = require('fs');
const {TokenHandler} = require("./src/token");
const {ConfigHandler} = require("./src/config");
const {InitHandler} = require("./src/init");

const arguments = process.argv.slice(2)

switch (arguments[0]) {
    case 'init':
        const initHandler = new InitHandler()
        initHandler.handleRequest(arguments[1])
        break
    case 'config':
        const configHandler = new ConfigHandler()
        configHandler.handleRequest(arguments[1], {option: arguments[2], value: arguments[3]})
        break
    case 'token':
        const tokenHandler = new TokenHandler()
        tokenHandler.handleRequest(arguments[1], arguments.slice(2))
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
