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
import { createOrSyncTablePlaces, addPlace, fetchPlaces, deletePlace, dropTablePlaces } from '../entities/places/action';
import { NavBar } from "../components/NavBar";

const PlacesPage = ({ route, navigation }) => {
  const { loggedInUser } = route.params;
  const [places, setPlaces] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [place, setPlace] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // dropTablePlaces();

    createOrSyncTablePlaces();
    loadPlaces();
  }, []);

  const loadPlaces = () => {
    fetchPlaces(loggedInUser, setPlaces);
  };

  const handleAddPlace = () => {
    if (place && location && description) {
      addPlace(place, location, description, loggedInUser, () => {
        loadPlaces();
        setIsModalVisible(false);
        setPlace("");
        setLocation("");
        setDescription("");
      });
    }
  };

  const handleDeletePlace = (id) => {
    deletePlace(id, () => loadPlaces());
  };

  const renderItem = ({ item }) => (
    <View style={styles.tripItem}>
      <Text style={styles.tripText}>Место: {item.place}</Text>
      <Text style={styles.tripText}>Локация: {item.location}</Text>
      <Text style={styles.tripText}>Описание: {item.description}</Text>
      <Button title="Удалить" onPress={() => handleDeletePlace(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
        <NavBar navigation={navigation} loggedInUser={loggedInUser}/>
      <FlatList
        data={places}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Добавить место</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
            <Text style={styles.tripText}>Добавить место</Text>
          <TextInput
            placeholder="Название места"
            value={place}
            onChangeText={setPlace}
            style={styles.input}
          />
          <TextInput
            placeholder="Название локации"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
          />
          <TextInput
            placeholder="Описание"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          <Button title="Добавить место" onPress={handleAddPlace} />
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

export default PlacesPage;
