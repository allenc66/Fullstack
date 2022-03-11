import React from 'react'
import Togglable from './Togglable'

const Blog = ({blog, blogUpdate, blogRemove}) => {
  const likeHandler = () => {
    const updatedLikes = {...blog, likes: blog.likes + 1}
    blogUpdate(blog.id, updatedLikes)
  }
  const removeHandler = () => {
    window.confirm(`Delete ${blog.title} by ${blog.author}?`) &&
    blogRemove(blog.id)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return(
    <div style={blogStyle}>
      <div>
        {blog.title} BY {blog.author}
      </div> 

      <Togglable buttonLabel='view' cancelButtonLabel='hide'>
        <div>{blog.url}</div>
        <div>{blog.likes}
        <button onClick={likeHandler}>like</button>
        </div>
        <div>{blog.user.name}
        <button onClick={removeHandler}>Remove</button>
        </div>
      </Togglable>
   </div>
  
)}

export default Blog