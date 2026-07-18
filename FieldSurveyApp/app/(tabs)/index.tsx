import { View, Text, StyleSheet, ScrollView,  TouchableOpacity,} from "react-native";

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}> Smart Field Survey </Text>
      </View>
      
 {/* Welcome */}
      <Text style={styles.title}> Welcome </Text>

      <Text style={styles.subtitle}> Zeel Kundariya </Text>

    {/* Student Details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>  Student Details </Text>

        <Text>Name: Zeel Kundariya</Text>
        <Text>Course: Bachelor of Engineering in Computer Science</Text>
        <Text>University: Codinggita X Swaminaryan University</Text>
      </View>
  {/* Today's Survey Count */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Surveys</Text>

        <Text style={styles.count}>0</Text>

        <Text> Surveys completed</Text>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}> New Survey </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Camera </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}> Location </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}> Contacts</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Survey Summary */}
      <Text style={styles.sectionTitle}>Recent Survey </Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}> No Surveys Yet</Text>

        <Text> Your recent surveys will appear here. </Text> 
       </View>

     </ScrollView>
  );
}

const styles = StyleSheet.create({
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