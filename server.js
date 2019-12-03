const path = require("path");
const express = require("express");
const app = express();
const proxy =require('http-proxy-middleware');
const cors = require('cors');

app.use(cors());
app.use(
  'dataservice.accuweather.com/currentconditions/v1/215805?apikey=WF8yKAXUhpOFgcbVfrttWKGBpcM9oakt',
  proxy('**',{ target: 'localhost:8080', changeOrigin: true })
);
app.use(express.static(__dirname + '/dist/weater-app-final/'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/weater-app-final/index.html'));
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
