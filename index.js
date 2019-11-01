const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const path = require('path')
const bodyParser = require('body-parser')
const {
    upload,
    get,
} = require('./handlers');



app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: false
}));
app.use(express.static('assets'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/assets/home.html'));
})

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname + '/assets/test.html'));
});

app.post('/assets/', upload);

app.get('/assets/:filePath', get)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})