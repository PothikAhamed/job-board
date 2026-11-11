const mongoose = require("mongoose");
// ==============dns================
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

exports.dbConfig = async ()=>{
    try {
       const result = await mongoose.connect(process.env.DB_URL)
       console.log("database connected");
       
    } catch (error) {
        console.log(error.message || "database connected");
        
    }
}