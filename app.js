const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser());

// const PORT = process.env.PORT || 3000;

let pizzas = [
  {
    id: "1",
    name: "pizza1",
    price: 20
  },
  {
      id: "2",
      name: "pizza2",
      price: 22
  }
];

app.get("/",(req,res) => {
    res.json("Welcome to the pizza app")
})

app.get("/pizzas",(req,res) => {
    res.json(pizzas)
})

app.get("/pizzas/:id", (req, res) => {
    res.json(pizzas.find((pizza)=>{
        return pizza.id === req.params.id
    }))
})

app.post("/pizzas", (req, res) => {
    pizzas = [...pizzas, req.body]
    res.json(pizzas)
})

app.put("/pizzas/:id", (req, res) => {
    let pizza = pizzas.find((pizza) => {
        return pizza.id === req.params.id
    })
    const index = (pizzas.indexOf(pizza))
    pizzas[index] = {...pizzas[index], ...req.body}
    res.json(pizzas[index])

})

app.delete("/pizzas/:id", (req, res) => {
    pizzas = pizzas.filter(pizza => pizza.id !== req.params.id)
    res.json(pizzas)
})

module.exports = app

// const server = app.listen(PORT, function() {
//     console.log(`Server started on port ${PORT}...`)
// })