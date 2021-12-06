import React, { useState } from 'react'
import { Button } from './components/Button'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ] // this is an array
   
  const [selected, setSelected] = useState(0)

  const anecdotesClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length)) // there are only 7 anecdotes, so 0 to 6, make sure it is integers
  }

  const [vote, setVote] = useState(Array(anecdotes.length).fill(0)) // create an array of anecdotes votes, start with 0 vote
  const [mostVote, setMostVote] = useState(0)
  const [mostVoteIndex, setMostVoteIndex] = useState(0)


  const voteClick = () => {
    const vote_copy = [ ...vote ]
    vote_copy[selected] += 1
    setVote(vote_copy)

    const topVote = [ ...vote_copy ] 
    setMostVote(Math.max(...topVote)) 
    setMostVoteIndex (topVote.indexOf (Math.max(...topVote)))

  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Button Clicks={voteClick} text='vote'/>
      <Button Clicks={anecdotesClick} text='next anecdote'/>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVoteIndex]}</p>
      <p>has {mostVote} votes</p>

    </div>
  )
}

export default App


