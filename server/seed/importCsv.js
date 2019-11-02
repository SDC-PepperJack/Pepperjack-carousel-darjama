require('dotenv').config();
const fs = require('fs');
const { Pool } = require('pg');
const copyFrom = require('pg-copy-streams').from;

const pool = new Pool({
  user: process.env.PGUSER,
  host: 'localhost',
  database: 'btetsycarousel',
  password: process.env.PGPASSWORD,
  port: 5432,
});
// eslint-disable-next-line func-names
pool.connect((err, client, done) => {
  const stream = client.query(copyFrom('COPY Product FROM STDIN CSV'));
  const fileStream = fs.createReadStream(`pgProductRecordImport101.csv`)
  fileStream.on('error', done);
  stream.on('error', done);
  stream.on('end', done);
  fileStream.pipe(stream);
});
