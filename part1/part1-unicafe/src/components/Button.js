import { SetValue } from "./SetValue"

const Button = (props) => {
    return(
    <button onClick={SetValue(props.func, props.value + 1)}>
        {props.name}
    </button>
    )
  
}
export {Button}