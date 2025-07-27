const mongo = require ("mongoose");
require("dotenv").config();
const db_url = process.env.URL;
const Database_Connect = async function (){
    if(!db_url){
        console.log("URL Not Found")
    } else {
        try{
            mongo.connect(db_url);
        console.log("Database Connected");

    }catch(error){
        console.log("DB Not Connect")
        }
    }
}
module.exports = Database_Connect;