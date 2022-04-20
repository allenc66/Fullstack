import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> calls the event handle with right details',() => {
    const createBlogMockHandler = jest.fn()
    const component = render(<BlogForm createBlog={createBlogMockHandler} />)

    const title = component.container.querySelector('.title')
    const author = component.container.querySelector('.author')
    const url = component.container.querySelector('.url')
    const form = component.container.querySelector('form')

    fireEvent.change(title,{
        target:{value: 'test blog title'}
    })
    
    fireEvent.change(author,{
        target:{value: 'test blog author'}
    })

    fireEvent.change(url,{
        target:{value: 'test blog url'}
    })

    fireEvent.submit(form)

    expect(createBlogMockHandler.mock.calls).toHaveLength(1)
    expect(createBlogMockHandler.mock.calls[0][0].title).toBe('test blog title')
    expect(createBlogMockHandler.mock.calls[0][0].author).toBe('test blog author')
    expect(createBlogMockHandler.mock.calls[0][0].url).toBe('test blog url')
})