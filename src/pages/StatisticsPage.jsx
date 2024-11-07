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
import { fetchTips } from '../entities/tips/action';
import { NavBar } from "../components/NavBar";
import {fetchGoals} from "../entities/goals/action";
import {fetchRoutes} from "../entities/routes/action";
import {fetchPacking} from "../entities/packing/action";
import {fetchPlaces} from "../entities/places/action";
import {fetchTrips} from "../entities/trip/action";

const StatisticsPage = ({ route, navigation }) => {
    const { loggedInUser } = route.params;
    const [tips, setTips] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [goals, setGoals] = useState([]);
    const [packing, setPacking] = useState([]);
    const [places, setPlaces] = useState([]);
    const [trips, setTrips] = useState([]);

    const loadStats = () => {
        fetchTips(loggedInUser, setTips);
        fetchGoals(loggedInUser, setGoals);
        fetchRoutes(loggedInUser, setRoutes);
        fetchPacking(loggedInUser, setPacking)
        fetchPlaces(loggedInUser, setPlaces)
        fetchTrips(loggedInUser, setTrips)
    };

    useEffect(() => {
        loadStats();
    }, []);

    return (
        <View style={styles.container}>
            <NavBar navigation={navigation} loggedInUser={loggedInUser}/>
            <View>
                <Text style={styles.tripText}>Статистика пользователя {loggedInUser}</Text>
                <Text style={styles.tripText}>Путешествий: {trips.length}</Text>
                <Text style={styles.tripText}>Места: {places.length}</Text>
                <Text style={styles.tripText}>Вещи: {packing.length}</Text>
                <Text style={styles.tripText}>Достижения: {goals.length}</Text>
                <Text style={styles.tripText}>Пути: {routes.length}</Text>
                <Text style={styles.tripText}>Советы: {tips.length}</Text>
            </View>
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
        fontSize: 24,
        color: '#fff',
        marginBottom: 8
    },
});

export default StatisticsPage;
