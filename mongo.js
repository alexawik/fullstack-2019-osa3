const mongoose = require('mongoose')
mongoose.set('useUnifiedTopology', true)

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url = 
  `mongodb+srv://alexawik:${password}@fullstack-rcrka.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true})

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: newName,
  number: newNumber
})

if (process.argv.length===5) {
  person.save().then(response => {
    console.log(`added ${newName} number ${newNumber} to phonebook`);
    mongoose.connection.close();
  })
}


if (process.argv.length===3) {
  console.log('Phonebook:')  
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}


