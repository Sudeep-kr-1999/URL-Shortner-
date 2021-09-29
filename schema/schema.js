const mongoose = require('mongoose');
const UrlShortnerSchema = new mongoose.Schema({
    InputURL: {
        type: String,
        required: [true, "Must Provide a URL"],
        trim: true,

    },
    ShortenedURL: {
        type: String,
        default: ""

    }
});


module.exports = mongoose.model('URLShortner', UrlShortnerSchema);