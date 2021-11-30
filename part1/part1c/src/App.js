import React, { useState } from 'react'

const Button = ({onClick, text}) => (
<button onClick={onClick}>
      {text}
    </button>
)

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)

  const decreaseByOne = () => setCounter(counter - 1)
  
  const setToZero = () => setCounter(0)

  const Display = ({ counter }) => <div>{counter}</div>

  return (
    <div>
       <Display counter={counter}/>
       <Button
        onClick={increaseByOne}
        text='plus'
      />
      <Button
        onClick={setToZero}
        text='zero'
      />     
      <Button
        onClick={decreaseByOne}
        text='minus'
      /> 
    </div>
  )
}

export default App
