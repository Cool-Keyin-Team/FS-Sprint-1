const folders = ['views', 'models', 'logs', 'json'];

const index = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple Node.js Form</title>
</head>
<body>
  <h1>Simple Node.js Form</h1>
  <form method="POST" action="/">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    <br><br>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <br><br>
    <button type="submit">Submit</button>
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
    }
]

module.exports = {
    folders,
    files
}
