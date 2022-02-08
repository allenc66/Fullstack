import React, { useState, useEffect } from 'react'
import { Contacts } from './component/Contacts'
import { Filter } from './component/Filter'
import { AddNewPerson } from './component/AddNewPerson'
import { Notification } from './component/Notification'
import axios from 'axios'
import phonebook from './service/phonebook'

const App = () => {
  const[persons, setPersons] = useState([]) // changed from useState('') to useState([])
  const[newName, setNewName] = useState('')
  const[newNumber, setNewNumber] = useState('')
  const[filter, setFilter] = useState('')
  const[notification, setNotification] = useState (null)
  useEffect(() => {
    //console.log('effect')
    phonebook.getAll().then((initialData)=> {
      //console.log('promise fulfilled')
      setPersons(initialData)
    })
  },[])
  //console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)
    const personObject = 
      {name: newName, number: newNumber, id: persons.length + 1} // it is an Object, not a list
    
    //console.log(personObject)

    const isNumberPresent = persons.find((element) => element.number === newNumber)
    const personToChange = persons.some((element) => element.name === newName)
    const oldPerson = persons.find((element) => element.name === newName)
    const newPerson = {...oldPerson, number: newNumber}
    
    if (!newName || !newNumber){
      setNewName('') 
      setNewNumber('')
      return alert(`Missing information, please input a name and a number`) 

    }
    else if (isNumberPresent && oldPerson){
      setNewName('') 
      setNewNumber('') 
      //console.log(newNumber)
      return alert(`${newName} ${newNumber} is already added to phonebook`)
    }

    else if (personToChange){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
      phonebook.update(oldPerson.id, newPerson).then((updatedPerson) => {
        setPersons(persons.map((person)=>
        person.id !== oldPerson.id ? person : updatedPerson
        ))
        setNotification(
          `Changed number for ${newName}`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        setNotification(
          `Information of ${newName} has already been removed from server`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      setNewName('') 
      setNewNumber('') 
      //console.log(newName)
    }}
    // if statement has to follow the order of processing, otherwise it will not execute this step
  
    else{
      phonebook.create(personObject).then((addedObject) => {
        setPersons(persons.concat(addedObject))
      })

      setNotification(
        `Added ${newName}`
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      
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
    phonebook.remove(id).then(() => {
      const newPersons = persons.filter((item) => item.id !== id)
      setPersons(newPersons)
    })
    
  }
    
    


  return (
  <div>
    <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter filter= {filter} handlefilter= {handlefilter}/>

    <h2>Add a new contact</h2>
    
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
