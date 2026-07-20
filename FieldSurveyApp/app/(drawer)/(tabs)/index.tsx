import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, Colors } from "../../../context/ThemeContext";
import { AnimatedPressable } from "../../../components/AnimatedPressable";

export default function Dashboard() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSmall}>
              SMART FIELD SURVEY
            </Text>

            <Text style={styles.headerTitle}>
              Dashboard
            </Text>
          </View>

          <AnimatedPressable
            style={styles.profileIcon}
            onPress={() => router.push("/profile")}
          >
            <Text style={styles.profileText}>
              ZK
            </Text>
          </AnimatedPressable>
        </View>

        {/* Welcome */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>
            Hello, Zeel 👋
          </Text>

          <Text style={styles.welcomeText}>
            Let&apos;s complete today&apos;s field surveys.
          </Text>
        </View>

        {/* Student Information */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconBox}>
              <Ionicons
                name="person-outline"
                size={22}
                color={colors.primary}
              />
            </View>

            <View>
              <Text style={styles.cardTitle}>
                Student Information
              </Text>

              <Text style={styles.cardSubtitle}>
                Surveyor details
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Name */}
          <View style={styles.infoRow}>
            <Ionicons
              name="person-outline"
              size={18}
              color={colors.textSecondary}
            />

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Name
              </Text>

              <Text style={styles.infoValue}>
                Zeel Kundariya
              </Text>
            </View>
          </View>

          {/* Course */}
          <View style={styles.infoRow}>
            <Ionicons
              name="book-outline"
              size={18}
              color={colors.textSecondary}
            />

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Course
              </Text>

              <Text style={styles.infoValue}>
                Bachelor of Engineering in Computer Science
              </Text>
            </View>
          </View>

          {/* University */}
          <View style={styles.infoRow}>
            <Ionicons
              name="school-outline"
              size={18}
              color={colors.textSecondary}
            />

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                University
              </Text>

              <Text style={styles.infoValue}>
                CodingGita X Swaminarayan University
              </Text>
            </View>
          </View>
        </View>

        {/* Survey Overview */}
        <Text style={styles.sectionTitle}>
          Survey Overview
        </Text>

        <View style={styles.statsContainer}>
          {/* Today's Surveys */}
          <View style={styles.statCard}>
            <View style={styles.statIconGreen}>
              <Ionicons
                name="document-text-outline"
                size={23}
                color={colors.primary}
              />
            </View>

            <Text style={styles.statNumber}>
              3
            </Text>

            <Text style={styles.statLabel}>
              Today&apos;s Surveys
            </Text>
          </View>

          {/* Pending */}
          <View style={styles.statCard}>
            <View style={styles.statIconOrange}>
              <Ionicons
                name="time-outline"
                size={23}
                color="#EA580C"
              />
            </View>

            <Text style={styles.statNumber}>
              0
            </Text>

            <Text style={styles.statLabel}>
              Pending
            </Text>
          </View>
        </View>

        {/* Quick Actions Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.quickSectionTitle}>
            Quick Actions
          </Text>

          <Text style={styles.sectionHint}>
            Choose an action
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.actions}>

          {/* New Survey */}
          <AnimatedPressable
            style={styles.actionCard}
            onPress={() => router.push("/survey")}
          >
            <View style={styles.newSurveyIcon}>
              <Ionicons
                name="add"
                size={26}
                color={colors.primary}
              />
            </View>

            <Text style={styles.actionTitle}>
              New Survey
            </Text>

            <Text style={styles.actionDescription}>
              Create a new field survey
            </Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color={colors.textMuted}
              style={styles.arrow}
            />
          </AnimatedPressable>

          {/* Camera */}
          <AnimatedPressable
            style={styles.actionCard}
            onPress={() => router.push("/camera")}
          >
            <View style={styles.cameraIcon}>
              <Ionicons
                name="camera-outline"
                size={26}
                color="#7C3AED"
              />
            </View>

            <Text style={styles.actionTitle}>
              Camera
            </Text>

            <Text style={styles.actionDescription}>
              Capture survey photos
            </Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color={colors.textMuted}
              style={styles.arrow}
            />
          </AnimatedPressable>

          {/* Location */}
          <AnimatedPressable
            style={styles.actionCard}
            onPress={() => router.push("/location")}
          >
            <View style={styles.locationIcon}>
              <Ionicons
                name="location-outline"
                size={26}
                color="#DC2626"
              />
            </View>

            <Text style={styles.actionTitle}>
              Location
            </Text>

            <Text style={styles.actionDescription}>
              Get current GPS location
            </Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color={colors.textMuted}
              style={styles.arrow}
            />
          </AnimatedPressable>

          {/* Contacts */}
          <AnimatedPressable
            style={styles.actionCard}
            onPress={() => router.push("/contacts")}
          >
            <View style={styles.contactsIcon}>
              <Ionicons
                name="people-outline"
                size={26}
                color="#EA580C"
              />
            </View>

            <Text style={styles.actionTitle}>
              Contacts
            </Text>

            <Text style={styles.actionDescription}>
              Browse saved contacts
            </Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color={colors.textMuted}
              style={styles.arrow}
            />
          </AnimatedPressable>

          {/* Clipboard */}
          <AnimatedPressable
            style={styles.actionCard}
            onPress={() => router.push("/clipboard")}
          >
            <View style={styles.clipboardIcon}>
              <Ionicons
                name="clipboard-outline"
                size={26}
                color="#2563EB"
              />
            </View>

            <Text style={styles.actionTitle}>
              Clipboard
            </Text>

            <Text style={styles.actionDescription}>
              Manage copied survey data
            </Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color={colors.textMuted}
              style={styles.arrow}
            />
          </AnimatedPressable>

        </View>

        {/* Recent Surveys Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.quickSectionTitle}>
            Recent Surveys
          </Text>

          <AnimatedPressable
            onPress={() => router.push("/history")}
          >
            <Text style={styles.viewAll}>
              View All
            </Text>
          </AnimatedPressable>
        </View>

        {/* Empty Survey Card */}
        <View style={styles.emptyCard}>
          <View style={styles.emptyIcon}>
            <Ionicons
              name="clipboard-outline"
              size={32}
              color={colors.primary}
            />
          </View>

          <Text style={styles.emptyTitle}>
            No surveys yet
          </Text>

          <Text style={styles.emptyDescription}>
            Start your first field survey and it will appear here.
          </Text>

          <AnimatedPressable
            style={styles.createButton}
            onPress={() => router.push("/survey")}
          >
            <Ionicons
              name="add"
              size={20}
              color="#FFFFFF"
            />

            <Text style={styles.createButtonText}>
              Create New Survey
            </Text>
          </AnimatedPressable>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: Colors, isDark: boolean) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  // Header
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  headerSmall: {
    color: colors.primaryLight,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 3,
  },

  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },

  profileText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },

  // Welcome
  welcomeSection: {
    marginHorizontal: 20,
    marginTop: 24,
  },

  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },

  welcomeText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 5,
  },

  // Student Card
  card: {
    backgroundColor: colors.card,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: isDark ? 0.3 : 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: isDark ? colors.border : colors.primaryHighlight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.text,
  },

  cardSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 15,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 13,
  },

  infoContent: {
    flex: 1,
    marginLeft: 12,
  },

  infoLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },

  infoValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "500",
    marginTop: 2,
  },

  // Section
  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: colors.text,
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 12,
  },

  sectionHeader: {
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  quickSectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: colors.text,
  },

  sectionHint: {
    fontSize: 12,
    color: colors.textMuted,
  },

  viewAll: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "600",
  },

  // Statistics
  statsContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "space-between",
  },

  statCard: {
    width: "48%",
    backgroundColor: colors.card,
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },

  statIconGreen: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: isDark ? colors.border : colors.primaryHighlight,
    justifyContent: "center",
    alignItems: "center",
  },

  statIconOrange: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: isDark ? colors.border : "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
  },

  statNumber: {
    fontSize: 27,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 10,
  },

  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },

  // Quick Actions
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },

  actionCard: {
    width: "48%",
    backgroundColor: colors.card,
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    position: "relative",
  },

  newSurveyIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: isDark ? colors.border : colors.primaryHighlight,
    justifyContent: "center",
    alignItems: "center",
  },

  cameraIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: isDark ? colors.border : "#F5F3FF",
    justifyContent: "center",
    alignItems: "center",
  },

  locationIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: isDark ? colors.border : "#FEF2F2",
    justifyContent: "center",
    alignItems: "center",
  },

  contactsIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: isDark ? colors.border : "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
  },

  clipboardIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: isDark ? colors.border : "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },

  actionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 12,
  },

  actionDescription: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 4,
    paddingRight: 15,
  },

  arrow: {
    position: "absolute",
    right: 12,
    top: 15,
  },

  // Empty Survey
  emptyCard: {
    backgroundColor: colors.card,
    marginHorizontal: 20,
    padding: 25,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },

  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: isDark ? colors.border : colors.primaryHighlight,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 14,
  },

  emptyDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 19,
  },

  createButton: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 10,
    marginTop: 17,
  },

  createButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 6,
  },
});