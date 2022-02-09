const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js password')
  process.exit(1)
}

const password = process.argv[2]
//console.log(password)

const url = `mongodb+srv://fullstack:password@cluster0.qwll6.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)



const personSchema = new mongoose.Schema({
  name: {type: String,
        minLength: 3,
        required: true},

  number: {type: Number,
        required: true},
  })

const Person = mongoose.model('Person', personSchema)

const person = new Person({
      name: process.argv[3], number: process.argv[4]
  })
if (process.argv.length > 3) {
  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
})
}

else if (process.argv.length = 3) {
  console.log("phonebook:\n")
  Person.find({}).then(result => {
  result.forEach(person => {
    console.log(`${person.name} ${person.number}`)
  })
  mongoose.connection.close()
})
} 