const express = require("express");
const app = express();
const env = require('dotenv');
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');

// Environment Variable config
env.config();

// Routes
const customerRoutes = require('./routes/customer');

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@sandbox.vkb0s.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Database Connected!!!")
    })
    .catch((err) => {
        console.log("Failed to connect database!", err)
    })


// App Congif
app.use(cors());
app.use(express.json());

// Route Setup
app.use('/api', customerRoutes);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
    });
}

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})
