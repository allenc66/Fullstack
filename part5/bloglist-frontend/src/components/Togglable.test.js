import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<Togglable />', () => {
    let component
  
    beforeEach(() => {
      component = render(
        <Togglable buttonLabel='view' cancelButtonLabel='hide'>
          <div className="testDiv" >
            togglable content
          </div>
        </Togglable>
      )
    })


})