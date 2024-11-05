import {openDatabase} from "../openDB";
import {Alert} from "react-native";

const db = openDatabase();

export function dropTablePacking() {
    db.transaction((tx) => {
        tx.executeSql(
            "DROP TABLE IF EXISTS packing;"
        );
    });
    console.log('Таблица packing удалена из БД')
}

export function createOrSyncTablePacking() {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS packing (id INTEGER PRIMARY KEY AUTOINCREMENT, item TEXT, done INT, user TEXT);"
      );
    });
  };

export function addPacking (item, user, onSuccess) {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO packing (item, done, user) VALUES (?, ?, ?);",
        [item, 0, user],
        (_, { insertId }) => onSuccess(insertId)
      );
      logAllPacking()
    });
  };

export function deletePacking(id, onSuccess)  {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM packing WHERE id = ?;", [id], () => onSuccess());
      logAllPacking()
    });
  };

export function fetchPacking(user, setPacking)  {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM packing WHERE user = ?;", [user], (_, { rows }) => {
        setPacking(rows._array);
      });
    });
  };

export function logAllPacking() {
    db.transaction(
        (tx) => {
            tx.executeSql("select * from packing", [], (_, {rows}) =>
                console.log('ТАБЛИЦА packing\n\n',JSON.stringify(rows))
            );
        }
    )
}

export function UndoneItem(selectedItemId) {
    db.transaction(
        (tx) => {
            tx.executeSql(`update items set done = 0 where id = ?;`, [
                selectedItemId,
            ]);
        }
    );
    logAllPacking()
}

export function doneItem(selectedItemId) {
    db.transaction(
        (tx) => {
            tx.executeSql(`update items set done = 1 where id = ?;`, [selectedItemId]);
        }
    );
    logAllPacking()
}