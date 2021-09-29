const express = require('express');
const connectDB = require('./db/connect');
const app = express();
const tasks = require('./routes/routes');
require('dotenv').config()
app.use(express.static('./public'))
app.use(express.json());
app.use('/tbb', tasks);

// const port=3000
const port = process.env.PORT || 3000;
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log("Server is listening to port 3000 ...............");
        })
    } catch (error) {
        console.log(error);
    }
}

start();