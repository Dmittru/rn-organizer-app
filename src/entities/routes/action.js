import {openDatabase} from "../openDB";
import {Alert} from "react-native";

const db = openDatabase();

export function dropTableRoutes() {
    db.transaction((tx) => {
        tx.executeSql(
            "DROP TABLE IF EXISTS routes;"
        );
    });
    console.log('Таблица routes удалена из БД')
}

export function createOrSyncTableRoutes() {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS routes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, distance TEXT, difficult TEXT, user TEXT);"
        );

        tx.executeSql(
            "SELECT COUNT(*) as count FROM routes;",
            [],
            (_, { rows: { _array } }) => {
                if (_array[0].count === 0) {
                    tx.executeSql("INSERT INTO routes (name, distance, difficult, user) VALUES (?, ?, ?, ?);", ["Килиманджаро, Вершина", 10, 'Сложно', "U"]);
                    tx.executeSql("INSERT INTO routes (name, distance, difficult, user) VALUES (?, ?, ?, ?);", ["Рио-де-Жанейро, Гид", 2000, 'Легко', "U"]);
                    tx.executeSql("INSERT INTO routes (name, distance, difficult, user) VALUES (?, ?, ?, ?);", ["Йеллоу-стоун Парк", 8000, 'Средне', "U"]);
                    tx.executeSql("INSERT INTO routes (name, distance, difficult, user) VALUES (?, ?, ?, ?);", ["Кранберри-Большой Барьерный риф", 863, 'Средне', "U"]);
                    tx.executeSql("INSERT INTO routes (name, distance, difficult, user) VALUES (?, ?, ?, ?);", ["Эльбрус, Вершина", 1254, 'Очень сложно', "U"]);
                }
            },
            (_, error) => {
                console.error("Error checking routes count:", error);
                return false;
            }
        );
    });
}

export function addRoute (name, distance, difficult, user, onSuccess) {
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO routes (name, distance, difficult, user) VALUES (?, ?, ?, ?);",
            [name, distance, difficult, user],
            (_, { insertId }) => onSuccess(insertId)
        );
        logAllRoutes()
    });
};

export function deleteRoute(id, onSuccess)  {
    db.transaction((tx) => {
        tx.executeSql("DELETE FROM routes WHERE id = ?;", [id], () => onSuccess());
        logAllRoutes()
    });
};

export function fetchRoutes(user, setRoutes)  {
    db.transaction((tx) => {
        tx.executeSql("SELECT * FROM routes WHERE user = ?;", [user], (_, { rows }) => {
            setRoutes(rows._array);
            console.log(rows, 'routes');
        });
    });
};

export function logAllRoutes() {
    db.transaction(
        (tx) => {
            tx.executeSql("select * from routes", [], (_, {rows}) =>
                console.log('ТАБЛИЦА routes\n\n',JSON.stringify(rows))
            );
        }
    )
}