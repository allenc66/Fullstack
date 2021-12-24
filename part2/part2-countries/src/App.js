import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FindCountries } from './components/findCountries'
import { Form } from './components/Form'


const App =() => {
  const[countries, setCountries] = useState([])
  const handleCountries= (event) => {
    console.log(event.target.value)
    setCountries(event.target.value)
  }
  axios
  .get('https://restcountries.com/v3.1/all')
  .then(response => {
    const notes = response.data
      console.log(notes)
    })

  return (
    <div>
        <FindCountries filter={countries} handlefilter= {handleCountries}/>
        <Form filter={countries} countries={notes}/>
    </div>
  )
}

export default App;
