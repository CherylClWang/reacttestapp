import React from 'react';


const WeatherDisplay = ({ weatherdata, locationdata, isLightMode }) => {

    return (
        <div className="text-left">
            <h1 className={`font-s ${isLightMode ? 'text-black' : 'text-white'}`}>Today's Weather</h1>

            <img className="weatherImg" src={`http://openweathermap.org/img/w/${weatherdata.current.weather[0].icon}.png`} alt="" />
            <div className={` ${isLightMode ? 'text-purple' : 'text-white'} font-xxl`}>{weatherdata.current.temp}&deg;</div>
            <div className="weatherDetails">
                <div className={` ${isLightMode ? 'text-black' : 'text-white'}`}>{locationdata.name}, {locationdata.country}</div>
                <div className={`weatherItem ${isLightMode ? 'text-black' : 'text-white'}`}>{new Date(weatherdata.current.dt * 1000).toLocaleString()}</div>
                <div className={`weatherItem ${isLightMode ? 'text-black' : 'text-white'}`}>Humidity: {weatherdata.current.humidity}%</div>
                <div className={`${isLightMode ? 'text-black' : 'text-white'}`}>{weatherdata.current.weather[0].main}({weatherdata.current.weather[0].description})</div>
            </div>
        </div>
    );
};

export default WeatherDisplay;