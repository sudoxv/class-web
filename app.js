const express = require("express")
const { MongoClient, ServerApiVersion } = require("mongodb")
const path = require('path')
const mongo = {
  uri: "mongodb+srv://lyvua:qMnhHQLBz4zSAMme@databasebot.wisqy4d.mongodb.net/?retryWrites=true&w=majority&appName=DatabaseBot",
  collection: "exma"
}
const client = new MongoClient(mongo.uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

async function addData(collectionName, data) {
  try {
    await client.connect()
    const database = client.db("function addData(collectionName, data) {
  try {
    await client.connect()
    const database = client.db("data")
    const collection = database.collection(collectionName)
    const result = await collection.insertOne(data)
    console.log(`Data added with id: ${result.insertedId}`)
  } finally {
    await client.close()
  }
}

async function watchData(collectionName) {
  try {
    await client.connect()
    console.log('Connected to database')
    const db = client.db("function watchData(collectionName) {
  try {
    await client.connect()
    console.log('Connected to database')
    const db = client.db("data")
    const collection = db.collection(collectionName)
    const data = await collection.find({}).toArray()
    console.log(data)
    return data
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await client.close()
  }
}

const app = express()
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.get("/", async (req, res) => {
  const galeri = await watchData(mongo.collection)
  res.render("index", { galeri: galeri })
})

app.get("/upload", (req, res) => {
  res.sendFile("./views/upload.html")
})

app.post("/api/v1/upload", async (req, res) => {
  const { data } = req.body
  try {
    await addData(mongo.collection, data)
    res.json({ msg: 'Data added successfully' })
  } catch (err) {
    res.status(500).json({ msg: err.message })
    console.error(err)
  }
})

app.listen(3001, () => {
  console.log("Server running on port: 3001")
})

module.exports = app
