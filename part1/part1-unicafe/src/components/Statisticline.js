const Statisticline = (props) => {
    return(
        <div>
            <tr>
                <td>{props.name}</td>
                <td>{props.value}</td>
            </tr>
        </div>
    )
}

export {Statisticline}