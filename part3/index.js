
const express = require('express')
const app = express()
const morgan = require('morgan')

morgan.token('person', req => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-name] :response-time ms :person'))


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

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info',(request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>` +
    new Date()
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)    
  console.log(id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
  
  //console.log(person)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  
  response.status(204).end()
})

const generateID = () => {
  const maxID = persons.length > 0
  ? Math.max(...persons.map(n => n.id)) : 0

  return maxID + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name){
    return response.status(400).json({
      error: 'name is missing'
    })
  }
  else if(!body.number){
    return response.status(400).json({
      error: 'number is missing'
    })
  }
  else{
    for(i=0; i<persons.length; i++){
      if(body.name === persons[i].name){
        return response.status(400).json({
          error: 'name must be unique'
        })
    }
  }
    const person = {
      id: generateID(),
      name: body.name,
      number: body.number,
    }
  
    persons = persons.concat(person)
    //console.log(person)
    response.json(person)
  
}

})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
