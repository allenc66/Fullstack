import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, prettyDOM, render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('display a blog', () => {
  const testBlog = { 
    "title": "React patterns",
    "author": "Michael Chan",
    "url": "https://123321.com",
    "likes": 999,
    "user": {
      username: "allen123",
      name: "Allen Cheningsky"
  }
}
  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(<Blog blog={testBlog} blogUpdate= {mockHandler} />)
  })

  /*test ('renders content', () => {
    
    component.debug()
    const test = component.container.querySelector('test')
    console.log(prettyDOM(test))
  })*/
  test ('render only title and author', () => {
      expect(component.container).toHaveTextContent(testBlog.title)
      expect(component.container).toHaveTextContent(testBlog.author)

      const contentHiddenByDefault = component.container.querySelector('.hiddenByDefault')
      expect(contentHiddenByDefault).toHaveStyle('display: none')
      expect(contentHiddenByDefault).not.toBeVisible()
     
      expect(contentHiddenByDefault).toHaveTextContent(testBlog.url)
      expect(contentHiddenByDefault).toHaveTextContent(testBlog.likes)
  })

  test ('view button click to show url and likes', () => {
    const button = component.container.querySelector("button")
    fireEvent.click(button)

    const contentHiddenByDefault = component.container.querySelector('.hiddenByDefault')

    expect(contentHiddenByDefault).not.toHaveStyle("display: none")
    expect(contentHiddenByDefault).toBeVisible()
    expect(contentHiddenByDefault).toHaveTextContent(testBlog.url)
    expect(contentHiddenByDefault).toHaveTextContent(testBlog.likes)

  })

  test ('If like button is clicked twice, the event handler is called twice.',() => {
    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})