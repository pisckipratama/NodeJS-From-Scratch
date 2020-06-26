const { MongoClient } = require('mongodb');
const { MONGOURI } = require('./config');

async function main() {
  const client = new MongoClient(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    await updateListingByName(client, "City of Flowers", { summary: "Look the beauty of the city of flowers", last_review: new Date() });
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function updateListingByName(client, nameOfString, updatedListing) {
  result = await client.db("crud").collection("products").updateOne(
    { name: nameOfString },
    { $set: updatedListing },
    { upsert: true }
  );

  console.log(`${result.matchedCount} document(s) matched the query criteria.`);

  if (result.upsertedCount > 0) {
    console.log(`One document was inserted with the id ${result.upsertedId._id}`);
  } else {
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
  }
};