import React from "react";

const Details = ({ weatherData }) => {
  return (
    <div className="show-details bg-blue-500 text-white p-6 rounded-md flex justify-between">
      <div className="details">
        {weatherData && (
          <div>
            <h2 className="font-bold text-xl pb-4">
              {weatherData.location.name} ({weatherData.location.country})
            </h2>
            <h6>Temperature: {weatherData.current.temp_c}°C</h6>
            <h6>Wind: {weatherData.current.wind_kph} km/h</h6>
            <h6>Humidity: {weatherData.current.humidity}%</h6>
          </div>
        )}
      </div>
      <div className="icon flex flex-col items-center">
        <img
          src={weatherData.current.condition.icon}
          alt="weather"
          className="max-w-[150px]"
        />
        <h4 className="capitalize">{weatherData.current.condition.text}</h4>
      </div>
    </div>
  );
};

export default Details;
