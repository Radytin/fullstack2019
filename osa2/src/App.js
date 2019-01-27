import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Personform from './components/Personform'
import Persons from './components/Persons'
import personsService from './services/personsService'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [condition, setFilterCondition] =useState('')


  useEffect(() => {
    personsService.getAll().then(initialPersons => {
        setPersons(initialPersons)
      })}, [])
  

  

   const addName = (event) => {
    event.preventDefault()
    if (persons.map((person) => person.name).includes(newName)) {
      alert(newName + ' on jo luettelossa')
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      personsService.create(nameObject).then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        }) 
    }
  }

  const removeName = (id, name) => {
    if (window.confirm('Poistetaanko ' + name)) {
      personsService.remove(id)

    setPersons(persons.filter(person => person.id !== id))
    }
  }

  


  
    console.log(persons)
    
  const handleFiltering = (event) => { 
    console.log(event.target.value) 
    setFilterCondition(event.target.value)  }
        

  const handleNumberChange = (event) => { 
    console.log(event.target.value) 
    setNewNumber(event.target.value)  }  
  

  const handleNameChange = (event) => { 
       console.log(event.target.value) 
       setNewName(event.target.value)  }


       
  


  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <div> 
        <Filter filterCondition={condition} handleFiltering={handleFiltering}/> 
      </div>
      <div>
        <Personform addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      </div>
      <h2>Numerot</h2>
       <div>
          <Persons persons={persons} filterCondition={condition} removeName ={removeName}/>
        </div>
     
      
    </div>
  )

}

export default App