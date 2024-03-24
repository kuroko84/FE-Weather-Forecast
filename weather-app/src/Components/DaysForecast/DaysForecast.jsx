import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";

const DaysForecast = ({ weatherData }) => {
  const days = weatherData.forecast.forecastday;
  return (
    <div className="days-forecast">
      <h2 className="my-6 font-bold text-lg">4-Days Forecast</h2>
      <ul className="weather-cards gap-6 w-full grid sm:grid-cols-1 md:grid-cols-4 lg:w-grid-cols-4 xl:w-grid-cols-4">
        {days.map((day, index) => (
          <WeatherCard key={index} day={day} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default DaysForecast;
