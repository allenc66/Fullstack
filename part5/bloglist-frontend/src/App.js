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
  const [notificationText, setNotificationText] = useState("")
  const [notificationStyle, setNotificationStyle] = useState("notification")
  const [Toggle, setToggle] = useState(false)

  const BlogFormRef = useRef()

  useEffect(() => {
    const Data = async () => {
      const initialBlogs = await blogService.getAll()
      setBlogs( initialBlogs )
    }
    Data()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
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
      setNotificationStyle('notification')
      setNotificationText(`A new blog ${blogObject.title} by ${blogObject.author} is added`)
      setToggle(!Toggle)
      setTimeout(() => {
        setToggle(false)
      }, 5000)
      setBlogs('')
      console.log(blogObject)
      document.location.reload()
    } else {
      setNotificationStyle('Warning')
      setNotificationText('You must fill all fields to create a blog')
      setToggle(!Toggle)
      setTimeout(() => {
        setToggle(false)
      }, 5000)
  }
}

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
      const user =  await axios.post(`http://localhost:3002/api/login`, {username, password})

      /*const user = await loginService.login({
        username, 
        password
      })*/ //this is not working

      //console.log(user)
      
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user)) 
      blogService.setToken(user.data.token)
      //console.log(user.data.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationStyle('notification')
      setNotificationText(`User ${user.data.name} is logged in`)
      setToggle(!Toggle)
      setTimeout(() => {
        setToggle(false)
      }, 5000)

      //console.log(Notification)
    } catch (exception) {
      setNotificationStyle('Warning')
      setNotificationText('Wrong username or password')
      setToggle(!Toggle)
      setTimeout(() => {
        setToggle(false)
      }, 5000)
    }
  }
  //console.log(user)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    document.location.reload()
  }

  const blogForm = () => (
    <Togglable buttonLabel='New Blog' cancelButtonLabel="Cancel" ref={BlogFormRef}>
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
       <h2>Blog List</h2>
       
      {user && (
        <div>
          {user.data.name} is logged in
        <button onClick={handleLogout}>Logout</button>
      </div>
      )}  
       {Toggle && (
       <Notification text={notificationText} style={notificationStyle}/>
       )}
      <div>
        {user === null ? (loginForm())
        :(
          <>
            {blogForm()}
            <div>
            {blogs
              .sort((min, max) => min.likes - max.likes)
              .filter((blog) => blog.user.username === user.data.username)
              .map((blog) => (  
                <Blog
                  key={blog.id}
                  blog={blog}
                  blogUpdate={blogUpdate}
                  blogRemove={blogRemove}
                />),
         // console.log(blogs),
          //console.log(user.data.username) OMG , forget the data
        )}
          </div>
          </>
        )
        }
      </div>
      <p><strong>App created by CMY</strong></p>
    </div>
  )
}

export default App