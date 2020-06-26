const { MongoClient } = require('mongodb');
const { MONGOURI } = require('./config');

async function main() {
  const client = new MongoClient(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    await createMultipleListings(client, [
      {
        name: "Infinite Views",
        summary: "Modern home with infinite views from the infinity pool",
        property_type: "House",
        bedrooms: 5,
        bathrooms: 4.5,
        beds: 5
      },
      {
        name: "Private room in London",
        property_type: "Apartment",
        bedrooms: 1,
        bathroom: 1
      },
      {
        name: "Beautiful Beach House",
        summary: "Enjoy relaxed beach living in this house with a private beach",
        bedrooms: 4,
        bathrooms: 2.5,
        beds: 7,
        last_review: new Date()
      }
    ])
  } finally {
    await client.close();
  };
};

main().catch(console.error);

async function createMultipleListings(client, newListings) {
  const result = await client.db("crud").collection("products").insertMany(newListings);
  console.log(result.ops);
};