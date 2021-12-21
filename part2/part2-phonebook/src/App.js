import React, { useState } from 'react'
import { Names } from './component/names'

const App = () => {
  const[persons, setPersons] = useState([
    {name: 'Arto Hellas'}
  ])

  const[newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: persons.length + 1,
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value) 
  }
  return (
  <div>
    <h2>Phonebook</h2>
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>debug: {newName}</div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    <h2>Numbers</h2>
    <ul>
      {persons.map(person =>
        <Names key= {person.id} name={person.name} />
        )}
    </ul>

  </div>
  );
}

export default App;
