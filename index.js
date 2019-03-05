const express = require('express');
const port = 80;

const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));


//React build folder serve up
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(port, ()=> console.log(`Listening on port ${port}`));

