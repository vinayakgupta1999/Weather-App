import React, { useState, useEffect } from 'react';

// font-family: 'Jost', sans-serif;
// api.openweathermap.org/data/2.5/weather?q={city name}&units=metric&appid={d3132ed6e3b9895a2e9055e82ef7c7d2}
// api key : d3132ed6e3b9895a2e9055e82ef7c7d2


const Tempapp = () => {
    const [data, setDate] = useState([])
    const [Search, setSearch] = useState("Alwar");
    const[loading, setLoading] = useState(false);

    console.log("This is loading", loading)

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const fetchApi = async () => {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${Search}&units=metric&appid=d3132ed6e3b9895a2e9055e82ef7c7d2`;
                const response = await fetch(url);
                console.log("This is response", response);
                if(response.status === 200){
                    const resjson = await response.json();
                    console.log(resjson);
                    setDate(resjson.main);
                    setLoading(true);
                }else{
                    console.log("Their is something wrong");
                    setLoading(false);
                }
            };
            fetchApi();
          }, 1000)
      
          return () => clearTimeout(delayDebounceFn)
    }, [Search])

    return (
        <>
            <div className={data.temp > 20 ? "summer" : "winter"}>
            <div className="weather-data">
                <div className="inputData">
                    <input
                        type="Search"
                        value={Search}
                        className="inputFeild"
                        placeholder="Enter city name"
                        onChange={(event) => {
                            setSearch(event.target.value)
                        }} />

                </div>
                <div className="info">
                    <h2 className='location'>
                        <i className="fas fa-street-view"></i>
                        {Search}
                    </h2>
                    <h1 className='temp'> {loading && (Search !== null) ?`${data.temp}° cel`  : "loading"} </h1>
                    <h3 className="tempmin_max">Temperature : {loading ? (`MIN ${data.temp_min}° cel | MAX ${data.temp_max}° cel`) : "loading"}</h3>
                </div>
                </div>
            </div>
        </>
    )
}

export default Tempapp
