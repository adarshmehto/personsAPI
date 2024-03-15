const express = require('express');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

//ye middlewares ko hmesha yaha pr hi add krna agr routes wali file mein krenge to data post k time pr error aegi
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//import the router file
const personRoutes = require("./routes/personRoute")
app.use('/person',personRoutes)
//app.use('/',personRoutes) esa bhi kr skte h but personRoute mein harr endpoint pr person common tha esliye waha se hata k idhr /person add kr diya

app.listen(port, () => {
    console.log(`app listening on port http://localhost:${port}`)
})