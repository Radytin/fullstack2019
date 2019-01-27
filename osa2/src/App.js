import React, { useState } from 'react'
import Person from './Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
 
 
    

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form>
        <div>
          nimi: <input />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      <div><tbody>
                {persons.map(person => <Person key={person.name} name={person.name}/>)}
            </tbody></div>
     
      
    </div>
  )

}

export default App