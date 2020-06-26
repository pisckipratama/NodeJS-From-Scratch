const { MongoClient } = require('mongodb');
const { MONGOURI } = require('./config');

async function main() {
  const client = new MongoClient(MONGOURI, { useUnifiedTopology: true, useNewUrlParser: true });

  try {
    await client.connect();
    await deleteListingByName(client, "City of Flowers");
  } finally {
    await client.close();
  }
};

main().catch(console.error);

async function deleteListingByName(client, nameOfListing) {
  result = await client.db("crud").collection("products").deleteOne({ name: nameOfListing });

  console.log(`${result.deletedCount} document(s) was/were deleted.`);
};