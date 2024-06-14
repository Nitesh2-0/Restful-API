require('dotenv').config();
require('./DBConnecction')
const bodyParser = require('body-parser');
const express = require('express')
const app = express(); 


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', require('./routes/index'))

app.listen(process.env.PORT, () => console.log(`Server is started on port ${process.env.PORT}`))