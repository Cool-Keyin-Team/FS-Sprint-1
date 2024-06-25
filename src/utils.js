const fsPromises = require('fs').promises;
const fs = require('fs');

async function extractLines(filePath, from, to) {
    const data = await fsPromises.readFile(__dirname + filePath, 'utf8');
    return data.toString().split('\n').slice(from, to).join('\n');
}

function checkFileExists(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log(`${filePath} does not exist.`);
    }
    return fs.existsSync(filePath)
}

module.exports = {extractLines, checkFileExists}
