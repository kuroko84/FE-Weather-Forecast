import "./App.css";
import React from "react";
import Input from "./Components/Input/Input.jsx";
import Header from "./Components/Header/Header.jsx";
import Display from "./Components/Display/Display.jsx";
import InputLocation from "./Components/InputLocation/InputLocation.jsx";
import ErrorNotification from "./Components/ErrorNotification/ErrorNotification.jsx";
import SuccessNotification from "./Components/SuccessNotification/SuccessNotification.jsx";

const be_URL = "https://weatherforecast-jet.vercel.app/";

function App() {
  const [weatherData, setWeatherData] = React.useState(null);
  const [locationQuery, setLocationQuery] = React.useState("Thu Duc");
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);
  const [userLocation, setUserLocation] = React.useState("");
  const [error, setError] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null);

  const location = React.useRef();
  const email = React.useRef();

  const closeErrorNotification = () => {
    //reset error state
    setError(null);
  };

  const closeSuccessNotification = () => {
    //reset success state
    setSuccessMessage(null);
  };

  const handleSearchLocation = () => {
    // check if location is null
    if (!location.current) {
      setError("Please enter a valid location");
      return;
    }
    // check if location is empty
    const locationName = location.current.value;
    if (!locationName) {
      setError("Please enter a valid location");
      return;
    }
    setLocationQuery(locationName);
  };

  const handleCurrentLocation = () => {
    // check if latitude and longitude are null
    if (latitude === null || longitude === null) {
      console.log("Please allow access to your location");
      return;
    }
    setLocationQuery(`${latitude},${longitude}`);
  };

  const handleSubcribe = async () => {
    if (!email.current) return; // check if email is null
    const emailName = email.current.value;
    if (!emailName) return; // check if email is empty
    if (latitude === null || longitude === null) {
      console.log("Please allow access to your location then reload the page");
      setError("Please allow access to your location then reload the page");
      //set default location if not allow access to your location
      setUserLocation(`Ho Chi Minh`);
      return;
    }
    try {
      const emailValue = email.current.value;
      //fetch data from backend
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
      console.log("Subscribed successfully");
      setSuccessMessage("Subscribed successfully");
    } catch (error) {
      console.error("Failed to subscribe:", error);
      // handle error
      setError(error.message);
    }
  };

  React.useEffect(() => {
    // update userLocation state when latitude and longitude change
    if (latitude !== null && longitude !== null) {
      setUserLocation(`${latitude},${longitude}`);
    }
  }, [latitude, longitude]);

  React.useEffect(() => {
    // fetch weather data
    const fetchWeatherData = async () => {
      try {
        const url = `${be_URL}weather/today?location=${locationQuery}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch weather data, enter another location");
      }
    };

    fetchWeatherData();
  }, [locationQuery]);

  // get user location
  React.useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        //use navigator geolocation
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            // Handle geolocation errors
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
  }, [latitude, longitude]);

  return (
    <div className="App">
      {error && (
        <ErrorNotification message={error} onClose={closeErrorNotification} />
      )}
      {successMessage && (
        <SuccessNotification
          message={successMessage}
          onClose={closeSuccessNotification}
        />
      )}
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
