import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = (props) => {
    const {resetValue: resetContent, ...content} = useField('content')
    const {resetValue: resetAuthor, ...author} = useField('author')
    const {resetValue: resetInfo, ...info} = useField('info')
    const navigate = useNavigate()
  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      navigate('/anecdotes')
    }

    const handleReset = () => {
      resetContent('')
      resetAuthor('')
      resetInfo('')
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            Content
            <input {...content} />
          </div>
          <div>
            Author
            <input {...author} />
          </div>
          <div>
            Url for more info
            <input {...info} />
          </div>
          <button type="submit">Create</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </form>
      </div>
    )
  
  }

  export default CreateNew