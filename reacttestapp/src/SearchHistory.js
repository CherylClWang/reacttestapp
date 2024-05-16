import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search, Trash } from 'react-bootstrap-icons';

const SearchHistory = ({ data, getLocationWeatherbyCountry, removeFromHistory, isLightMode }) => {

    return (
        <div className={`historyContainer ${isLightMode ? 'lightIntensity2' : 'darkIntensity1'}`}>
            <h1 className={`font-s text-left ${isLightMode ? 'text-black' : 'text-white'}`}>Search History</h1>

            {data.map((item, index) => (
                <div key={index} className={`historyItemContainer ${isLightMode ? 'lightIntensity3' : 'darkIntensity3'}`}>
                    <div className={`text-left w-100 ${isLightMode ? 'text-black' : 'text-white'}`}>
                        {item.name}, {item.country}
                    </div>
                    <div className={`text-right w-100 ${isLightMode ? 'text-black' : 'text-white'}`}>{item.searchTime}</div>
                    <button className={`btn ${isLightMode ? 'historyBtn' : 'historyBtnDark'}`} onClick={() => getLocationWeatherbyCountry(item.name, item.country)}>
                        <Search className={` ${isLightMode ? 'text-grey' : 'text-white'}`} />
                    </button>
                    <button className={`btn ${isLightMode ? 'historyBtn' : 'historyBtnDark'}`} onClick={() => removeFromHistory(item)}>
                        <Trash className={` ${isLightMode ? 'text-grey' : 'text-white'}`} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SearchHistory;