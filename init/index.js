const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connection Done");

    await Listing.deleteMany({});
    await Listing.insertMany(data);
    console.log("Seed complete");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });



