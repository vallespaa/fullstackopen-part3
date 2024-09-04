const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.use(morgan('tiny'));

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const info = () => {
  const currentDateTime = new Date(); 
  return `
    <div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${currentDateTime}</p>
    </div>
  `;
};

app.get('/info', (request, response) => {
  response.send(info())
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.send(404).end()
  }
})

app.post('/api/persons', (request, response) => {

  const person = request.body

  if (! person.name || ! person.number) {
    return response.status(400).json({ error: 'Name or number is missing' })

  }

  const nameExists = persons.find(p => p.name === person.name)
  if (nameExists) {
    return response.status(409).json({ error: 'Name already exists in the phonebook' })
  }

  person.id = Math.floor(Math.random() * 100000)
  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})