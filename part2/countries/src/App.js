import {useState, useEffect} from "react";
import axios from "axios";
import Countries from "./components/Countries";
import CountryDetailed from "./components/CountryDetailed";

const App = () => {
  const [newFilter, setNewFilter] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(undefined);

  const handleFilterChange = (event) => {
    const input = event.target.value;
    setNewFilter(input);

    if (input === '') {
      setFilteredCountries([]);
      setSelectedCountry(undefined);
    } else {
        const filtered = allCountries.filter((c) => c.name.common.toLowerCase().startsWith(input.toLowerCase()));
        setFilteredCountries(filtered);
        if (filtered.length === 1) {
            setSelectedCountry(filtered[0])
        } else {
            setSelectedCountry(undefined);
        }
    }
  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
        .then(({data}) => setAllCountries(data));
  }, []);

  return (
    <div className="App">
      <div>
        filter: <input value={newFilter} onChange={handleFilterChange}/>
      </div>
      <div>
        <Countries countries={filteredCountries}
                   selectedCountry={selectedCountry}
                   handleSetSelectedCounty={setSelectedCountry}/>
      </div>
      <div>
         <CountryDetailed country={selectedCountry} />
      </div>
    </div>
  );
}

export default App;
