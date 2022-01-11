import React, { useState, useEffect } from 'react'
import { Contacts } from './component/Contacts'
import { Filter } from './component/Filter'
import { AddNewPerson } from './component/AddNewPerson'
import axios from 'axios'
import phonebook from './service/phonebook'

const App = () => {
  const[persons, setPersons] = useState([]) // changed from useState('') to useState([])
  const[newName, setNewName] = useState('')
  const[newNumber, setNewNumber] = useState('')
  const[filter, setFilter] = useState('')
  useEffect(() => {
    //console.log('effect')
    phonebook.getAll().then((initialData)=> {
      //console.log('promise fulfilled')
      setPersons(initialData)
    })
  },[])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)
    const personObject = 
      {name: newName, number: newNumber, id: persons.length + 1} // it is an Object, not a list
    
    console.log(personObject)

    const isNumberPresent = persons.find((element) => element.number === newNumber)
    const personToChange = persons.some((element) => element.name === newName)
    const oldPerson = persons.find((element) => element.name === newName)
    const newPerson = {...oldPerson, number: newNumber}
    

    if (isNumberPresent && oldPerson){
      setNewName('') 
      setNewNumber('') 
      //console.log(newNumber)
      return alert(`${newName} ${newNumber} is already added to phonebook`)
    }

    else if (personToChange){
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)&&
      phonebook.update(oldPerson.id, newPerson).then((updatedPerson) => {
        setPersons(persons.map((person)=>
        person.id !== oldPerson.id ? person : updatedPerson
        ))
      })
      setNewName('') 
      setNewNumber('') 
      //console.log(newName)
    }
    // if statement has to follow the order of processing, otherwise it will not execute this step
  
    else{
      phonebook.create(personObject).then((addedObject) => {
        setPersons(persons.concat(addedObject))
      })
    }
    //console.log(persons)
    setNewName('')
    setNewNumber('')
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

  const handleDelete = (id,name) => {
    //console.log(id,name)
    window.confirm(`Delete ${name}?`)  //for template string use ```` NOT ''''
    axios.delete(`http://localhost:3001/persons/${id}`)
    .then(() => {
      const newPersons = persons.filter((item) => item.id !== id)
      setPersons(newPersons)
    })
    
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
        <Contacts filter={filter} persons={persons} deletePerson={handleDelete} />

  </div>
  )
  
}

export default App;
