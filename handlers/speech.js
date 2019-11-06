const request = require('request');
const config = require('../configs/config');

async function speechToText(req, res) {
  const body = {
    "config": {
      // "encoding": "FLAC",
      "languageCode": "en-US",
      "audio_channel_count": 2,
    },
    "audio": {
      "uri": req.body.sound_file,
    }
  }
  const url = `https://speech.googleapis.com/v1/speech:recognize?key=${config.gspeech_to_text_key}`;

  console.log('url', url, body)
  return new Promise((resolve, reject) => {
    request({
      method: `POST`,
      url,
      body,
      headers: {
        "Content-Type": "application/json",
      },
      json: true,
    }, (err, resp, body) => {
      if (err) {
        console.log('body', err, body)
        return reject(err);
      }
      console.log('body', body)
      return resolve(body);
    });
  });
}

module.exports = {
  speechToText
}