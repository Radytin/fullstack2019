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

const all = (props) =>{
    const {course} = props
}
const Course = (props) => {  console.log(props)  
    const { course } = props
     return (
        <div>
          <Header course={course} />
          <Part parts = {course.parts}/>
          <Consist parts = {course.parts}/>
          
        </div>
    )
}

export default Course