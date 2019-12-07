const path=require('path');
const express=require('express');
const bodyParser = require('body-parser');
const theFormRoutes=require('./routes/formRoutes');
const mongoose = require('mongoose'); 
const helmet = require('helmet');
const morgan= require('morgan');
const fs = require('fs');
const https = require('https');
const session = require('express-session');


const app = express();

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@donors-yu9ge.mongodb.net/bloodDonors?retryWrites=true&w=majority`;

// const privateKey = fs.readFileSync('server.key');
// const certificate = fs.readFileSync('server.cert');

const loggingStream = fs.createWriteStream(path.join(__dirname,"access.log"),{flags:'a'});

app.set('view engine','ejs');
app.set('views','views');

app.use(helmet()); 
app.use(morgan('combined',{stream:loggingStream}));

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret:'thisIsTheSecretOfRajat'
}));

app.use(theFormRoutes);

mongoose.connect(MONGODB_URI ,{useNewUrlParser:true})
//mongoose.connect('mongodb+srv://rajat_dec:3oHvWIbhz8AyGsQa@donors-yu9ge.mongodb.net/bloodDonors?retryWrites=true&w=majority',{useNewUrlParser:true})
.then(result=>{
    // console.log('ConnectTODatabase successfully');
    // https.createServer({key:privateKey,cert:certificate},app)
    app.listen(process.env.PORT || 3000);
    // app.listen(3000);
})
.catch(err=>{
    console.log(err);
});

