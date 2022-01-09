import { Button } from "./Button"
const TooManyMatches= ({countriesToShow, setcountriestoShow}) => {
    if (countriesToShow.length === 1) {
        const country = countriesToShow[0]
        //console.log(country.languages)
        return(
            <div>
                <h1> {country.name.common}</h1>
                <p>Capital {country.capital}</p>
                <p>Population {country.population}</p>
                <h2>Languages</h2>
                <ul > {Object.entries(country.languages).map(([key,value]) =>{
                    return(
                        <li key={key}>
                            {value}
                            </li>
                    )
                })}</ul>
                <img src={country.flags.png} alt={country.name.common} width='25%'/>
                <h2>Weather in {country.capital}</h2>
                <p>Temperature</p>
            </div>
        )
    }
    return (
      <div>
          {countriesToShow.length < 10
          ? countriesToShow.map(country => 
            <div key={country.name.common}>
              {country.name.common} <Button value={country.name.common} handleClick={(e)=> setcountriestoShow(e.target.value)}/>
            </div>) 
          : "Too many matches, specify another filter"}
      </div>
    )
          }

export {TooManyMatches}