const { MongoClient } = require('mongodb');
const { MONGOURI } = require('./config');

async function main() {
  const client = new MongoClient(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    await findListingsWithMinimumBedroomsBathRoomsAndMostRecentReviews(client, {
      minimumNumberOfBedrooms: 4,
      minimumNumberOfBathrooms: 2,
      maximumNumberOfResults: 5
    });
  } finally {
    await client.close();
  };
};

main().catch(console.error);

async function findListingsWithMinimumBedroomsBathRoomsAndMostRecentReviews(client, {
  minimumNumberOfBedrooms = 0,
  minimumNumberOfBathrooms = 0,
  maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) {

  const cursor = client.db("crud").collection("products").find({
    bedrooms: { $gte: minimumNumberOfBedrooms },
    bathrooms: { $gte: minimumNumberOfBathrooms }
  }).sort({ last_review: -1 }).limit(maximumNumberOfResults);

  const result = await cursor.toArray();

  if (result.length > 0) {
    console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`);
    result.forEach((result, i) => {
      date = new Date(result.last_review).toDateString();

      console.log();
      console.log(`${i + 1}. name: ${result.name}`);
      console.log(`   _id: ${result._id}`);
      console.log(`   bedrooms: ${result.bedrooms}`);
      console.log(`   bathrooms: ${result.bathrooms}`);
      console.log(`   most recent review date: ${new Date(result.last_review).toDateString()}`);
    });
  } else {
    console.log(`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`);
  }
};