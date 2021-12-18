import React from 'react';
import { Header } from "./Header"
import { Content } from "./Content"
import { Total } from './Total';
const Course = (props) => {
    const {course} = props
    console.log(course.name)
    console.log(course.parts)
    return(
        <div key={course.id}>
            <Header title={course.name}/>
            <Content parts={course.parts}/>
            <Total exercises={course.parts} />
        </div>
    )
}
export {Course}