import React from "react";

const WeatherCard = ({ index, day }) => {
  const cssClass =
    "card rounded-md bg-gray-500 flex-none text-white p-3 w-full transition-transform duration-300 transform hover:scale-105";
  return (
    <li key={index} className={cssClass}>
      <h3>{day.date}</h3>
      <img
        src={day.day.condition.icon}
        alt="weather"
        className="max-w-[100px]"
      />
      <h6>Temp: {day.day.avgtemp_c}°C</h6>
      <h6>Wind: {day.day.maxwind_mph} M/S</h6>
      <h6>Humidity: {day.day.avghumidity}%</h6>
    </li>
  );
};

export default WeatherCard;
