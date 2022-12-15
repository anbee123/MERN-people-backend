// DEPENDENCIES 



//get .env vars
require("dotenv").config()

//get port and db url
const { PORT, DATABASE_URL } = process.env
const express = require("express")
const app = express()
const mongoose = require("mongoose")



//DATABASE CONECTION
mongoose.connect(DATABASE_URL)
//connection
mongoose.connection
.on("open", ()=> {console.log("you are connected to mongodb")})
.on("close", ()=> {console.log("you are disconnected")})
.on("error", (error)=> {console.log (error)})

//MODEL 
const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String, 
    title: String,

})
const People  = mongoose.model("People", PeopleSchema)

//ROUTES

app.get("/", (req, res) => {
    res.send("HELLO WORLD")
    })







//listener 
app.listen(PORT, ()=> console.log(`listening to the smoothe sound of ${PORT}`))