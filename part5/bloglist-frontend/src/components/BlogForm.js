import { useState } from 'react'

const BlogForm = ({createBlog}) => {
    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogUrl, setNewBlogUrl] = useState('')

    const handleTitleChange = (event) => {
        setNewBlogTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setNewBlogAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setNewBlogUrl(event.target.value)
    }


    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogUrl
        })

        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
    }
    return (
        <div>
            <h2>Create a new blog</h2>

            <form onSubmit={addBlog}>
                <div>
                    Title:
                <input
                    id="title"
                    value={newBlogTitle}
                    onChange={handleTitleChange}
                    className='title'/>
                </div>

                <div>
                    Author:
                <input
                    id="author"
                    value={newBlogAuthor}
                    onChange={handleAuthorChange}
                    className='author'/>
                </div>

                <div>
                    Url:
                <input
                    id="url"
                    value={newBlogUrl}
                    onChange={handleUrlChange}
                    className='url'/>
                </div>
               
                <button type="submit">save</button>    
            </form>
        </div>
    )
}

export default BlogForm