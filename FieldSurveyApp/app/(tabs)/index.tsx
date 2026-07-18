import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        
        {/* Custom Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Smart Field Survey
          </Text>
        </View>

        {/* Welcome */}
        <Text style={styles.title}>
          Welcome
        </Text>

        <Text style={styles.subtitle}>
          Zeel Kundariya
        </Text>

        {/* Student Details */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Student Details
          </Text>

          <Text>Name: Zeel Kundariya</Text>

          <Text>
            Course: Bachelor of Engineering in Computer Science
          </Text>

          <Text>
            University: CodingGita X Swaminarayan University
          </Text>
        </View>

        {/* Today's Survey Count */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Today's Surveys
          </Text>

          <Text style={styles.count}>
            0
          </Text>

          <Text>
            Surveys completed
          </Text>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>
          Quick Actions
        </Text>

        <View style={styles.actions}>

          {/* New Survey */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/survey")}
          >
            <Text style={styles.actionText}>
              New Survey
            </Text>
          </TouchableOpacity>

          {/* Camera */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/camera")}
          >
            <Text style={styles.actionText}>
              Camera
            </Text>
          </TouchableOpacity>

          {/* Location */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/location")}
          >
            <Text style={styles.actionText}>
              Location
            </Text>
          </TouchableOpacity>

          {/* Contacts */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/contacts")}
          >
            <Text style={styles.actionText}>
              Contacts
            </Text>
          </TouchableOpacity>

        </View>

        {/* Recent Survey Summary */}
        <Text style={styles.sectionTitle}>
          Recent Survey
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            No Surveys Yet
          </Text>

          <Text>
            Your recent surveys will appear here.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  // Safe area for mobile notch/status bar
  safeArea: {
    flex: 1,
    backgroundColor: "#2563EB",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    backgroundColor: "#2563EB",
    padding: 20,
  },

  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginHorizontal: 20,
  },

  subtitle: {
    marginHorizontal: 20,
    marginTop: 5,
    color: "#555",
  },

  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    margin: 20,
    marginBottom: 0,
    borderRadius: 8,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  count: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2563EB",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 25,
  },

  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 15,
  },

  actionButton: {
    width: "45%",
    backgroundColor: "#2563EB",
    padding: 15,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
  },

  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
});