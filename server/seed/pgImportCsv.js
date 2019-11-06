require('dotenv').config();
const fs = require('fs');
const util = require('util');
const { Pool } = require('pg');
const copyFrom = require('pg-copy-streams').from;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'btetsycarousel',
  password: '',
  port: 5432,
});

// eslint-disable-next-line func-names
async function seed25Csv(i = 1) {
  pool.connect((err, client, done) => {
    const stream = client.query(copyFrom('COPY Product FROM STDIN CSV'));
    const fileStream = fs.createReadStream(`./csv/pgProductImport${1000 + i}.csv`);
    fileStream.on('error', done);
    stream.on('error', done);
    stream.on('end', done);
    fileStream.pipe(stream);
    fileStream.on('end', () => {
      console.log(`imported file ${i}`);
      if (i < 10) {
        seed25Csv(i + 1);
      }
    })
  });
}

seed25Csv(1);
