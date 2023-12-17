const mongoose = require("mongoose");

const DB = process.env.Db_url;
// console.log(process.env.Db_url);

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('Connection Successful') })
    .catch((err) => console.log(err));