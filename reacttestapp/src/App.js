import React, { useEffect, useState, useRef } from 'react';
import { Search, Eraser,Moon, Sun } from 'react-bootstrap-icons';
import $ from 'jquery';
import './App.css';
import SearchHistory from './SearchHistory.js';
import WeatherDisplay from './WeatherDisplay.js';

function App() {
    const [userInput, setUserInput] = useState({ city: "", country: "" });
    const [search, setSearch] = useState({ city: "singapore", country: "" });
    const [locationData, setLocation] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [isFirstItem, setIsFirstItem] = useState(true);
    const [isLightMode, setIsLightMode] = useState(true);
    const [testrec, settestrec] = useState(true);
    const [history, setHistory] = useState([]);
    const cityInputRef = useRef(null);
    const countryInputRef = useRef(null);




    const loadData = () => {
        const API_KEY = '';  //INCLUDE API KEY
        const API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&limit=1&appid=${API_KEY}`;
        $.ajax({
            url: API_URL,
            type: 'GET',
            success: function (data) {
                setUserInput({ city: "", country: "" });
                setSearch({ city: "", country: "" });
                setLocation(data[0]);
            },
            error: function (xhr, status, error) {
                console.error('Error fetching location data:', error);
            }
        });
    };


    const getLocationWeather = (lat, lon) => {
        const API_KEY = '';  //INCLUDE API KEY
        const API_URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

        $.ajax({
            url: API_URL,
            type: 'GET',
            success: function (data) {
                setWeatherData(data);
            },
            error: function (xhr, status, error) {
                console.error('Error fetching weather data:', error);
            }
        });
    };

    const getLocationWeatherbyCountry = (newCity, newCountry) => {
        setUserInput({ city: "", country: "" });
        setSearch({ city: newCity, country: newCountry });
    }

    const removeFromHistory = (item) => {
        const afterRemoval = history.filter(x => x !== item);
        setHistory(afterRemoval);
    }

    useEffect(() => {
        if (locationData) {
            getLocationWeather(locationData.lat, locationData.lon) 
            if (!isFirstItem) {
                if (history.length > 0 && (history[history.length - 1].lat === locationData.lat &&
                    history[history.length - 1].lon === locationData.lon)) {
                    const updatedHistory = [...history];
                    updatedHistory[updatedHistory.length - 1].searchTime = new Date().toLocaleString()
                    setHistory(updatedHistory);

                }
                else {
                    const currentDatetime = new Date().toLocaleString()
                    locationData.searchTime = currentDatetime;
                    setHistory(prevHistory => [...prevHistory, locationData]);
                }
            }
            else {
                setIsFirstItem(false);
            }
        }
    }, [locationData])

    useEffect(() => {
        if (search.city !== "" || search.country !== "") {
            loadData();
        }
    }, [search])


    return (
        <div className={`App ${isLightMode ? 'lightModeBackground' : 'darkModeBackground'}`}>
            <button className="btn toggleLightBtn" onClick={() => setIsLightMode(!isLightMode)}>
                {isLightMode ?
                    <Moon className="text-white" />
                    : <Sun className="text-white" />
                }
            </button>
            <div className={`inputContainer ${isLightMode ? 'lightIntensity2' : 'darkIntensity3'}`}>
                <div className="inputWrapper col lightIntensity2" onClick={() => cityInputRef.current.focus()}>
                    <label className={`font-xxs text-left d-flex ${isLightMode ? 'text-black' : 'text-white'}`}>City: </label>
                    <input
                        className="inputTextBox lightIntensity1"
                        type="text"
                        ref={cityInputRef}
                        value={userInput.city}
                        onChange={(e) => setUserInput({ ...userInput, city: e.target.value })}
                    />
                </div>
                <div className="inputWrapper col lightIntensity2" onClick={() => countryInputRef.current.focus()}>
                    <label className={`font-xxs text-left d-flex ${isLightMode ? 'text-black' : 'text-white'}`}>Country: </label>
                    <input
                        className="inputTextBox lightIntensity1"
                        type="text"
                        ref={countryInputRef}
                        value={userInput.country}
                        onChange={(e) => setUserInput({ ...userInput, country: e.target.value })}
                    />
                </div>
                <button className={`${isLightMode ? 'searchBtn' : 'searchBtnDark'} btn`} onClick={() => setSearch(userInput)}><Search className="text-white" /> </button>
                <button className={`${isLightMode ? 'searchBtn' : 'searchBtnDark'} btn`} onClick={() => { setUserInput({ city: "", country: "" }) }}><Eraser className="text-white" /> </button>
            </div>

            <div className={`mainContainer ${isLightMode ? 'lightIntensity2' : 'darkIntensity1'}`}>
                {locationData && weatherData ?
                    <WeatherDisplay isLightMode={isLightMode} weatherdata={weatherData} locationdata={locationData} />
                    :
                    <div className="font-s text-purple">Invalid Search Entries.</div>
                }
                {history.length > 0 &&
                    <SearchHistory isLightMode={isLightMode} data={history} getLocationWeatherbyCountry={getLocationWeatherbyCountry} removeFromHistory={removeFromHistory} />
                }
            </div>
        </div>
    );
}

export default App;
