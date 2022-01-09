const Button = (props) => {
    return(
    <>
        <button value= {props.value} onClick={props.handleClick} >
            Show
        </button>
    </>
    )
}

export {Button}