const { MongoClient } = require('mongodb');
const { MONGOURI } = require('./config');

async function main() {
  const client = new MongoClient(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    await updateAllListingToHavePropertyType(client);
  } finally {
    await client.close();
  }
};

main().catch(console.error);

async function updateAllListingToHavePropertyType(client) {
  result = await client.db("crud").collection("products").updateMany(
    { property_type: { $exists: false } },
    { $set: { property_type: "Unknown" } }
  );

  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
};