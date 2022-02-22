import {
  OPEN_WEATHER_API_KEY,
  API_BASE_URL,
  WEATHER_API_KEY,
  API_BASE_URL_V2,
} from '../config/Config';
export const cityCoords = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    cityName: 'Toronto',
    lat: '43.653225',
    lon: '-79.383186',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    cityName: 'Ottawa',
    lat: '45.421532',
    lon: '-75.697189',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    cityName: 'Regina',
    lat: '50.445210',
    lon: '-104.618896',
  },
  {
    id: '68694a0f-3da1-431f-bd56-142371e29d72',
    cityName: 'Calagry',
    lat: '51.047310',
    lon: '-114.057968',
  },
  {
    id: '28694a0f-3da1-471f-bd96-142456e29d72',
    cityName: 'Edmonton',
    lat: '53.544388',
    lon: '-113.490929',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
    cityName: 'Saskatoon',
    lat: '52.150391',
    lon: '-106.8044931',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f631',
    cityName: 'Vancouver',
    lat: '49.2577143',
    lon: '-123.1939437',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d721',
    cityName: 'Winnipeg',
    lat: '49.8537377',
    lon: '-97.292308',
  },
  {
    id: '68694a0f-3da1-431f-bd56-142371e29d721',
    cityName: 'Montreal',
    lat: '45.5579564',
    lon: '-73.8703861',
  },
  {
    id: '28694a0f-3da1-471f-bd96-142456e29d721',
    cityName: 'Waterloo',
    lat: '43.4821971',
    lon: '-80.6167593',
  },
];

const initWeather = [
  { id: 0, current: { temp_c: 0, humidity: 0 }, location: { name: '' } },
  { id: 1, current: { temp_c: 0, humidity: 0 }, location: { name: '' } },
];
