require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const {Person} = require('./models/person')

morgan.token('person', req => {
  return JSON.stringify(req.body)
})

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-name] :response-time ms :person'))
app.use(cors())



app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info',(request, response) => {
  Person.countDocuments().exec((err, count) => {
    response.send(`<p>Phonebook has info for ${count} people</p>`  +  
    new Date)
  })
   
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => { 
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  //const id = Number(request.params.id)
 Person.findByIdAndRemove(request.params.id).then(result => {
      response.status(204).end()
 }).catch(error => next(error))
   
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if(body.name === undefined){
    return response.status(400).send({
      error: 'name is missing'
    })
  }
  else if(body.number === undefined){
    return response.status(400).send({
      error: 'number is missing'
    })
  }
  else{
    const person = new Person({
      name: body.name,
      number: body.number,
    })
  
    person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
    //console.log(person)
    response.json(savedAndFormattedPerson)
    })
    .catch (error => next(error))
  
}
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person, {new: true})
    .then(updatedPerson => {
    response.json(updatedPerson)
    })
  }
)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError'){
    return response.status(400).json({error: error.message})
  }

  next(error)
}
app.use(errorHandler)
