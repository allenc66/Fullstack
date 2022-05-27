import React from "react"
import { connect } from "react-redux"
import { createAnecdote }  from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {

    const addAnecdote = async(event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        //const newAnecdote = await anecdotesService.createNew(content)
        props.createAnecdote(content)
        props.showNotification(`New anecdote was added: ${content}`, 5)
      }

    return (
        <>
        <strong>Create new</strong>
        <form onSubmit={addAnecdote}>
            <input name="anecdote" />
            <button type="submit">add</button>
        </form>
        </>
        
    )
}

const MapDispatchToProps = {createAnecdote, showNotification}

export default connect (null, MapDispatchToProps)(AnecdoteForm)