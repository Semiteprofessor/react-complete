import React, { useState } from "react";

const useGeolocation = () => {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const getLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setIsLoading(false);
        },
        (error) => {
          setError(error.message);
          setIsLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  };

  return {
    lat,
    lng,
    isLoading,
    error,
    getLocation,
  };
};

const Geolocation = () => {
  const { lat, lng, isLoading, error, getLocation } = useGeolocation();
  const [countClicks, setCountClicks] = useState(0);

  const handleClick = () => {
    setCountClicks((countClicks) => countClicks + 1);
    getLocation();
  };
  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  );
};

export default Geolocation;
