const { request, response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());

const persons = [
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
