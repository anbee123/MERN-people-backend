// DEPENDENCIES 



//get .env vars
require("dotenv").config()

//get port and db url
const { PORT, DATABASE_URL } = process.env
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require ("cors")



//DATABASE CONECTION
mongoose.connect(DATABASE_URL)
//connection
mongoose.connection
    .on("open", () => { console.log("you are connected to mongodb") })
    .on("close", () => { console.log("you are disconnected") })
    .on("error", (error) => { console.log(error) })

//MODEL 
const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,

})
const People = mongoose.model("People", PeopleSchema)

//middleware
app.use(cors()) //prevents cross origin resource sharing error, aloows access to the server from all the origin, react frontend
app.use(morgan("dev")) // loggs details of all server hits to terminal
app.use(express.json()) // parse json bodies from request
app.use(express.urlencoded({extended:false})); //to URL encoded

//ROUTES

app.get("/", (req, res) => {
    res.send("HELLO WORLD")
})
//people index route
app.get("/people", async (req, res) => {
    try {
        res.status(200).json(await People.find({}))
    } catch (error) {
        res.status(400).json(error)
    }

})

//create route
app.post("/people", async (req, res) => {
    try {

        res.status(200).json(await People.create(req.body))
    } catch (error) {
        res.status(400).json(error)

    }
})

//delete route
app.delete("/people/:id", async (req, res) => {
    try {
      // send deleted record
      res.json(await People.findByIdAndDelete(req.params.id))
    } catch (error) {
      //send error
      res.status(400).json(error)
    }
  })

//update route
app.put("/people/:id", async (req, res) => {
    try {
      // send updated person
      res.json(
        await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
      )
    } catch (error) {
      //send error
      res.status(400).json(error)
    }
  })





//listener 
app.listen(PORT, () => console.log(`listening to the smoothe sound of ${PORT}`))