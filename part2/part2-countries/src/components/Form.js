const Form = (props) => {
    return(
    <div> 
        {props.filter?props.countries.filter((country) => 
        country.name.toLowerCase().includes(props.filter.toLowerCase())).map((country) => (
        <p key={country.id}>
            {country.name}
        </p>)) 
        : {}
        }
    </div>
    )
}

export { Form }