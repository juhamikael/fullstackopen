import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const Filter = ({ filter, setFilter }) => {
  return (
    <div className="flex justify-center my-10">
      <div className="w-1/3">
        <div className="flex flex-col">
          <span> Search country: </span>
          <input
            onChange={(event) => setFilter(event.target.value)}
            value={filter}
            placeholder="Filter by country name"
            className="rounded-md border-2 border-gray-300 p-2 w-full text-gray-600 text-xs"
          />
        </div>
      </div>
    </div>
  );
};

const CountryDetails = ({ country }) => {
  console.log(country);
  return (
    <div className="flex justify-center">
      <div className="w-1/3">
        <div className="p-8 border border-white/10 rounded-xl">
          <div className="flex justify-center">
            <img src={country["flags"]["png"]} alt="flag" />
          </div>
          <h2 className="text-4xl font-bold text-center my-2">
            {country["name"]["common"]}
          </h2>

          <div>
            <strong>Capital:</strong> {country["capital"]?.[0] || "N/A"}
          </div>
          <div>
            <strong>Region:</strong> {country["region"]}
          </div>
          <div>
            <strong>Population:</strong>{" "}
            {modifyPopulation(country["population"])}
          </div>
          <div>
            <strong>Languages:</strong>{" "}
            {
              country["languages"]
                ? Object.values(country["languages"]).map((language, index) => (
                    <span key={index}>
                      {language}
                      {index !== Object.values(country["languages"]).length - 1
                        ? ", "
                        : ""}
                    </span>
                  ))
                : "No language data available" 
            }
          </div>
          <div>
            <strong>Currencies:</strong>{" "}
            {
              country["currencies"]
                ? Object.values(country["currencies"]).map(
                    (currency, index) => (
                      <span key={index}>
                        {currency.name}{" "}
                        {index !==
                        Object.values(country["currencies"]).length - 1
                          ? ", "
                          : ""}
                      </span>
                    )
                  )
                : "No currency data available" 
            }
          </div>
        </div>
      </div>
    </div>
  );
};

const modifyPopulation = (population) => {
  if (population > 1000000000) {
    return `${(population / 1000000000).toFixed(3)} billion`;
  } else if (population > 1000000) {
    return `${(population / 1000000).toFixed(2)} million`;
  } else if (population > 1000) {
    return `${(population / 1000).toFixed(1)} thousand`;
  } else {
    return population;
  }
};

const App = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const getData = async () => {
    const response = await axios.get(
      "https://studies.cs.helsinki.fi/restcountries/api/all"
    );
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((country) =>
      country["name"]["common"].toLowerCase().startsWith(filter.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [data, filter]);

  if (!data || data.length === 0) {
    return <div> Loading... </div>;
  }

  console.log(data[0]["name"]["common"]);
  return (
    <div className="font-montserrat my-5 ">
      <Filter filter={filter} setFilter={setFilter} />
      <div className="flex flex-col">
        {filteredCountries.length > 30 ? (
          <div className="flex justify-center text-red-500 text-xl font-bold">
            Found too many countries, be more specific
          </div>
        ) : filteredCountries.length <= 3 ? (
          <>
            <div
              className={`flex justify-center text-2xl font-bold ${
                filteredCountries.length > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {filteredCountries.length > 0
                ? `Found ${filteredCountries.length} ${
                    filteredCountries.length > 1 ? "countries" : "country"
                  } `
                : "No countries found"}
            </div>

            <div className="flex flex-col space-y-10">
              {filteredCountries.map((country, i) => (
                <CountryDetails key={i} country={country} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center text-2xl font-bold text-green-500">
              Found {filteredCountries.length} countries{" "}
            </div>
            {filteredCountries.map((country) => (
              <div
                className="flex justify-center text-xl font-bold my-2"
                key={country["cca3"]}
              >
                {country["name"]["common"]}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
