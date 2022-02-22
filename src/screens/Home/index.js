import React, { useState, useEffect, useCallback } from 'react';
import { Box, Skeleton, Divider, VStack, Center } from 'native-base';
import { cityCoords } from '../../utils/utils';
import Card from './components/card';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import { geolocationOptions } from '../../constants/geolocationOptions';
import useFetchWeatherData from '../../hooks/useFetchWeatherData';
import WeatherList from './components/WeatherList';
import { createTable } from '../../services/db-service';
import { openDatabase } from 'react-native-sqlite-storage';
import useWatchLocation from '../../hooks/useWatchLocation';
const SkeletonMode = () => {
  return (
    <Center w="100%">
      <VStack
        w="90%"
        h="100%"
        maxW="400"
        borderWidth="1"
        space={8}
        overflow="hidden"
        rounded="md"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}
      >
        <Skeleton h="40" />
        <Skeleton px="1" my="1" rounded="md" startColor="primary.200" />
        <Skeleton px="1" my="1" rounded="md" startColor="primary.200" />
        <Skeleton px="1" my="1" rounded="md" startColor="primary.200" />
        <Skeleton px="1" my="1" rounded="md" startColor="primary.200" />
        <Skeleton px="1" my="1" rounded="md" startColor="primary.200" />
        <Skeleton px="1" my="1" rounded="md" startColor="primary.200" />
        <Skeleton px="1" my="1" rounded="md" startColor="primary.200" />
      </VStack>
    </Center>
  );
};
const HomeScreen = ({ navigation }) => {
  const { location: currentLocation, error: currentError } =
  useCurrentLocation(geolocationOptions);
  const { data, error, isLoading, setListCities } = useFetchWeatherData();
  const [lists, setLists] = useState([]);
  let [flatListItems, setFlatListItems] = useState([]);

  var db = openDatabase({ name: 'weather.db' });

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT * FROM sqlite_master WHERE type='table' AND name='weatherData'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS weatherData', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS weatherData(id INTEGER PRIMARY KEY AUTOINCREMENT, weatherInfo TEXT  NOT NULL)',
              [],
            );
          }
        },
      );
    });
  }, []);

  useEffect(() => {
    if (currentLocation) {
      const updatedCityLists = listCities(currentLocation);
      //Refresh every one min
      setTimeout(() => {
        setListCities(updatedCityLists);
      }, 1000);
    }
  }, [currentLocation]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM weatherData', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        setFlatListItems(temp);
      });
    });
  }, []);

  const saveWeatherItems = useCallback(async data => {
    data = JSON.stringify(data);
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO weatherData (weatherInfo) VALUES (?)',
        [data],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.debug('Data Saved!');
          } else console.debug('Failed');
        },
      );
    });
  });

  useEffect(() => {
    if (flatListItems.length == 0) {
      data && Object.keys(data).length > 10 && saveWeatherItems(data);
    }
  }, [currentLocation]);
  if (flatListItems.length !== 0) {
    console.debug(flatListItems[0].weatherInfo);
  }
  const listContent = () => {
    if (error) return <h2>Error when fetching: {error}</h2>;
    if (!data) return <SkeletonMode />;
    if (!data) return null;
    return (
      data &&
      Object.keys(data).length > 10 && (
        <WeatherList weathers={data} navigation={navigation} />
      )
    );
  };

  const listCities = props => {
    const { latitude: lat, longitude: lon } = props;
    const addCurrentCity = {
      id: Math.floor(Math.random() * 100),
      cityName: 'Neeed Geolocator API',
      lat,
      lon,
    };
    return [addCurrentCity, ...cityCoords];
  };

  return (
    <Box p="0" pb="3">
      {data && Object.keys(data).length > 10 && (
        <Card props={data['Neeed Geolocator API']} />
      )}
      <Divider my="2" />
      {listContent()}
    </Box>
  );
};

export default HomeScreen;
