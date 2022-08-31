const Country = ({data, setSelectedCountry}) => {

    const clickHandler = () => {
        setSelectedCountry(data);
    }

    return <div >{data?.name?.common} <button onClick={clickHandler}>show</button></div>;
}

export default Country