import "./App.css";
import Display from "./Components/Display/Display.jsx";
import Header from "./Components/Header/Header.jsx";
import InputLocation from "./Components/InputLocation/InputLocation.jsx";
import React from "react";
import Input from "./Components/Input/Input.jsx";

const be_URL = "https://weatherforecast-jet.vercel.app/";

function App() {
  const [weatherData, setWeatherData] = React.useState(null);
  const [locationQuery, setLocationQuery] = React.useState("Thu Duc");
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);
  const [userLocation, setUserLocation] = React.useState("");
  const [error, setError] = React.useState(null);

  const location = React.useRef();
  const email = React.useRef();

  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  const handleSearchLocation = () => {
    if (!location.current) return; // check if location is null
    const locationName = location.current.value;
    if (!locationName) return;
    setLocationQuery(locationName);
  };

  const handleCurrentLocation = () => {
    if (latitude === null || longitude === null) {
      console.log("Please allow access to your location");
      return;
    }

    setLocationQuery(`${latitude},${longitude}`);
  };

  const handleSubcribe = async () => {
    if (!email.current) return; // check if email is null
    const emailName = email.current.value;
    if (!emailName) return;
    if (latitude === null || longitude === null) {
      console.log("Please allow access to your location then reload the page");
      setUserLocation(`Ho Chi Minh`);
      return;
    }
    try {
      const emailValue = email.current.value;
      console.log(userLocation);
      const response = await fetch(`${be_URL}email/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to: emailValue, location: userLocation }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }
      console.log(userLocation);

      console.log("Subscribed successfully");
    } catch (error) {
      console.error("Failed to subscribe:", error);
      // Xử lý lỗi nếu cần
    }
  };

  React.useEffect(() => {
    // Cập nhật userLocation khi latitude hoặc longitude thay đổi
    if (latitude !== null && longitude !== null) {
      setUserLocation(`${latitude},${longitude}`);
    }
  }, [latitude, longitude]);

  React.useEffect(() => {
    /**
     * Fetches weather data from the WeatherAPI based on the provided location query and sets the weather data state.
     *
     * @return {Promise<void>} - A promise that resolves when the weather data is successfully fetched and set.
     * @throws {Error} - If the weather data fails to be fetched.
     */
    const fetchWeatherData = async () => {
      try {
        console.log(location);
        const url = `${be_URL}weather/today?location=${locationQuery}`;
        console.log(url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
  }, [locationQuery]);

  React.useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              setError("User denied the request for Geolocation.");
            } else {
              setError(error.message);
            }
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }, [latitude, longitude]);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className=" md:flex lg:flex xl:flex">
          <InputLocation
            locationRef={location}
            handleSearch={handleSearchLocation}
            handleCurrent={handleCurrentLocation}
          />
          <Display weatherData={weatherData} />
        </div>

        <div className="subcribe-field w-full p-6">
          <p className="w-full text-center font-bold text-lg">
            Subcribe to receive weather information every day
          </p>
          <Input ref={email} type={"email"} value={"nGqZs@example.com"} />
          <button
            onClick={handleSubcribe}
            className="w-full text-white bg-blue-500 my-3 h-10 border border-gray-300 hover:bg-blue-700 rounded-md"
          >
            Subcribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
