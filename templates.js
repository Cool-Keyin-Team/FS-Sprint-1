const folders = ['views', 'models', 'json'];

const index = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Membership token</title>
</head>
<body>
<h1>Get or create membership token</h1>
<form method="POST" action="/create">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>
    <br><br>
    <button type="submit">Create token</button>
</form>
<form method="POST" action="/get">
    <label for="username1">Username:</label>
    <input type="text" id="username1" name="username" required>
    <br><br>
    <button type="submit">Get token</button>
</form>
</body>
</html>
`;

const formModel = `
class FormModel {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

module.exports = FormModel;
`

const config = {
    name: 'AppConfigCLI',
    version: '1.0.0',
    description: 'The Command Line Interface (CLI) for the MyApp.',
    main: 'cli.js',
    superuser: 'adm1n',
    database: 'exampledb'
};

const files = [
    {
        content: index,
        name: 'index.html',
        path: 'views'
    },
    {
        content: formModel,
        name: 'form-model.js',
        path: 'models'
    },
    {
        content: JSON.stringify(config),
        name: 'config.json',
        path: 'json'
    },
    {
        content: '[]',
        name: 'tokens.json',
        path: 'json'
    }
]

module.exports = {
    folders,
    files,
    config
}
