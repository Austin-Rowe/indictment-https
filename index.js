const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');
const appHttps = express();
const app = express();

const key = fs.readFileSync(/*path to key*/);
const cert = fs.readFileSync( /*path to cert*/ );

const options = {
    cert: cert,
    key: key
}

/*------------------------
-----HTTPS SECTION-------
-------------------------*/
appHttps.use(express.static(path.join(__dirname, 'build')));

//React build folder serve up
appHttps.get('*', res => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

https.createServer(options, appHttps).listen(443, () => console.log('Listening on port 443'));


/*-------------------------------
-----HTTP REDIRECT SECTION-------
---------------------------------*/

app.use( (req, res) => {
    res.redirect('https://' + req.headers.host + req.url);
});

app.listen(80, ()=> console.log(`Listening on port 80`));
