import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

const tableName = 'weatherData';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'weather.db', location: 'default' });
};

export const createTable2 = async db => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
          value TEXT NOT NULL
      );`;

  await db.executeSql(query);
};

export const createTable = db => {
  db.transaction(function (txn) {
      txn.executeSql(
        "SELECT * FROM sqlite_master WHERE type='table' AND name='weatherData'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS weatherData', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS weatherData(id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT)',
              []
            );
          }
        }
      );
    });
};

export const getWeatherItems = async db => {
  try {
    const weatherItems = [];
    const results = await db.executeSql(
      `SELECT rowid as id,value FROM ${tableName}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        weatherItems.push(result.rows.item(index));
      }
    });
    return weatherItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todoItems !!!');
  }
};

export const saveWeatherItems = async (db, weatherItems) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    weatherItems.map(i => `(${i.id}, '${i.value}')`).join(',');

  return db.executeSql(insertQuery);
};
