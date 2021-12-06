import React, { useState } from 'react'
import { Button } from './components/Button'
import { Statistics } from './components/Statistics'
import { Title } from './components/Title'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0) 

  const goodClick = () => {
    setGood(good + 1)
  }

  const neutralClick = () => {
    setNeutral(neutral + 1)
  }
  
  const badClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Title name = {'give feedback'} />
      <Button Clicks={goodClick} text='good' />
      <Button Clicks={neutralClick} text='neutral'/>
      <Button Clicks={badClick} text='bad'/> 
      <Title name = {'statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


export default App;
