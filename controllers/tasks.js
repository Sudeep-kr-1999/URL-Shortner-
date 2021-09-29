const randomstring = require("randomstring");
const URLShortner = require('../schema/schema');
const getAllLinks = async(req, res) => {

    try {
        const savedURLs = await URLShortner.find({})
        res.status(200).json({ savedURLs });
    } catch (error) {
        res.status(500).json({ msg: "error occour while finding data", errorDetails: error })
    }
}


const addLink = async(req, res) => {
    try {
        const shortURL = randomstring.generate({
            length: 10
        });
        const body = {
            InputURL: req.body.InputURL,
            ShortenedURL: `localhost:3000/tbb/${shortURL}`
        }
        const newLink = await URLShortner.create(body);
        res.status(201).json({ newLink })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


const deleteLink = async(req, res) => {
    try {
        const { id: urlID } = req.params
        const deleteURL = await URLShortner.findOneAndDelete({ _id: urlID })
        if (!deleteURL) {
            return res.status(404).json({ msg: `No such URL Found` })
        }
        res.status(200).json({ deleteURL });
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const getToLink = async(req, res) => {
    try {
        const { id: link } = req.params;
        const originalLink = await URLShortner.findOne({ ShortenedURL: `localhost:3000/tbb/${link}` });
        if (!originalLink) {
            return res.status(404).json({ msg: `No endpoint with id : ${link}` })
        }
        // res.status(201).json({ originalLink });
        return res.redirect(originalLink.InputURL)
    } catch (error) {
        res.status(500).json({ msg: error })
    }

}

module.exports = { getAllLinks, addLink, deleteLink, getToLink };