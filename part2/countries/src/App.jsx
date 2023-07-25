import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { getWeather } from "./services/weatherService";

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
  const [weatherData, setWeatherData] = useState(null);
  const [showWeather, setShowWeather] = useState(false);

  const showWeatherHandler = () => {
    getWeather(country["latlng"][0], country["latlng"][1])
      .then((data) => {
        setWeatherData(data);
        setShowWeather(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
            {country["languages"]
              ? Object.values(country["languages"]).map((language, index) => (
                  <span key={index}>
                    {language}
                    {index !== Object.values(country["languages"]).length - 1
                      ? ", "
                      : ""}
                  </span>
                ))
              : "No language data available"}
          </div>
          <div>
            <strong>Currencies:</strong>{" "}
            {country["currencies"]
              ? Object.values(country["currencies"]).map((currency, index) => (
                  <span key={index}>
                    {currency.name}{" "}
                    {index !== Object.values(country["currencies"]).length - 1
                      ? ", "
                      : ""}
                  </span>
                ))
              : "No currency data available"}
          </div>
          <hr className="my-10" />
          <div className="flex justify-center">
            {showWeather && weatherData ? (
              <div>
                <p className="font-bold text-lg">
                  Current weather in{" "}
                  {country["capital"]?.[0] ||
                    country["name"]["common"] ||
                    "N/A"}
                </p>
                <div className="flex items-center">
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData["current"]["weather"][0]["icon"]}@2x.png`}
                    alt="weather icon"
                  />
                  <p className="font-bold">
                    {weatherData["current"]["temp"].toFixed(1)} °C{" "}
                    <span className="text-sm">
                      {" "}
                      - {weatherData["current"]["weather"][0]["main"]}
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <button className="text-white" onClick={showWeatherHandler}>
                Show Weather
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CountryList = ({ countries, setSelectedCountry }) => {
  const showCountryDetails = (country) => {
    setSelectedCountry(country);
  };

  return (
    <>
      <div className="flex justify-center text-2xl font-bold text-green-500">
        Found {countries.length} countries
      </div>
      {countries.map((country) => (
        <div className="flex justify-center  my-2">
          <div className="w-1/3 flex justify-between items-center">
            <div className="font-bold text-xl" key={country["cca3"]}>
              {country["name"]["common"]}
            </div>
            <button
              onClick={() => showCountryDetails(country)}
              className="bg-white text-[#0f0f0f] px-2 py-1 w-32 rounded-md text-sm "
            >
              Show Details
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

const App = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

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

  const redOrGreenText = `flex justify-center text-2xl font-bold ${
    filteredCountries.length > 0 ? "text-green-500" : "text-red-500"
  }`;
  const countriesOrCountry = `Found ${filteredCountries.length} ${
    filteredCountries.length > 1 ? "countries" : "country"
  } `;
  console.log(selectedCountry);
  return (
    <div className="font-montserrat my-5 ">
      <Filter filter={filter} setFilter={setFilter} />
      <div className="flex flex-col">
        {filteredCountries.length > 10 ? (
          <div className="flex justify-center text-red-500 text-xl font-bold">
            Found too many countries, be more specific
          </div>
        ) : selectedCountry ? (
          <>
            <CountryDetails country={selectedCountry} />
            <div className="flex justify-center">
              <button
                className="text-sm mt-6 bg-white flex justify-center items-center rounded-md px-2 py-1 w-1/3 text-[#0f0f0f]  "
                onClick={() => setSelectedCountry(null)}
              >
                Back
              </button>
            </div>
          </>
        ) : filteredCountries.length <= 1 ? (
          <>
            <div className={redOrGreenText}>
              {filteredCountries.length > 0
                ? countriesOrCountry
                : "No countries found"}
            </div>

            <div className="flex flex-col space-y-10">
              {filteredCountries.map((country, i) => (
                <>
                  <CountryDetails key={i} country={country} />
                </>
              ))}
            </div>
          </>
        ) : (
          <>
            <CountryList
              countries={filteredCountries}
              setSelectedCountry={setSelectedCountry}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
