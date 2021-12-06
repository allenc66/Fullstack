import React, { useState } from 'react'

const Title = (props) => {
    return(
        
        <h1>{props.name}</h1>
    )
  }
  
  const Button = ({Click, text}) => {
      return(
      <button onClick={Click}>
          {text}
      </button>
      )
  }
  
  const Statisticline = (props) => {
    return(
        <div>
            <tr>
                <td>{props.name}</td>
                <td>{props.value}</td>
            </tr>
        </div>
    )
  }
  
  const Statistics = (props) => {
    const {good, neutral, bad} = props 
    const all = good + neutral + bad
  
    if (all === 0) {
      return (
        <div>
          No feedback given
        </div>
      )
    }
  
    return (
      <div>
        <table>
            <tbody>
            <Statisticline name = {'good'} value ={good} />
            <Statisticline name = {'neutral'} value ={neutral} />
            <Statisticline name = {'bad'} value ={bad} />
            <Statisticline name = {'all'} value ={all} />
            <Statisticline name = {'average'} value ={(good-bad)/all} />
            <Statisticline name = {'positive'} value ={String(good/all *100) + ' %'} />
            </tbody>
        </table>
      </div>
    )
    }
  
    
  
  
  const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0) 
  
    const goodClick = () => {
      setGood(good + 1)
      console.log (good + 1)
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
        <Button onClick= {goodClick} text='good' />
        <Button onClick= {neutralClick} text='neutral'  />
        <Button onClick= {badClick} text='bad'  /> 
        <Title name = {'statistics'} />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    )
  }
  export default App;