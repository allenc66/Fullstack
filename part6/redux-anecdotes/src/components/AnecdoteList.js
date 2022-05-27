import React from "react"
import { connect } from "react-redux"
import { voteForAnecdotes } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"
import Filter from "./Filter"


const AnecdoteList = (props) => {

    const voteAnecdote = (anecdote) => {
        props.voteForAnecdotes(anecdote.id)
        props.showNotification(`You have voted for ${anecdote.content}`, 5)
    }

    const anecdotes = ({anecdote}) => {
        return(
            <div className="anecdote">
                <div>{anecdote.content}</div>
                <div>
                    Has <strong>{anecdote.votes}</strong>{" "}
                    {anecdote.votes === 1 ? "vote": "votes"}{" "}
                    <button onClick = {() => voteAnecdote(anecdote)}>vote</button>
                </div>
            </div>
        )
    }
       

    

    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter />
            {anecdotes.sort((min, max) => max.votes - min.votes)
            .map((anecdote) => (
                <anecdotes key={anecdote.id} anecdote={anecdote.content} />
            ))}
        </div>

    )
    
}

const mapStateToProps = (state) => {
    if (state.filter){
        return{
            anecdotes: state.anecdotes.filter((anecdote) =>
            anecdote.content.toLowerCase().includes(state.fileter.toLowerCase())
            )
        }
    }
    return {anecdotes: state.anecdotes}
}

const MapDispatchToProps = {voteForAnecdotes, showNotification}

const ConnectedAnecdotes = connect(
    mapStateToProps, 
    MapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdotes