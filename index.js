const express = require('express');
const app = express();
const path = require("path");
const cors = require("cors");
const connectDB = require('./config/db');

//connection to mongoDB
connectDB();
//use cors
app.use(cors());
//use json encode
app.use(express.json({ extended: false }));

//routes
app.use('/api/users/', require('./routes/users'));
app.use('/api/auth/', require('./routes/auth'));
app.use('/api/news', require('./routes/news'));
app.use('/api/contact', require('./routes/contactForm'));
app.use('/api/hack/team', require('./routes/Hackaton/team'));
app.use('/api/hack', require('./routes/Hackaton/hack'));

//resolve static folder for react app
app.use(express.static("_front-app/build"));

app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname, '_front-app', 'build', 'index.html'));
});

//initial port to start
const PORT = process.env.PORT || 5000;

//server app
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

/*
if (process.env.NODE_ENV === "production") {
    app.use(express.static("front-app/build"));

    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, 'front-app', 'build', 'index.html'));
    });
}
*/