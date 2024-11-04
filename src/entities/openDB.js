import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";

export function openDatabase() {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => {
                        console.log("Mock executeSql on web");
                    },
                };
            },
        };
    }

    const db = SQLite.openDatabase("db.db");
    return db;
}
