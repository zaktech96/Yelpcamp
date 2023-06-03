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
  for (let i = 0; i < 10; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '62cf1c5989dcc0c92b607ba3',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In dicta, consectetur velit recusandae praesentium est dolorum. Reiciendis quam soluta est, nam ea quibusdam consequatur ullam alias, ipsa exercitationem rem sapiente!',
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dbvrwow6a/image/upload/v1658181155/Yelpcamp/bks26qjkyb8cncuoypz5.jpg',
          filename: 'Yelpcamp/bks26qjkyb8cncuoypz5'
        },
      ]
    })
    await camp.save()
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});



