const express = require("express")
const path = require("path")
const axios = require('axios')
const https = require('https')
const app = express()

const dotenv = require('dotenv')

// Load ENV data
dotenv.config()

const EXPRESS_PORT = process.env.EXPRESS_PORT || 5001
const AXIOS_CONFIG = {headers:{'Content-Type': 'application/json', 'X-API-Key': process.env.API_CONTROLLER_KEY}}

app.listen(EXPRESS_PORT, function () {
    console.log(`Express API on.........PORT : ${EXPRESS_PORT}`)
})

// Public Static File Folder
let public_folder = path.join(__dirname, '..', '/public/')
app.use(express.static(public_folder))
app.use(express.json())

/**
 * --------------------------------------------------
 * Static Pages
 * --------------------------------------------------
 */

// Main Page
app.get("/", function (req, res) {    
    res.status(200).sendFile(path.join(__dirname, '..', '/public/index.html'))
})

/**
 * --------------------------------------------------
 * API ROUTES
 * --------------------------------------------------
 */

// Get connections
app.get("/connections", function (req, res) {

    axios.get(`${process.env.API_CONTROLLER}/connections`, AXIOS_CONFIG)
    .then(result => {
        //console.log(result.data)
        res.status(200).send(result.data)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err.message)
    })

})

// Delete connections
app.get("/delete-connection/:connection_id", function (req, res) {

    let connection_id = req.params.connection_id

    console.log("DELETE ", connection_id);

    axios.delete(`${process.env.API_CONTROLLER}/connections/${connection_id}`, AXIOS_CONFIG)
    .then(result => {
        console.log(result.data)
        res.status(200).send(result.data)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err.message)
    })

})

// Get agent server status
app.get("/status", function (req, res) {

    axios.get(`${process.env.API_CONTROLLER}/status`, AXIOS_CONFIG)
    .then(result => {
        console.log(result.data)
        res.status(200).send(result.data)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err.message)
    })

})