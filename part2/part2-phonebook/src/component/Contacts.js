import React from 'react';
const Contacts = (props) => {
    return(
    <div> 
        {props.filter?props.persons.filter((person) => 
        person.name.toLowerCase().includes(props.filter.toLowerCase())).map((person) => (
        <p key={person.id}>
            {person.name} {person.number} 
        </p>)) 
        : props.persons.map((person) => (
        <p key={person.id}>
            {person.name} {person.number} 
        </p>))

        }
    </div>
    )
}

export { Contacts }