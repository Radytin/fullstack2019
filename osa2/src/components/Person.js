import React from 'react'
const Person = ({person, removeName}) => {

    return (
        <p>
          {person.name} {person.number} <button onClick={removeName}>poista</button>
        </p>
    )
}

export default Person 