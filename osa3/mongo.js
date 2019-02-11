const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
'mongodb+srv://hamalkre:<PASSWORD>@fullstack19-zf2m7.mongodb.net/test?retryWrites=true'

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: 'Sirpa Sirpanen',
  number: 0909009090
})

person.save().then(response => {
  console.log('person saved!');
  mongoose.connection.close();
})