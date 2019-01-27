import React, { Component}  from 'react';



const Persons = ({persons, condition}) => {
    const personsToShow = persons.filter(person => !condition || (condition && person.name.toUpperCase().includes(condition.toUpperCase())))

     const rows = () => personsToShow.map(person => 
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      )

     return (
      <div>
        {rows()}
      </div>
    )
  }

 export default Persons 