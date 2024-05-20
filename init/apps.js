const mongoose = require("mongoose");
const initdata = require("./data.js");
const List = require("../models/listing.js"); // Import using the same model name

const MONGO = "mongodb://127.0.0.1:27017/wanderlust";
main().then(() => { console.log("db is working"); })
    .catch((err) => { console.log(err); });

async function main() {
    await mongoose.connect(MONGO);
}

const initdb = async () => {
    await List.deleteMany({}); // Use the imported model "List" consistently
    await List.insertMany(initdata);
    console.log("data was initialized");
}

initdb();
