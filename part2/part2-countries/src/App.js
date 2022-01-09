import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TooManyMatches } from './components/TooManyMatches'


const App =() => {
  const[filter, setFilter] = useState('')
  const[countries, setCountries] = useState([])
  

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
        setCountries(response.data)
    })
  },[])
   //console.log(countries)

   const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
   //console.log(countriesToShow)
  return (
      <div>
        find countries <input value={filter} onChange={e => setFilter(e.target.value)}/>
        <TooManyMatches countriesToShow={countriesToShow} setcountriestoShow={setFilter} /> 
      </div>
  )
}




export default App;
