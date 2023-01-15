import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from '../api';

const Search = ({onSearchChange}) => {
    
    const [search, setSearch] = useState(null);
    
    //It takes action when an option is selected, uses the data found in myLoadOptions
    const handleOnChange =(searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    //Get the information written in the input to look up the city
    const myloadOptions = async (myVarInputValue) => {
        try {
            const response = await fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${myVarInputValue}`, geoApiOptions);
            const response_1 = await response.json();
            return {
                options: response_1.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`
                    };
                })
            };
        } catch (err) {
            return console.error(err);
        }
    }

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={myloadOptions}
        />
        
    )
}

export default Search;