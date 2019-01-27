import React, { useState } from 'react'
import Person from './Person'


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  

  

  const addName = (event) => {
    event.preventDefault()
  
      if (persons.map((person) => person.name).includes(newName)) {
        alert(newName + ' on jo luettelossa')
      } else {
        const nameObject = {
          name: newName
        }
        setPersons(persons.concat(nameObject))
        setNewName('')
      }
    }
  
    console.log(persons)
  

  const handleNameChange = (event) => { 
       console.log(event.target.value) 
       setNewName(event.target.value)  }
  


  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addName}>
        <div>
          nimi: <input value={newName}
          onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
        <div>
          {persons.map(person => <Person key={person.id} name={person.name}/>)}
        </div>
     
      
    </div>
  )

}

export default App