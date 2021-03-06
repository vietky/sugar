const { searchAds, getAllAds, createAds, getAdsById } = require('./crud_ads.js');
const { speechToText } = require('./speech.js');
const getImage = require('./get_image.js');
const getMedia = require('./get_media.js');
const upload = require('./upload.js');

module.exports = {
  getImage,
  getMedia,
  getAllAds,
  createAds,
  getAdsById,
  upload,
  searchAds,
  speechToText,
}