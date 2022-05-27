
import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer, {setAnecdotes} from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

import anecdoteService from './service/anecdotes'


const store = configureStore({
    reducer:{
      anecdotes: anecdoteReducer,
      filter: filterReducer
    }
  })

  anecdoteService.getAll().then(anecdotes =>
      store.dispatch(setAnecdotes(anecdotes))
    )
    
  
  console.log(store.getState())

  export default store