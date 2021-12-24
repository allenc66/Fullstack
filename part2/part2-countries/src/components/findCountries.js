const FindCountries = (props) => {
    return(
        <div>
        find countries <input value={props.filter} onChange={props.handlefilter}/>
        </div>
    )
}

export {FindCountries}