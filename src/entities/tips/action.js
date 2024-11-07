import {openDatabase} from "../openDB";

const db = openDatabase();

export function dropTableTips() {
    db.transaction((tx) => {
        tx.executeSql(
            "DROP TABLE IF EXISTS tips;"
        );
    });
    console.log('Таблица tips удалена из БД')
}

export function createOrSyncTableTips() {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS tips (id INTEGER PRIMARY KEY AUTOINCREMENT, tip TEXT, description TEXT, user TEXT);"
        );

        tx.executeSql(
            "SELECT COUNT(*) as count FROM tips;",
            [],
            (_, { rows: { _array } }) => {
                if (_array[0].count === 0) {
                    tx.executeSql("INSERT INTO tips (tip, description, user) VALUES (?, ?, ?);", ["Рассчитывайте маршрут заранее", "чтобы не было проблем с навигацией в пути, используйте онлайн карты или сервисы по рассчитыванию готовых маршрутов", "U"]);
                    tx.executeSql("INSERT INTO tips (tip, description, user) VALUES (?, ?, ?);", ["Приготовьте снаряжение", "Возьмите с собой палатку, продукты пропитания и остальные принадлежности для выживания в диких местностях, если вы устраиваете поход вне населенных пунктах", "U"]);
                    tx.executeSql("INSERT INTO tips (tip, description, user) VALUES (?, ?, ?);", ["Будьте на связи", "Используйте спутниковый телефон или держитесь мест около вышек связи для экстренной помощи", "U"]);
                    tx.executeSql("INSERT INTO tips (tip, description, user) VALUES (?, ?, ?);", ["Заграница", "При выезде из страны приготовьте все документы, в страну прибывания и разменную валюту", "U"]);
                    tx.executeSql("INSERT INTO tips (tip, description, user) VALUES (?, ?, ?);", ["Людные места", "Будьте аккуратны вне туристических центров, потому что в незнакомой обстановке вы можете попасть в беду", "U"]);
                }
            },
            (_, error) => {
                console.error("Error checking tips count:", error);
                return false;
            }
        );
    });
}

export function addTip (tip, description, user, onSuccess) {
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO tips (tip, description, user) VALUES (?, ?, ?);",
            [tip, description, user],
            (_, { insertId }) => onSuccess(insertId)
        );
        logAllTips()
    });
};

export function deleteTip(id, onSuccess)  {
    db.transaction((tx) => {
        tx.executeSql("DELETE FROM tips WHERE id = ?;", [id], () => onSuccess());
        logAllTips()
    });
};

export function fetchTips(user, setTips)  {
    db.transaction((tx) => {
        tx.executeSql("SELECT * FROM tips WHERE user = ?;", [user], (_, { rows }) => {
            setTips(rows._array);
            console.log(rows, 'tips');
        });
    });
};

export function logAllTips() {
    db.transaction(
        (tx) => {
            tx.executeSql("select * from tips", [], (_, {rows}) =>
                console.log('ТАБЛИЦА tips\n\n',JSON.stringify(rows))
            );
        }
    )
}