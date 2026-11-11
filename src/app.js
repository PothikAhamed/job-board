require('dotenv').config()
const express = require('express')
const { dbConfig } = require('./config/db')
const app = express()
const router =require("./router")
const ApiResponse = require('./utils/apiResponse')
const dns = require("node:dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dbConfig()
app.use(express.json())
//localhost:300
app.use(router)

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    ApiResponse(res, statusCode, err.message || 'internal server error',)
})


module.exports= app