import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, Colors } from "../../context/ThemeContext";
import { AnimatedPressable } from "../../../components/AnimatedPressable";

export default function ProfileScreen() {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header Background */}
        <View style={styles.headerBackground}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400" }}
              style={styles.avatar}
            />
            <AnimatedPressable style={styles.editAvatarButton} onPress={() => Alert.alert("Edit Avatar", "Choose a new photo from your gallery.")}>
              <Ionicons name="camera" size={16} color={colors.card} />
            </AnimatedPressable>
          </View>
          
          <Text style={styles.name}>Zeel Kundariya</Text>
          <Text style={styles.role}>Field Surveyor</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Surveys</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>100%</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        {/* Personal Details */}
        <Text style={styles.sectionTitle}>Personal Details</Text>
        <View style={styles.card}>
          <View style={styles.detailRow}>
            <View style={styles.iconBox}>
              <Ionicons name="mail-outline" size={20} color={colors.primaryLight} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Email</Text>
              <Text style={styles.detailValue}>zeelkundariya13@gmail.com</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.iconBox}>
              <Ionicons name="call-outline" size={20} color={colors.primaryLight} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Phone</Text>
              <Text style={styles.detailValue}>+91 9876543210</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.iconBox}>
              <Ionicons name="location-outline" size={20} color={colors.primaryLight} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>Gujarat, India</Text>
            </View>
          </View>
        </View>

        {/* Academic Details */}
        <Text style={styles.sectionTitle}>Academic Information</Text>
        <View style={styles.card}>
          <View style={styles.detailRow}>
            <View style={styles.iconBox}>
              <Ionicons name="book-outline" size={20} color={colors.primaryLight} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Course</Text>
              <Text style={styles.detailValue}>B.E. Computer Science</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <View style={styles.iconBox}>
              <Ionicons name="school-outline" size={20} color={colors.primaryLight} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>University</Text>
              <Text style={styles.detailValue}>CodingGita X Swaminarayan University</Text>
            </View>
          </View>
        </View>
        
        {/* Edit Button */}
        <AnimatedPressable style={styles.editButton} onPress={() => Alert.alert("Edit Profile", "Profile editing feature coming soon!")}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </AnimatedPressable>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: Colors, isDark: boolean) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingBottom: 20,
  },
  headerBackground: {
    backgroundColor: colors.primary,
    height: 140,
    alignItems: "center",
    paddingTop: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.card,
  },
  profileCard: {
    backgroundColor: colors.card,
    marginHorizontal: 20,
    marginTop: -60,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: colors.card,
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.primaryLight,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.card,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  role: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#F1F5F9",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginLeft: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.card,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.primaryHighlight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: "500",
    color: "#334155",
  },
  editButton: {
    backgroundColor: colors.primaryLight,
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  editButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: "bold",
  },
});