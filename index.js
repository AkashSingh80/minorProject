const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const BodyPara = require('./modelBody'); // Importing the schema

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const DB =
    "mongodb+srv://akashsinghjadaun2003:akash123@cluster0.1nws6.mongodb.net/";

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));


// POST endpoint to save new data
app.post('/api/body-parameters-post', async (req, res) => {
    try {
        const { spO2, ambientTempC, objectTempC, heartRate, gsrValue } = req.body;

        const newBodyPara = new BodyPara({
            spO2,
            ambientTempC,
            objectTempC,
            heartRate,
            gsrValue
        });

        await newBodyPara.save();
        res.status(201).json({ message: 'Data saved successfully', data: newBodyPara });
    } catch (err) {
        res.status(500).json({ message: 'Error saving data', error: err });
    }
});

// GET endpoint to retrieve the most recent data
app.get('/api/body-parameters', async (req, res) => {
    try {
        const data = await BodyPara.find().sort({ createdAt: -1 });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving data', error: err });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
