import React from 'react';
import { Part } from './Part'

const Content = ({parts}) => {
    // you can also write const Content = (props) => {
        // const {parts} = props
    console.log(parts)
    return (
        <div>
            {parts.map(element => 
                <Part key= {element.id} name={element.name} exercises= {element.exercises} />
        )}
        </div>
        )
}
export {Content}