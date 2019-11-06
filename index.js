const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const path = require('path')
const bodyParser = require('body-parser')
const Multer = require('multer');
const config = require('./configs/config.js');

const {
    getImage,
    getMedia,
    getAllAds,
    getAdsById,
    createAds,
    upload,
    searchAds,
    speechToText,
} = require('./handlers');

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: config.max_file_size,
    },
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
    // Recommended: send the information to sentry.io
    // or whatever crash reporting service you use
})

process.on('uncaughtException', function (err) {
    console.log(err);
});

app.use(function (err, req, res, next) {
    console.error('err ne', err.stack);
    res.status(500).json(err);
})

app.use(bodyParser.json({
    limit: '50mb'
}));       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true,
    limit: '50mb',
    parameterLimit: config.max_file_size,
}));
app.use(express.static('assets'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/ads/get-all', async (req, res) => {
    try {
        const result = await getAllAds(req, res);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({
            message: err.message,
            stack: err.stack,
        });
    }
});

app.get('/api/ads/search', async (req, res) => {
    try {
        const result = await searchAds(req, res);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({
            message: err.message,
            stack: err.stack,
        });
    }
});


app.post('/api/voices', async (req, res) => {
    try {
        const result = await speechToText(req, res);
        console.log('result ne', result);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({
            message: err.message,
            stack: err.stack,
        });
    }
});

app.get('/api/ads/:id', async (req, res) => {
    try {
        const result = await getAdsById(req, res);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({
            message: err.message,
            stack: err.stack,
        });
    }
});

app.post('/api/ads', async (req, res) => {
    try {
        await createAds(req, res);
        res.status(200).json({
            message: 'ok'
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
            stack: err.stack,
        });
    }
});


app.post('/api/assets/', multer.single('file'), async (req, res, next) => {
    if (!req.file) {
        res.status(400).json({
            message: 'No file uploaded.'
        });
        return;
    }
    try {
        const result = await upload(req, res, next);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json({
            message: err.message,
            stack: err.stack,
        });
    }
});

app.get('/api/assets/audio/:filePath', getMedia);
app.get('/api/assets/images/:filePath', getImage);

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + '/assets/index.html'));
// })

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/assets/index.html'));
// })

app.listen(port, () => {
    console.log(`Sugar is listening on port ${port}!`)
})