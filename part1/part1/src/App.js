import React from 'react'
import { Header } from './Components/Header'
import { Content } from './Components/Content'
import { Total } from './Components/Total'

const App = (props) => {
  const course = { 
    name: 'Half Stack application development', 
    parts: [{name = 'Fundamentals of React', exercises = 10}, 
            {name = 'Using props to pass data', exercises = 7}, 
            {name = 'State of a component', exercises = 14}] 
  }
  

  return (
    <div>
      <Header course = {props.course} />
      <Content parts = {props.parts} />
      <Total exercise = {props.parts.map(x => x['exercise'])} />
    </div>
  )
}

export default App