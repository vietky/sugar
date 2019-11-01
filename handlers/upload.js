const config = require('../configs/config.js');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();
const bucket = storage.bucket(config.bucket);
const uuidv1 = require('uuid/v1');

async function upload(req, res, next) {
  return new Promise((resolve, reject) => {

    // Create a new blob in the bucket and upload the file data.
    const fileType = req.body.type;
    if (['images', 'records'].indexOf(fileType) < 0) {
      return reject(new Error("invalid file type"));
    }
    const id = uuidv1();
    const blob = bucket.file(`${fileType}/${id}`);

    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      },
      resumable: false
    });

    blobStream.on('error', err => {
      return reject(err);
    });

    blobStream.on('finish', () => {
      blob.makePublic().then(() => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = `${config.base_url}/${bucket.name}/${fileType}/${id}`
        return resolve({
          fileType,
          publicUrl
        });
      });
    });

    blobStream.end(req.file.buffer);
  });
}

module.exports = upload;