import { useState, useEffect } from 'react';
import {
  OPEN_WEATHER_API_KEY,
  API_BASE_URL,
  WEATHER_API_KEY,
  API_BASE_URL_V2,
} from '../config/Config';
const useFetchWeatherData = cityLists => {
  // create state variables
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  //   const [url, setUrl] = useState(initialUrl);
  const [cities, setListCities] = useState(cityLists);

  const fetchWeatherInfo = async data => {
    let url = `${API_BASE_URL}data/2.5/weather?exclude{'minutely','hourly'}&lat=${data.lat}&lon=${data.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`;
    let url2 = `${API_BASE_URL_V2}/v1/forecast.json?key=${WEATHER_API_KEY}&q=${data.lat},${data.lon}&days=5&aqi=no&alerts=no`;
    try {
      let response = await fetch(url2);
      const result = await response.json();
      setIsLoading(false);
      return result;
    } catch (err) {
      setIsLoading(false);
      setError(error);
    }
  };
  useEffect(() => {
    if (!cities) return;
    //Loading state and reset old data
    setIsLoading(true);
    setData(null);
    setError(null);

    cities.map(async (d, i) => {
      let res = await fetchWeatherInfo(d);
      setData(prevState => ({
        ...prevState,
        [d.cityName]: res,
      }));
    });
  }, [cities]);

  return { data, error, isLoading, setListCities };
};

export default useFetchWeatherData;
