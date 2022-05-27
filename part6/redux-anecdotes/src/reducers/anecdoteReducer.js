import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../service/anecdotes'

/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

/*const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}*/

const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = anecdoteService.getAll()
console.log (initialState)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    /*createAnecdote(state, action){
        state.push(action.payload)
    },*/
    vote(state, action) {
      const id = action.payload
      return state.map((anecdotes) => anecdotes.id !== id ? anecdotes : { ...anecdotes, votes: anecdotes.votes + 1})
    },
    setAnecdotes(state, action){
      const content = anecdoteService.getAll()
      return state.map({...content})
    },
    appendAnecdotes(state, action) {
      state.push(action.payload)
    }

    }
  })


/*
const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  

  switch (action.type){
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':{
      return state.map((anecdote) => anecdote.id !== action.data.id ? anecdote : { ...anecdote, votes: anecdote.votes + 1})
    }
    case 'INIT':
      return action.data
    default:
    return state
  }
  
  
}


/*
export const vote = (id) => {
  console.log('vote', id)
  return {
    type: 'VOTE',
    data: { ...initialState.i, 
      votes: initialState.votes + 1 }
  }
}

export const createAnecdote = (content) => {
  return{
    type: 'NEW_ANECDOTE',
    data:{
      content,
      id: getId(),
      votes: 0
    }
  }
}*/

export const { vote, setAnecdotes, appendAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdotes(newAnecdote))
  }
}

export const voteForAnecdotes = (id) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.voteAnecdote(id)
    dispatch(vote(votedAnecdote))
  }
}

export default anecdoteSlice.reducer