import React from 'react';
import { Header } from "./Header"
import { Content } from "./Content"
import { Total } from './Total';
const Course = ({course}) => {
    console.log(course)
    return(
        <>
        {course.map((courses) => {
            return(
                <div key={courses.id}>
                <Header title={courses.name}/>
                <Content parts={courses.parts}/>
                <Total exercises={courses.parts} />
                </div>)
        }
        )
    }
    </>
    )
}

export {Course}