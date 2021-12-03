import React, { useState } from "react";

const Button = ({ Click, text }) => (
  <button onClick={Click}>
    {text}
  </button>
)
const App = () => {
// save clicks of each button to its own state
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
  <h1>give feedback</h1>
    
    <Button Click={goodClick} text='good' />
  
    <Button Click={neutralClick} text='neutral' />
    
    <Button Click={badClick} text='bad' />
  <h1>statistics</h1>
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  </div>
  
)
}


export default App