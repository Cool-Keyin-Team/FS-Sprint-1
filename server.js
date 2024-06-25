const http = require('http');
const querystring = require('querystring');
const {checkFileExists} = require("./src/utils");

const modelExists = checkFileExists('./models/form-model')
const viewExists = checkFileExists('./views/form-view.html')

if (!modelExists || !viewExists) {
    return
}

const FormModel = require('./models/formModel');
const { renderForm, renderResponse } = require('./views/formView');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        // Serve the HTML form
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(renderForm());
    } else if (req.method === 'POST') {
        // Handle form submission
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const parsedBody = querystring.parse(body);
            const formModel = new FormModel(parsedBody.name, parsedBody.email);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(renderResponse(formModel));
        });
    } else {
        // Handle other HTTP methods
        res.writeHead(405, {'Content-Type': 'text/plain'});
        res.end('Method Not Allowed');
    }
});

const PORT = 3000

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
