import React from 'react'
import { Header } from './Components/Header'
import { Content } from './Components/Content'
import { Total } from './Components/Total'

const App = () => {
  const course = { 
    name: 'Half Stack application development', 
    parts: [{name: 'Fundamentals of React', exercises: 10}, 
            {name: 'Using props to pass data', exercises: 7}, 
            {name: 'State of a component', exercises: 14}] 
  }
  
  return (
    <div>
      <Header course = {course.name} />
      <Content parts = {course.parts} />
      <Total exercises = {course.parts.map(x => x['exercises'])} />
    </div>
  )
}

export default App