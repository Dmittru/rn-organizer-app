import { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Button,
    FlatList,
} from "react-native";
import { createOrSyncTableRoutes, addRoute, fetchRoutes, deleteRoute, dropTableRoutes } from '../entities/routes/action';
import { NavBar } from "../components/NavBar";

const RoutesPage = ({ route, navigation }) => {
    const { loggedInUser } = route.params;
    const [routes, setRoutes] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState("");
    const [difficult, setDifficult] = useState("");
    const [distance, setDistance] = useState("");

    const loadRoutes = () => {
        fetchRoutes(loggedInUser, setRoutes);
    };

    useEffect(() => {
        // dropTableRoutes();

        createOrSyncTableRoutes();
        loadRoutes();
    }, []);

    const handleAddRoute = () => {
        if (name && distance && difficult) {
            addRoute(name, distance, difficult, loggedInUser, () => {
                loadRoutes();
                setIsModalVisible(false);
                setName("");
                setDistance("");
                setDifficult("");
            });
        }
    };

    const handleDeleteRoutes = (id) => {
        deleteRoute(id, () => loadRoutes());
    };

    const renderItem = ({ item }) => (
        <View style={styles.tripItem}>
            <Text style={styles.tripText}>Путь: {item.name}</Text>
            <Text style={styles.tripText}>Расстояние (км): {item.distance}</Text>
            <Text style={styles.tripText}>Сложность: {item.difficult}</Text>
            <Button title="Удалить" onPress={() => handleDeleteRoutes(item.id)} />
        </View>
    );

    return (
        <View style={styles.container}>
            <NavBar navigation={navigation} loggedInUser={loggedInUser}/>
            <FlatList
                data={routes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setIsModalVisible(true)}
            >
                <Text style={styles.addButtonText}>Добавить маршрут</Text>
            </TouchableOpacity>
            <Modal visible={isModalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.tripText}>Добавить маршрут</Text>
                    <TextInput
                        placeholder="Название маршрута"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Расстояние маршрута (км)"
                        value={distance}
                        onChangeText={setDistance}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Сложность"
                        value={difficult}
                        onChangeText={setDifficult}
                        style={styles.input}
                    />
                    <Button title="Добавить путь" onPress={handleAddRoute} />
                    <Button title="Отмена" onPress={() => setIsModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#333333'
    },
    tripItem: {
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 1
    },
    tripText: {
        fontSize: 18,
        color: '#fff'
    },
    addButton: {
        backgroundColor: "#4682B4",
        padding: 15,
        alignItems: "center",
    },
    addButtonText: {
        color: "#fff",
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: '#363636'
    },
    input: {
        padding: 10,
        borderBottomWidth: 1,
        marginVertical: 10,
        color: '#fff'
    },
});

export default RoutesPage;
