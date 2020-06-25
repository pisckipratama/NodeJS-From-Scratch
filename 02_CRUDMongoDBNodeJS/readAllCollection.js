const { MongoClient } = require('mongodb');
const { MONGOURI } = require('./config');

async function main() {
  const client = new MongoClient(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    await findAllListing(client);
  } finally {
    await client.close();
  };
};

main().catch(console.error);

async function findOneListingByName(client, nameOfListing) {
  result = await client.db("test").collection("products").findOne({ name: nameOfListing });

  if (result) {
    console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
    console.log(result);
  } else {
    console.log(`No listings found with name '${nameOfListing}'`);
  }
};

async function findAllListing(client) {
  const cursor = client.db("crud").collection("products").find({});
  const result = await cursor.toArray();
  
  console.log(`total: ${result.length} record(s)`);
  console.log(result);
};