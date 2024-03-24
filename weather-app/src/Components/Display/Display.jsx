import React from "react";
import Details from "../Details/Details";
import DaysForecast from "../DaysForecast/DaysForecast";

/**
 * Renders the display based on the weather data provided.
 *
 * @param {Object} weatherData - The weather data to display.
 * @return {JSX.Element} The display component.
 */
const Display = ({ weatherData }) => {
  return (
    <div className="display flex-grow px-6 py-6">
      {weatherData && <Details weatherData={weatherData} />}
      {weatherData && <DaysForecast weatherData={weatherData} />}
      {!weatherData && <p>No weather data found</p>}
    </div>
  );
};

export default Display;
