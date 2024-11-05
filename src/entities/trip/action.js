import {openDatabase} from "../openDB";
import {Alert} from "react-native";

const db = openDatabase();

export function dropTableTrips() {
    db.transaction((tx) => {
        tx.executeSql(
            "DROP TABLE IF EXISTS trips;"
        );
    });
    console.log('Таблица trips удалена из БД')
}

export function createOrSyncTableTrips() {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS trips (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, destination TEXT, date TEXT, user TEXT);"
      );
    });
  };

export function addTrip (name, destination, date, user, onSuccess) {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO trips (name, destination, date, user) VALUES (?, ?, ?, ?);",
        [name, destination, date, user],
        (_, { insertId }) => onSuccess(insertId)
      );
      logAllTrips()
    });
  };

export function deleteTrip(id, onSuccess)  {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM trips WHERE id = ?;", [id], () => onSuccess());
      logAllTrips()
    });
  };

export function fetchTrips(user, setTrips)  {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM trips WHERE user = ?;", [user], (_, { rows }) => {
        setTrips(rows._array);
      });
    });
  };

export function logAllTrips() {
    db.transaction(
        (tx) => {
            tx.executeSql("select * from trips", [], (_, {rows}) =>
                console.log('ТАБЛИЦА trips\n\n',JSON.stringify(rows))
            );
        }
    )
}