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
import { createOrSyncTableGoals, addGoal, fetchGoals, deleteGoal, dropTableGoals, doneItem, UndoneItem } from '../entities/goals/action';
import { NavBar } from "../components/NavBar";
import CheckBox from 'react-native-check-box'

const GoalsPage = ({ route, navigation }) => {
    const { loggedInUser } = route.params;
    const [goals, setGoals] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [goal, setGoal] = useState("");

    useEffect(() => {
        // dropTableGoals();

        createOrSyncTableGoals();
        loadGoals();
    }, []);

    const loadGoals = () => {
        fetchGoals(loggedInUser, setGoals);
    };

    const handleAddGoal = () => {
        if (goal) {
            addGoal(goal, loggedInUser, () => {
                loadGoals()
                setIsModalVisible(false);
                setGoal("");
            });
        }
    };

    // const handleDeleteGoal = (id) => {
    //     deleteGoal(id, () => loadGoals());
    // };

    const handleItemPress = (id, done) => {
        if(done == "1") {
            UndoneItem(id)
            loadGoals()
        } else {
            doneItem(id)
            loadGoals()
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.tripItem}>
            <Text style={styles.tripText}>Достижение</Text>
            <Text style={styles.tripTextXl}>{item.item}</Text>
            <CheckBox
                style={{backgroundColor: 'rgba(255, 255, 255, 0.75)'}}
                onClick={()=>handleItemPress(item.id, item.done)}
                isChecked={item.done == "1" ? true : false}
                leftText="Выполнено: "
            />
            {/*<Button title="Удалить" onPress={() => handleDeleteGoal(item.id)} />*/}
        </View>
    );

    return (
        <View style={styles.container}>
            <NavBar navigation={navigation} loggedInUser={loggedInUser}/>
            <FlatList
                data={goals}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setIsModalVisible(true)}
            >
                <Text style={styles.addButtonText}>Добавить достижение</Text>
            </TouchableOpacity>
            <Modal visible={isModalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.tripText}>Добавить достижение</Text>
                    <TextInput
                        placeholder="Достижение"
                        value={goal}
                        onChangeText={setGoal}
                        style={styles.input}
                    />
                    <Button title="Добавить достижение" onPress={handleAddGoal} />
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
    tripTextXl: {
        fontSize: 36,
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

export default GoalsPage;
