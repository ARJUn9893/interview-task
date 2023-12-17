require('dotenv').config()
const express = require('express');
const app = express();
require('./Database/Connection');
app.use(express.json());

const cors = require('cors');

app.use(cors());
app.use('/api', require('./Router/user'));
app.use('/api', require('./Router/developer'));
app.use('/api', require('./Router/skills'));


const port = process.env.port;

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log(`Server is running on localhost:${port}`);
})
