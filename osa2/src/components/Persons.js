import React from 'react'
import Person from './Person'

const Persons = ({persons, condition, removeName}) => {
    const personsToShow = persons.filter(person => !condition || (condition && person.name.toUpperCase().includes(condition.toUpperCase())))
  
    return (
      <div>
          {personsToShow.map(person =>
          <Person 
            key={person.id}
            person={person}
            removeName = {() => removeName(person.id, person.name)} 
          />)}
      </div>
    )
  }

export default Persons