const { v4: uuidv4 } = require("uuid");
const { request, response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>No</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((n) => n.id === id);
  person ? response.json(person) : response.status(404).end();
});

app.get("/info", (request, response) => {
  const peopleCount = persons.length;
  const currentTime = new Date();
  response.send(
    `Phonebook has info for ${peopleCount} people <br/>  ${currentTime}`
  );
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const person = request.body;
  person.id = uuidv4();
  persons = persons.concat(person);
  response.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
