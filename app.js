const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser());

const PORT = 3000;

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

app.get("/pizzas",(req,res) => {
    res.send(pizzas)
})

app.get("/pizzas/:id", (req, res) => {
    res.send(pizzas.find((pizza)=>{
        return pizza.id === req.params.id
    }))
})

app.post("/pizzas", (req, res) => {
    pizzas = [...pizzas, req.body]
    res.send(pizzas)
})

app.put("/pizzas/:id", (req, res) => {
    let pizza = pizzas.find((pizza) => {
        return pizza.id === req.params.id
    })
    const index = (pizzas.indexOf(pizza))
    pizzas[index] = {...pizzas[index], ...req.body}
    res.send(pizzas[index])

})

app.delete("/pizzas/:id", (req, res) => {
    pizzas.filter(pizza => pizza.id !== req.params.id)
    res.send(pizzas)
})


const server = app.listen(PORT, function() {
    console.log(`Server started on port ${PORT}...`)
})