const express = require('express');
const path = require('path');
const app = express();

global.appRoot = path.resolve(__dirname);

app.use(express.static(appRoot + '/public'));

app.get('/', (req, res) => {
  res.sendFile(appRoot + '/public/index.html');
});

app.listen(80);
