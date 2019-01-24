import React from 'react'

const Header = ({ course }) => (
    <h1>{course.name}</h1>
)


const Part = ({ part, exercises }) => (
    <p>{part} {exercises}</p>
)

const Consist = ({ parts }) => (
    parts.map(part => (
        <Part key={part.name} part={part.name} exercises={part.exercises} />
    ))
)
const Total = ({ parts }) => (
    <p>yhteensä {parts.map(part => part.exercises).reduce((p, n) => p + n)} tehtävää</p>
)

const Course = (props) => {  console.log(props)  
    const { course } = props
     return (
        <div>
          <Header course={course} />
          <Part parts = {course.parts}/>
          <Consist parts = {course.parts}/>
          <Total parts = {course.parts}/>
          
        </div>
    )
}

export default Course