

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}



const app = express()
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'));
app.use(cors())
morgan.token('body',(request)=>JSON.stringify(request.body))



let persons = [
    {
      "name": "Arto Järvinen",
      "number": "040-123456",
      "id": 3
    },
    {
      "name": "Lea Kutvonen",
      "number": "040-123456",
      "id": 4
    },
    {
      "name": "Kissa",
      "number": "7897897",
      "id": 5
    }
  ]


app.get('/info', (request,response) => {
  response.send(`<p>Puhelinluettelossa ${persons.length} henkilön tiedot</p><p>${new Date()}</p>`)
})


app.get('/api/persons', (request, response) => {
    response.json(persons)
  });

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      if(person){
        response.json(person.toJSON())
      }else{
        response.status(404).end() 
      }
     
    }).catch(error => next(error))
  })
  

app.delete('/api/persons/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      }).catch(error => next(error))
  })


app.post('/api/persons', (request, response) => {
  const body = request.body
  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  note.save().then(savedPerson => savedPerson.toJSON())
  .then(savedAndFormattedPerson =>{
    response.json(savedAndFormattedPerson)
  })
  persons = persons.concat(person)
    response.json(person)

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if(error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  });