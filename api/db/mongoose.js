//this file will handle connection logic to the MongoDB
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TaskManager', {useNewUrlParser:true}).then(()=>{
    console.log("connected to MongoDB");
}).catch((e)=>{
    console.log("Error while connecting to database");
    console.log(e);
});

mongoose.set('userCreateIndex',true);
mongoose.set('useFindAndModify',false);
mongoose.set('useUnifiedTopology',true);

module.exports = {
    mongoose
};