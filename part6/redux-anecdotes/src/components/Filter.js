import React from "react"
//import { useDispatch } from "react-redux" //The useDispatch-hook provides any React component access to the dispatch-function of the redux-store defined in index.js. 
import { connect } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = (props) => {
    
    const handleChange = (event) => {
        props.filterChange(event.target.value)
    } 

    const style = {
        marginBottom: 10
      }

    return (
        <div style = {style}>
        Filter <input onChange={handleChange} />
      </div>
    )
  }
  
  
export default connect (null,{filterChange}) (Filter)