const { MongoClient } = require('mongodb');
const { MONGOURI } = require('./config');

async function main() {
  const client = new MongoClient(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    await createListiing(client,
      {
        name: "Indomie",
        summary: "Seleraku",
        bedrooms: 2,
        bathrooms: 1
      }
    );

  } finally {
    await client.close();
  };
};

main().catch(console.error);

async function createListiing(client, newListing) {
  const result = await client.db("crud").collection("products").insertOne(newListing);
  console.log(`New listing created with the following _id: ${result.ops[0]._id}`);
};