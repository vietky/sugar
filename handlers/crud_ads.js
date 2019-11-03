const { Pool } = require('pg')
const config = require('../configs/config.js');

console.log('config.pg_connection', config.pg_connection)
const pool = new Pool(config.pg_connection);

async function usePool(cb) {
  let client;
  try {
    client = await pool.connect();
    return await cb(client);
  }
  finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    if (client) {
      client.release()
    }
  }
}

async function insert(req) {
  return await usePool(async (client) => {
    const ads = req.body;

    const result = await client.query(`
        INSERT INTO ads(
          title,
          description,
          voice_description,
          price,
          images,
          category,
          created_date,
          modified_date)
        VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
      `, [
        ads.title,
        ads.description,
        ads.voice_description,
        ads.price,
        ads.images,
        5010
      ]);
    return result.rows;
  });
}

async function getAll(req) {
  return await usePool(async (client) => {
    const result = await client.query('SELECT * FROM ads ORDER BY id DESC')
    return result.rows;
  });
}

async function getAds(req) {
  if (!req.params.id) {
    throw new Error(`id ${req.params.id} is not specified`);
  }
  return await usePool(async (client) => {
    const result = await client.query('SELECT * FROM ads WHERE id = $1', [req.params.id])
    if (result.rows.length < 1) {
      throw new Error(`id ${req.params.id} is not found`);
    }
    return result.rows[0];
  });
}


module.exports = {
  getAllAds: getAll,
  createAds: insert,
  getAdsById: getAds,
};