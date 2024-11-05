import {openDatabase} from "../openDB";
import {Alert} from "react-native";

const db = openDatabase();

export function dropTableUsers() {
    db.transaction((tx) => {
        tx.executeSql(
            "DROP TABLE IF EXISTS users;"
        );
    });
    console.log('Таблица users удалена из БД')
}

export function createOrSyncTableUsers() {
    db.transaction((tx) => {
        tx.executeSql(
            "create table if not exists users (id integer primary key not null, login text UNIQUE, password text);"
        );
    });
}

export function SignInOrUp(login, password, navigation) {
    db.transaction((tx) => {
        tx.executeSql(
            "SELECT login, password FROM users WHERE login = ?",
            [login],
            (_, results) => {
                if (results.rows.length > 0) {
                    const user = results.rows.item(0);
                    if (user.password === password) {
                        navigation.navigate('Trips', {loggedInUser: login}); 
                    } else {
                        Alert.alert('Ошибка', 'Неправильный пароль, попробуйте снова');
                    }
                } else {
                    db.transaction((tx) => {
                        tx.executeSql(
                            "INSERT INTO users (login, password) VALUES (?, ?)",
                            [login, password],
                            (_, insertResults) => {
                                if (insertResults.rowsAffected > 0) {
                                    Alert.alert('Успешно!', 'Пользователь зарегистрирован');
                                    navigation.navigate('Trips', {loggedInUser: login}); 
                                } else {
                                    Alert.alert('Ошибка', 'Не удалось зарегистрироваться');
                                }
                            }
                        );
                    });
                }
            }
        );
    });
    logAllUsers()
}

export function logAllUsers() {
    db.transaction(
        (tx) => {
            tx.executeSql("select * from users", [], (_, {rows}) =>
                console.log('ТАБЛИЦА users\n\n',JSON.stringify(rows))
            );
        }
    )
}