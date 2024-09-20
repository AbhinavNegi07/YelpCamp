const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
// const { access } = require('fs'); //came from nowwhere, maybe node inserted this

//connecting mongoose with mongodb
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    // useNewUrlParser: true,
    // // useCreateIndex: true,     Not working in modern version of node other use option are also deprecated, will be removed in newer version
    // useUnifiedTopology: true
})
//checking connection errors
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //Your user id
            author: '668fc86626904a5bfe35b887',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dnbkbwxk7/image/upload/v1721456945/YelpCamp/nkt6syaphnofgd69txza.jpg',
                    filename: 'YelpCamp/nkt6syaphnofgd69txza'
                },
                {
                    url: 'https://res.cloudinary.com/dnbkbwxk7/image/upload/v1721456946/YelpCamp/p4e2rjvhxo1loxxt9vre.jpg',
                    filename: 'YelpCamp/p4e2rjvhxo1loxxt9vre'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})