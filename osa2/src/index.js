
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'



const Yhteensa = ({ parts }) => (
    <p>yhteensä {parts.map(part => part.exercises).reduce((p, n) => p + n)} tehtävää</p>
)

const courses = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10,
        id: 1
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7,
        id: 2
      },
      {
        name: 'Komponenttien tila',
        exercises: 14,
        id: 3
      }
    ]
  }


ReactDOM.render(
  <App courses ={courses}/>,
  document.getElementById('root')
)