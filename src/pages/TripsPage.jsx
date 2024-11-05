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
  Platform
} from "react-native";
import { createOrSyncTableTrips, addTrip, fetchTrips, deleteTrip, dropTableTrips } from '../entities/trip/action';
import DateTimePicker from "@react-native-community/datetimepicker";
import { NavBar } from "../components/NavBar";

const TripsPage = ({ route, navigation }) => {
  const { loggedInUser } = route.params;
  const [trips, setTrips] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // dropTableTrips();

    createOrSyncTableTrips();
    loadTrips();
  }, []);

  const loadTrips = () => {
    fetchTrips(loggedInUser, setTrips);
  };

  const handleAddTrip = () => {
    if (name && destination && date) {
      addTrip(name, destination, String(date), loggedInUser, () => {
        loadTrips();
        setIsModalVisible(false);
        setName("");
        setDestination("");
        setDate(new Date())
      });
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
};

  const handleDeleteTrip = (id) => {
    deleteTrip(id, () => loadTrips());
  };

  const renderItem = ({ item }) => (
    <View style={styles.tripItem}>
      <Text style={styles.tripText}>Название: {item.name}</Text>
      <Text style={styles.tripText}>Назначение: {item.destination}</Text>
      <Text style={styles.tripText}>Дата: {new Date(item.date).toLocaleString('ru-RU', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric'
                                })}</Text>
      <Button title="Удалить" onPress={() => handleDeleteTrip(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
        <NavBar navigation={navigation} loggedInUser={loggedInUser}/>
      <FlatList
        data={trips}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Добавить путешествие</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
            <Text style={styles.tripText}>Добавить путешествие</Text>
          <TextInput
            placeholder="Название путешествия"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Пункт назначения"
            value={destination}
            onChangeText={setDestination}
            style={styles.input}
          />
          <TouchableOpacity
                            onPress={() => setShowDatePicker((prevState) => !prevState)}
                        >
                            <Text style={styles.tripText}>Выбрать дату: </Text>
                            <Text style={styles.tripText}>
                                {date ? date.toLocaleString('ru-RU', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric'
                                }) : ''}
                            </Text>
                        </TouchableOpacity>
          {Platform.OS === "ios" && showDatePicker && (
                        <View style={{flex: 1}}>
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="spinner"
                                onChange={handleDateChange}
                                style={{flex: 1}}
                            />
                        </View>
                    )}
                    {Platform.OS === "android" && showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="spinner"
                            onChange={handleDateChange}
                            style={{flex: 1}}
                        />
                    )}
          <Button title="Добавить путешествие" onPress={handleAddTrip} />
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

export default TripsPage;
