const { MongoClient } = require('mongodb');
const { MONGOURI } = require('./config');

async function main() {
  const client = new MongoClient(MONGOURI, { useUnifiedTopology: true, useNewUrlParser: true });

  try {
    await client.connect();
    await deleteListingProperty(client, "Unknown");
  } finally {
    await client.close();
  }
};

main().catch(console.error);

async function deleteListingProperty(client, propertyName) {
  result = await client.db("crud").collection("products").deleteMany({ "property_type": propertyName });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
};