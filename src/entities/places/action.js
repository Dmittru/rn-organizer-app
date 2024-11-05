import {openDatabase} from "../openDB";
import {Alert} from "react-native";

const db = openDatabase();

export function dropTablePlaces() {
    db.transaction((tx) => {
        tx.executeSql(
            "DROP TABLE IF EXISTS places;"
        );
    });
    console.log('Таблица places удалена из БД')
}

export function createOrSyncTablePlaces() {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY AUTOINCREMENT, place TEXT, location TEXT, description TEXT, user TEXT);"
      );
    });
  };

export function addPlace (place, location, description, user, onSuccess) {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO places (place, location, description, user) VALUES (?, ?, ?, ?);",
        [place, location, description, user],
        (_, { insertId }) => onSuccess(insertId)
      );
      logAllPlaces()
    });
  };

export function deletePlace(id, onSuccess)  {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM places WHERE id = ?;", [id], () => onSuccess());
      logAllPlaces()
    });
  };

export function fetchPlaces(user, setPlaces)  {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM places WHERE user = ?;", [user], (_, { rows }) => {
        setPlaces(rows._array);
      });
    });
  };

export function logAllPlaces() {
    db.transaction(
        (tx) => {
            tx.executeSql("select * from places", [], (_, {rows}) =>
                console.log('ТАБЛИЦА places\n\n',JSON.stringify(rows))
            );
        }
    )
}