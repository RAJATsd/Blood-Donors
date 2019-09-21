const path=require('path');
const express=require('express');
const bodyParser = require('body-parser');
const theFormRoutes=require('./routes/formRoutes');
const mongoose = require('mongoose');

const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use(theFormRoutes);

mongoose.connect('mongodb://localhost:27017/bloodDonors',{useNewUrlParser:true})
.then(result=>{
    console.log('ConnectTODatabase successfully');
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
});

