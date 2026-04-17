import { useState } from "react";
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const initialHistory = [
  {
    id: "1",
    course: "Mobile Programming",
    date: "2026-03-01",
    status: "Present",
    room: "Lab 1",
    lecturer: "Pak Budi",
  },
  { id: "2", course: "Database System", date: "2026-03-02", status: "Present", room: "Lab 2", lecturer: "Pak Andi" },
  { id: "3", course: "Operating System", date: "2026-03-03", status: "Absent", room: "Lab 3", lecturer: "Pak Affan" },
  {
    id: "4",
    course: "Computer Network",
    date: "2026-03-04",
    status: "Present",
    room: "Lab 4",
    lecturer: "Pak Ego",
  },
];

export default function HistoryScreen({ navigation }) {
  const [historyData] = useState(initialHistory);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("Detail", { dataPresensi: item })}>
      <View style={{ flex: 1 }}>
        <Text style={styles.course}>{item.course}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={item.status === "Present" ? styles.present : styles.absent}>
        {item.status}
      </Text>
      <MaterialIcons name="chevron-right" size={24} color="#555" style={{ marginLeft: 10 }} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={historyData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  content: {
    padding: 20,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,

  },


  course: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  date: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
  },

  present: {
    color: "green",
    fontWeight: "bold",
  },

  absent: {
    color: "red",
    fontWeight: "bold",
  },


});


