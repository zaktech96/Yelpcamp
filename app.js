const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
<<<<<<< HEAD
const { campgroundSchema, reviewSchema } = require('../schemas.js');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
=======
const catchAsync = require('../utils/catchAsync');
>>>>>>> 0861e145837984525944d1bedab6b0c4a0dcf127
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const Review = require('./models/review');
const res = require('express/lib/response');

const campgrounds = require('../routes/campgrounds');

require('dotenv').config();

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

<<<<<<< HEAD

// mongoose.connect('mongodb://localhost:27017/yelp-camp', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

=======
>>>>>>> 0861e145837984525944d1bedab6b0c4a0dcf127
mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', "ejs");
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

app.use('/campgrounds', campgrounds)


app.get('/', (req, res) => {
    res.render('home')
});


app.post('/campgrounds/:id/reviews', ValidateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))

app.delete('/campgrounds/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}))


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})


app.listen(3000, () => {
    console.log('Serving on port 3000')
})
