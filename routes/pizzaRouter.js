const express = require("express");
var router = express.Router();

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

router.get("/", (req, res) => {
  res.json(pizzas);
});

router.get("/:id", (req, res, next) => {
  const pizzaGet = pizzas.find(pizza => {
    return pizza.id === req.params.id;
  });
  res.json(pizzaGet === undefined ? next() : pizzaGet);
});

router.post("/", (req, res) => {
  pizzas = [...pizzas, req.body];
  res.json(pizzas);
});

router.put("/:id", (req, res) => {
  let pizza = pizzas.find(pizza => {
    return pizza.id === req.params.id;
  });
  const index = pizzas.indexOf(pizza);
  pizzas[index] = { ...pizzas[index], ...req.body };
  res.json(pizza === undefined ? next() : pizzas[index]);
});

router.delete("/:id", (req, res) => {
  pizzas = pizzas.filter(pizza => pizza.id !== req.params.id);
  res.json(pizzas);
});

module.exports = router;
