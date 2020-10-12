var express = require('express'),
app = express(),
port = process.env.PORT || 3000;
bodyParser = require('body-parser');

console.log(process.env.ENV_NAME)
const ip = require('ip');
console.log('IP:', ip.address());

process.on('uncaughtException', function(err) { 
    console.log( " UNCAUGHT EXCEPTION " );
    console.log( "[Inside 'uncaughtException' event] " + err.stack || err.message );
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./app/routes/router.js")(app);

// app.get('/*', (req, res) => {
//     console.log('received request from UI');
//     res.status(200).send('received request from UI');
// });

app.listen(port);

console.log("SHG CRM API Gateway Started : "  + port);
