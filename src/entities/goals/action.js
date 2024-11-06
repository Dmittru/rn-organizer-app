import {openDatabase} from "../openDB";

const db = openDatabase();

export function dropTableGoals() {
    db.transaction((tx) => {
        tx.executeSql(
            "DROP TABLE IF EXISTS goals;"
        );
    });
    console.log('Таблица goals удалена из БД')
}

export function createOrSyncTableGoals() {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS goals (id INTEGER PRIMARY KEY AUTOINCREMENT, item TEXT, done INT, user TEXT);"
        );

        tx.executeSql(
            "SELECT COUNT(*) as count FROM goals;",
            [],
            (_, { rows: { _array } }) => {
                if (_array[0].count === 0) {
                    tx.executeSql("INSERT INTO goals (item, done, user) VALUES (?, ?, ?);", ["Побывать в первом путешествии", 0, "U"]);
                    tx.executeSql("INSERT INTO goals (item, done, user) VALUES (?, ?, ?);", ["Побывать в 5 путешествиях", 0, "U"]);
                    tx.executeSql("INSERT INTO goals (item, done, user) VALUES (?, ?, ?);", ["Увидеть чудо света", 0, "U"]);
                    tx.executeSql("INSERT INTO goals (item, done, user) VALUES (?, ?, ?);", ["Взобраться на гору", 0, "U"]);
                    tx.executeSql("INSERT INTO goals (item, done, user) VALUES (?, ?, ?);", ["Побывать у океана", 0, "U"]);
                    tx.executeSql("INSERT INTO goals (item, done, user) VALUES (?, ?, ?);", ["Проехать 10000 километров", 0, "U"]);
                    tx.executeSql("INSERT INTO goals (item, done, user) VALUES (?, ?, ?);", ["Посетить 10 столиц", 0, "U"]);
                    tx.executeSql("INSERT INTO goals (item, done, user) VALUES (?, ?, ?);", ["Посетить 25 городов", 0, "U"]);
                    tx.executeSql("INSERT INTO goals (item, done, user) VALUES (?, ?, ?);", ["Посетить заграницу", 0, "U"]);
                    tx.executeSql("INSERT INTO goals (item, done, user) VALUES (?, ?, ?);", ["Снять видеоблог", 0, "U"]);
                }
            },
            (_, error) => {
                console.error("Error checking goal count:", error);
                return false;
            }
        );
    });
}

export function addGoal (item, user, onSuccess) {
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO goals (item, done, user) VALUES (?, ?, ?);",
            [item, 0, user],
            (_, { insertId }) => onSuccess(insertId)
        );
        logAllGoals()
    });
}

export function deleteGoal(id, onSuccess)  {
    db.transaction((tx) => {
        tx.executeSql("DELETE FROM goals WHERE id = ?;", [id], () => onSuccess());
        logAllGoals()
    });
}

export function fetchGoals(user, setGoals)  {
    db.transaction((tx) => {
        tx.executeSql("SELECT * FROM goals WHERE user = ?;", [user], (_, { rows }) => {
            setGoals(rows._array);
        });
    });
}

export function logAllGoals() {
    db.transaction(
        (tx) => {
            tx.executeSql("select * from goals", [], (_, {rows}) =>
                console.log('ТАБЛИЦА goals\n\n',JSON.stringify(rows))
            );
        }
    )
}

export function UndoneItem(selectedItemId) {
    db.transaction(
        (tx) => {
            tx.executeSql(`update goals set done = 0 where id = ?;`, [
                selectedItemId,
            ]);
        }
    );
    logAllGoals()
}

export function doneItem(selectedItemId) {
    db.transaction(
        (tx) => {
            tx.executeSql(`update goals set done = 1 where id = ?;`, [selectedItemId]);
        }
    );
    logAllGoals()
}