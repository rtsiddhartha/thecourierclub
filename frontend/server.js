//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('__dirname + dist/angular-app-heroku'));

app.get('/*', (req, res) =>
//     res.sendFile('index.html', {root: 'dist/angular-app-heroku/'}),
          const fullPath = path.join(__dirname + '/dist/angular-app-heroku/index.html');
  console.log(" Fetching from.." + fullPath);
    res.sendFile(fullPath);
console.log('Server started running..');
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT ||3000);
