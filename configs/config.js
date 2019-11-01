
module.exports = {
  bucket: process.env.GCLOUD_STORAGE_BUCKET || 'sugar-maroon',
  base_url: 'https://storage.googleapis.com',
  max_file_size: 50 * 1024 * 1024, // mb
}