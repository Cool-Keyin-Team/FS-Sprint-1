const http = require('http');
const fs = require('fs');
const path = require('path');
const {parse} = require('querystring');
const {checkFileExists} = require("./src/utils");
const {TokenHandler} = require("./src/token");

const modelExists = checkFileExists('./models/form-model.js')
const viewExists = checkFileExists('./views/index.html')
const tokensExists = checkFileExists('./json/tokens.json')

if (!modelExists || !viewExists || !tokensExists) {
    console.log('check "node cli ---help"')
    return
}

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Read the HTML file
        const filePath = path.join(__dirname, 'views', 'index.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Internal Server Error');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && req.url === '/get') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const formData = parse(body);
            const tokenHandler = new TokenHandler()
            const token = tokenHandler.searchToken('username', formData.username)?.token || 'Not Found'

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`Form submitted successfully!\nYour token: ${token}`);
        });
    } else if (req.method === 'POST' && req.url === '/create') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const formData = parse(body);
            const tokenHandler = new TokenHandler()
            const token = tokenHandler.createToken(formData.username)

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`Form submitted successfully!\nYour token: ${token}`);
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
    }
});

const PORT = 3000

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
