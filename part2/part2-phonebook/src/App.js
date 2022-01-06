import React, { useState, useEffect } from 'react'
import { Contacts } from './component/Contacts'
import { Filter } from './component/Filter'
import { AddNewPerson } from './component/AddNewPerson'
import axios from 'axios'

const App = () => {
  const[persons, setPersons] = useState([]) // changed from useState('') to useState([])
  const[newName, setNewName] = useState('')
  const[newNumber, setNewNumber] = useState('')
  const[filter, setFilter] = useState('')
  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  },[])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = [
      {name: newName, number: newNumber, id: persons.length + 1}
    ]
    console.log(personObject)
    const isNamePresent = persons.find((element) => element.name === newName)
    const isNumberPresent = persons.find((element) => element.number === newNumber)
    if (isNamePresent){
      setNewName('') 
      console.log(newName)
      return alert(newName + ' is already added to phonebook')
    }
    // if statement has to follow the order of processing, otherwise it will not execute this step
    else if (isNumberPresent){
      setNewNumber('') 
      console.log(newNumber)
      return alert(newNumber + ' is already added to phonebook')
    }
    else{
    setPersons(persons.concat(personObject))
    console.log(persons)
    setNewName('')
    setNewNumber('')
    }
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value) // event.target.value is a term
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlefilter= (event) => {
    setFilter(event.target.value)
  }

  return (
  <div>
    <h2>Phonebook</h2>
      <Filter filter= {filter} handlefilter= {handlefilter}/>

    <h2>add a new contact</h2>
    
    <AddNewPerson 
      addName={addName}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
    />

    <h2>Numbers</h2>
        <Contacts filter={filter} persons={persons} />

  </div>
  )
  
}

export default App;
