const router = require("./routers/productos")
// init project
const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, "static")))

app.use("/api", router)

app.use((error, req, res, next) => {
  if(error.statusCode){
    return res.status(error.statusCode).json({error: error.message})
  }
  console.log(error)
  res.status(500).json({error: "Something brokes..."})
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
})