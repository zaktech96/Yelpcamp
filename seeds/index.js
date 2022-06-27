const mongoose = require("mongoose");
const cities = require("../src/cities");
const { places, descriptors } = require("../seedHelpers");
const Campground = require("../src/models/campground");

require("dotenv").config();

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: 'http://source.unsplash.com/collection/483251',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In dicta, consectetur velit recusandae praesentium est dolorum. Reiciendis quam soluta est, nam ea quibusdam consequatur ullam alias, ipsa exercitationem rem sapiente!',
      price
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});


