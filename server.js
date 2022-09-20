// server.js
// where your node app starts
const Contenedor = require("./contenedor.js")
const productos = new Contenedor("productos.txt")
// init project
const express = require("express");
const app = express();

const PORT = 8080
// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", async (req, res) => {
  const response = await productos.getAll()
  res.json(response)
});

app.get("/productos", async (req, res) => {
  res.json(await productos.getAll())
});

app.get("/productoRandom", async (req, res) => {
  const prods = await productos.getAll()
  const numeroRandom = Math.floor(Math.random() * prods.length)
  res.json(await prods[numeroRandom])
});

// listen for requests :)
const listener = app.listen(PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
})