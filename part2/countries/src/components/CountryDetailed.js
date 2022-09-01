import {useEffect, useState} from "react";
import axios from "axios";

const CountryDetailed = ({country}) => {
    const [weather, setWeather] = useState(undefined);

    useEffect(() => {
        if (country !== undefined) {
            console.log(country.capital[0])
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
                .then(({data}) => {
                    setWeather(data);
                })
                .catch(e => console.error(e));
        }
    }, [country]);


    if (country === undefined) {
        return;
    }

    const weatherImage = weather
        ?`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
        : ``;

    return (
        <div>
            <h2>{country.name.common}</h2>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <h3>languages:</h3>
            <ul>
                {Object.values(country.languages).map((l, i) => <li key={i}>{l}</li>)}
            </ul>
            <img src={country?.flags?.png}/>

            <h2>Weather in {country.capital}</h2>
            <div>Temperature {weather?.main?.temp}c</div>
            <img src={weatherImage}/>
            <div>Wind {weather?.wind?.speed} m/s</div>
        </div>
    )
}

export default CountryDetailed;