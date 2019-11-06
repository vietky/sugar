

const pgConnection = {
  host: process.env.HOST || '127.0.0.1',
  user: process.env.SQL_USER || 'postgres',
  password: process.env.SQL_PASSWORD || '',
  database: process.env.SQL_DATABASE || 'sugar',
  port: 5432
};

if (
  process.env.INSTANCE_CONNECTION_NAME &&
  process.env.NODE_ENV === 'production'
) {
  pgConnection.host = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}


module.exports = {
  bucket: process.env.GCLOUD_STORAGE_BUCKET || 'sugar-hackathon',
  gspeech_to_text_key: process.env.GSPEECH_TO_TEXT_KEY || `AIzaSyAX689LXrd8RUoRPlth30uc1v3mDS9lzq4`,
  base_url: 'https://storage.googleapis.com',
  max_file_size: 50 * 1024 * 1024, // mb,
  pg_connection: pgConnection
}