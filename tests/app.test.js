const request = require("supertest");
const app = require("../app");

test("GET / should return text: Welcome to the pizza app", async () => {
  const response = await request(app).get("/");
  expect(response.status).toEqual(200);
  expect(response.body).toEqual("Welcome to the pizza app");
});

test("GET /pizzas should return pizzas", async () => {
  const response = await request(app).get("/pizzas");
  expect(response.status).toEqual(200);
  expect(Array.isArray(response.body)).toEqual(true);
  expect(response.body.length).toBeGreaterThan(0);
});

test("GET /pizzas/:id should return pizza", async () => {
  const ID = 1
  const response = await request(app).get(`/pizzas/${ID}`);
  expect(response.status).toEqual(200);
  expect(response.body).toHaveProperty("id");
  expect(response.body).toHaveProperty("name");
  expect(response.body).toHaveProperty("price");
});

test("POST /pizzas should return an array of all pizzas with the new pizza", async () => {
  const TEST_DATA = {id: "3", name: "pizza3", price: 23}
  const response = await request(app).post("/pizzas").send(TEST_DATA);
  expect(response.status).toEqual(200);
  expect(Array.isArray(response.body)).toEqual(true);
  expect(response.body.length).toBeGreaterThan(0);
  expect(response.body[response.body.length -1]).toMatchObject(TEST_DATA);
});

test("PUT /pizzas/:id should return the existing pizza with the updated info", async () => {
  const TEST_DATA = {name: "update pizza name", price: 99}
  const response = await request(app).put("/pizzas/1").send(TEST_DATA);
  expect(response.status).toEqual(200);
  expect(response.body).toHaveProperty("id");
  expect(response.body).toHaveProperty("name");
  expect(response.body).toHaveProperty("price");
  expect(response.body).toMatchObject(TEST_DATA);
});

test("DELETE /pizzas/:id should return an array of all remaining pizza except the one deleted", async () => {
  const response = await request(app).delete("/pizzas/1");
  expect(response.status).toEqual(200);
  expect(Array.isArray(response.body)).toEqual(true);
  for (var i = 0; i < response.body.length; i++){
    expect(response.body[i]).not.toHaveProperty("id","1");
  }
});


