import { useState, useEffect, useMemo, useRef } from "react";
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


const history = [
  {
    id: "1",
    course: "Mobile Programming",
    date: "2026-03-01",
    status: "Present",
  },
  { id: "2", course: "Database System", date: "2026-03-02", status: "Present" },
  { id: "3", course: "Operating System", date: "2026-03-03", status: "Absent" },
  {
    id: "4",
    course: "Computer Network",
    date: "2026-03-04",
    status: "Present",
  },
];

const HomeScreen = () => {
  const [historyData, setHistoryData] = useState(history);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState("Memuat jam...");
  const [note, setNote] = useState("");
  const noteinputRef = useRef(null);
  const AttendanceStats = useMemo(() => {

    console.log("Menghitung Statistik Kehadiran...");
    const presentCount = historyData.filter(item => item.status === "Present").length;
    const absentCount = historyData.filter(item => item.status === "Absent").length;
    return { totalpresent: presentCount, totalAbsent: absentCount };

  }, [historyData]);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("id-ID"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckin = () => {
    if (isCheckedIn) return Alert.alert("Perhatian", "Anda sudah melakukan Check in untuk kelas ini");
    if (note.trim() === "") {
      Alert.alert("Perhatian", "Harap Masukan Catatan");
      noteinputRef.current.focus();
      return;
    }
    setIsCheckedIn(true);
    Alert.alert("Berhasil", `Check in berhasil pada pukul ${currentTime}`);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Attendance App</Text>
          <Text style={styles.clockText}>{currentTime}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.icon}>
            <MaterialIcons name="person" size={40} color="#555" />
          </View>

          <View>
            <Text style={styles.name}>Khoirul Surya Danda</Text>
            <Text>NIM : 0920240009</Text>
            <Text>Class : TRPL 2B</Text>
          </View>
        </View>

        <View style={styles.classCard}>
          <Text style={styles.subtitle}>Today's Class</Text>

          <Text>Mobile Programming</Text>
          <Text>08:00 - 10:00</Text>
          <Text>Lab 3</Text>
          {!isCheckedIn && (
            <TextInput
              ref={noteinputRef}
              style={styles.inputCatatan}
              placeholder="Tambahkan Catatan (Opsional)"
              value={note}
              onChangeText={setNote}
            />
          )}
          <TouchableOpacity
            style={[styles.button, isCheckedIn ? styles.buttonDisabled : styles.buttonActive,]}
            onPress={handleCheckin}
            disabled={isCheckedIn}
          >
            <Text style={styles.buttonText}>
              {isCheckedIn ? "Checked In" : "Check In"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{AttendanceStats.totalpresent}</Text>
            <Text style={styles.statLabel}>Total Present</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: "red" }]}>{AttendanceStats.totalAbsent}</Text>
            <Text style={styles.statLabel}>Total Absent</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#eee",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  classCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  button: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
  },

  content: {
    paddingBottom: 40,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  course: {
    fontSize: 16,
  },

  date: {
    fontSize: 12,
    color: "gray",
  },

  present: {
    color: "green",
    fontWeight: "bold",
  },

  absent: {
    color: "red",
    fontWeight: "bold",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  clockText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    fontVariant: ["tabular-nums"],
  },

  buttonActive: {
    backgroundColor: "#007AFF",
  },

  buttonDisabled: {
    backgroundColor: "#A0C4FF",
  },
  inputCatatan: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 15,
    backgroundColor: '#fafafa',
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },

  statLabel: {
    fontSize: 14,
    color: 'gray',
  },
});

