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
  
  return(
    <div className='blog-container'>
      <div className='blogTitle'>
        <strong>{blog.title}</strong> BY <strong>{blog.author}</strong>
      </div> 

      <Togglable buttonLabel='view' cancelButtonLabel='hide'>
        <p>{blog.url}</p>
        <p className='likeContainer'>
          {blog.likes}
        <button className='likeButton' onClick={likeHandler}>
          Like
          </button>
        </p>
        <p>{blog.user.name}</p>
        <button onClick={removeHandler}>Remove</button>
        
      </Togglable>
   </div>
  
)}

export default Blog