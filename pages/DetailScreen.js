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

export default function DetailScreen({ navigation, route }) {

  const { dataPresensi } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.course}>{dataPresensi.kodeMk}</Text>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Tanggal:</Text>
          <Text style={styles.value}>{dataPresensi.date}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={[styles.value, dataPresensi.status === "Present" ? styles.present : styles.absent]}>
            {dataPresensi.status}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Ruangan:</Text>
          <Text style={styles.value}>{dataPresensi.ruangan || "-"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Dosen Pengampu:</Text>
          <Text style={styles.value}>{dataPresensi.dosenPengampu || "-"}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  course: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#888",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  present: {
    color: "#2ecc71",
  },
  absent: {
    color: "#e74c3c",
  },
});

