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
import { createOrSyncTableTips, addTip, fetchTips, deleteTip, dropTableTips } from '../entities/tips/action';
import { NavBar } from "../components/NavBar";

const TipsPage = ({ route, navigation }) => {
    const { loggedInUser } = route.params;
    const [tips, setTips] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tip, setTip] = useState("");
    const [description, setDescription] = useState("");

    const loadTips = () => {
        fetchTips(loggedInUser, setTips);
    };

    useEffect(() => {
        // dropTableTips();

        createOrSyncTableTips();
        loadTips();
    }, []);

    const handleAddTip = () => {
        if (tip && description) {
            addTip(tip, description, loggedInUser, () => {
                loadTips();
                setIsModalVisible(false);
                setTip("");
                setDescription("");
            });
        }
    };

    const handleDeleteTip = (id) => {
        deleteTip(id, () => loadTips());
    };

    const renderItem = ({ item }) => (
        <View style={styles.tripItem}>
            <Text style={styles.tripText}>Совет:</Text>
            <Text style={styles.tripTextTip}>{item.tip}</Text>
            <Text style={styles.tripText}>{item.description}</Text>
            {/*<Button title="Удалить" onPress={() => handleDeleteTips(item.id)} />*/}
        </View>
    );

    return (
        <View style={styles.container}>
            <NavBar navigation={navigation} loggedInUser={loggedInUser}/>
            <FlatList
                data={tips}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setIsModalVisible(true)}
            >
                <Text style={styles.addButtonText}>Добавить совет</Text>
            </TouchableOpacity>
            <Modal visible={isModalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.tripText}>Добавить совет</Text>
                    <TextInput
                        placeholder="Название"
                        value={tip}
                        onChangeText={setTip}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Описание"
                        value={description}
                        onChangeText={setDescription}
                        style={styles.input}
                    />
                    <Button title="Добавить совет" onPress={handleAddTip} />
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
    tripTextTip: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#fff',
        marginBottom: 8,
        marginTop: 8,
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

export default TipsPage;
