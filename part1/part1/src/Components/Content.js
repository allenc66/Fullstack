const Part = (props) => {
    return (
        <p> {props.part} {props.exercises} </p>
    )
}
export {Part}

const Content = (props) => {
    const parts = props.parts
    return (
        <div>
            {
                parts.map(element => (
                    <Part part = {element.name} exercises = {element.exercises} />
                ))
            }
        </div>
        
    )
}
export {Content}