require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

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

app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

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
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end() 
      }
    })
      .catch(error => {      
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })  
    })
})

app.post('/api/persons', (request, response) => {

  const body = request.body

  if (! body.name || ! body.number) {
    return response.status(400).json({ error: 'Name or number is missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  const nameExists = persons.find(p => p.name === person.name)
  if (nameExists) {
    return response.status(409).json({ error: 'Name already exists in the phonebook' })
  }

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})