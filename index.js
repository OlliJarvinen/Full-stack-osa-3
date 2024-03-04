const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(morgan('tiny')) 
app.use(cors())


let persons = [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": "1"
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": "2"
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": "3"
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": "4"
      }
    ]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.get('/info', (request, response) => {
    const entries = persons.length
    const time = new Date().toString()
    console.log(time)
    console.log(entries)
    const text = `Phonebook has entries for ${entries} people<br>${time}`
    response.send(text)
  })
  
  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/persons/', (request, response) => {
    const body = request.body
    if (!body.name) {
      return response.status(400).json({
        error: 'missing name'
      })
    }
    if (!body.number) {
      return response.status(400).json({
        error: 'missing number'
      })
    }
    const exists = persons.some(person => person.name === body.name)
    if (exists) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }
    const id = Math.floor(Math.random() * 99999999) + 1;
    const newPerson = {
      name: body.name,
      number: body.number,
      id: id.toString()
    }
    persons = persons.concat(newPerson)
    response.json(newPerson)
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })