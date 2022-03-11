import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import axios from 'axios'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [Notification, setNotification] = useState("")
  const [Toggle, setToggle] = useState(false)


  useEffect(() => {
    const Data = async () => {
      const initialBlogs = await blogService.getAll()
      setBlogs( initialBlogs )
    }
    Data()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    BlogFormRef.current.toggleVisibility()
    if (blogObject.title !== '' && blogObject.author !== '' && blogObject.url !== '') {
      const newBlog =  await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setNotification(`A new blog ${blogObject.title} by ${blogObject.author} is added`)
      setToggle(!Toggle)
      setTimeout(() => {
        setToggle(false)
      }, 5000)
    } else {
      setNotification('You must fill all fields to create a blog')
      setToggle(!Toggle)
      setTimeout(() => {
        setToggle(false)
      }, 5000)
  }
}

  const BlogFormRef = useRef()

  const blogUpdate = async (blogId, blogObject) => {
    await blogService.update(blogId, blogObject)
    const updatedBlog = {...blogObject, blogId}

    setBlogs(blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)))
  }

  const blogRemove = async (blogId) => {
    await blogService.remove(blogId)

    setBlogs(blogs.filter((blog) => blog.id !== blogId))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user =  await axios.post(`http://localhost:3001/api/login`, {username, password})

      /*const user = await loginService.login({
        username, 
        password
      })*/ //this is not working

      console.log(user)
      console.log(user.data.name)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user)) 
      blogService.setToken(user.data.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(`User ${user.data.name} is logged in`)
    } catch (exception) {
      setNotification('Wrong username or password')
      setToggle(!Toggle)
      setTimeout(() => {
        setToggle(false)
      }, 5000)
    }
  }
  //console.log(user)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    document.location.reload()
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' cancelButtonLabel="Cancel" ref={BlogFormRef}>
      <BlogForm createBlog={addBlog} />  
    </Togglable>
  )

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : ''}
    const showWhenVisible = { display: loginVisible ? '' : 'none'}

    return(
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>  
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({target}) => setUsername(target.value)}
            handlePasswordChange={({target}) => setPassword(target.value)}
            handleSubmit={handleLogin}/>
        </div>
      </div>
      
    )
  }

  return (
    <div>
       <h2>Blog11</h2>
      {user && (
        <div>
          {user.data.name} is logged in
        <button onClick={handleLogout}>Logout</button>
      </div>
      )}  
       
      <div>
        {user === null ? loginForm()
        :(
          <>
          {blogForm()}
          <div>
          {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          blogUpdate={blogUpdate}
          blogRemove={blogRemove}/>
        )}
          </div>
          </>
        )
        }
      </div>
    </div>
  )
}

export default App