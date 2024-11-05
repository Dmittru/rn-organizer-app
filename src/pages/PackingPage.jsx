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
import { createOrSyncTablePacking, addPacking, fetchPacking, deletePacking, dropTablePacking, doneItem, UndoneItem } from '../entities/packing/action';
import { NavBar } from "../components/NavBar";
import CheckBox from 'react-native-check-box'

const PackingPage = ({ route, navigation }) => {
  const { loggedInUser } = route.params;
  const [packings, setPackings] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pack, setPack] = useState("");

  useEffect(() => {
    // dropTablePacking();

    createOrSyncTablePacking();
    loadPacking();
  }, []);

  const loadPacking = () => {
    fetchPacking(loggedInUser, setPackings);
  };

  const handleAddPacking = () => {
    if (pack) {
      addPacking(pack, loggedInUser, () => {
        loadPacking()
        setIsModalVisible(false);
        setPack("");
      });
    }
  };

  const handleDeletePacking = (id) => {
    deletePacking(id, () => loadPacking());
  };

  const handleItemPress = (id, done) => {
    if(done == "1") {
        UndoneItem(id)
        loadPacking()
    } else {
        doneItem(id)
        loadPacking()
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.tripItem}>
      <Text style={styles.tripText}>Вещь: {item.item}</Text>
      <CheckBox
      style={{backgroundColor: 'gray'}}
        onClick={()=>handleItemPress(item.id, item.done)}
        isChecked={item.done == "1" ? true : false}
        leftText="Взято: "
      />
      <Button title="Удалить" onPress={() => handleDeletePacking(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
        <NavBar navigation={navigation} loggedInUser={loggedInUser}/>
      <FlatList
        data={packings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Добавить вещь</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
            <Text style={styles.tripText}>Добавить вещь</Text>
          <TextInput
            placeholder="Вещь"
            value={pack}
            onChangeText={setPack}
            style={styles.input}
          />
          <Button title="Добавить вещь" onPress={handleAddPacking} />
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

export default PackingPage;
