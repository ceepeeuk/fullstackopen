import Country from "./Country";

const Countries = ({countries, handleSetSelectedCounty}) => {
    if (countries.length > 10) {
        return 'Too many matches, specify another filter.'
    } else if (countries.length === 1) {
        return '';
    } else if (countries.length === 0) {
      return '';
    } else {
        return countries.map((c, i) => <Country key={i} data={c} setSelectedCountry={handleSetSelectedCounty} />);
    }
}

export default Countries