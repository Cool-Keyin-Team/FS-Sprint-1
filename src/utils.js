const fs = require('fs').promises;

async function extractLines(filePath, from, to) {
    const data = await fs.readFile(__dirname + filePath, 'utf8');
    return data.toString().split('\n').slice(from, to).join('\n');
}

module.exports = {extractLines}
