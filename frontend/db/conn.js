const mongoose = require('mongoose');

async function main(){

    try{
        mongoose.set("strictQuery", true);
        await mongoose.connect('mongodb+srv://brenozaffa01:QYpLfktpxnmciOeW@cluster0.fnahhhs.mongodb.net/?retryWrites=true&w=majority');
        console.log("Connection to DB successful");
    } catch(err){
        console.log("Connection to DB failed");
    }

}

module.exports = main;