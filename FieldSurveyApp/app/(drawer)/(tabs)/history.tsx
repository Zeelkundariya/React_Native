import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, Colors } from "../../context/ThemeContext";
import { AnimatedPressable } from "../../../components/AnimatedPressable";

type Survey = {
  id: string;
  siteName: string;
  clientName: string;
  priority: string;
  date: string;
};

export default function History() {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  // Sample Survey Data
  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: "SURVEY-001",
      siteName: "ABC Construction Site",
      clientName: "ABC Company",
      priority: "High",
      date: "18/07/2026",
    },
    {
      id: "SURVEY-002",
      siteName: "City Mall",
      clientName: "XYZ Company",
      priority: "Medium",
      date: "17/07/2026",
    },
    {
      id: "SURVEY-003",
      siteName: "School Building",
      clientName: "Education Trust",
      priority: "Low",
      date: "16/07/2026",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // View Survey Details
  const viewDetails = (survey: Survey) => {
    Alert.alert(
      "Survey Details",
      `Survey ID: ${survey.id}
Site: ${survey.siteName}
Client: ${survey.clientName}
Priority: ${survey.priority}
Date: ${survey.date}`
    );
  };

  // Delete Survey
  const deleteSurvey = (id: string) => {
    Alert.alert(
      "Delete Survey",
      "Are you sure you want to delete this survey?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setSurveys((oldSurveys) =>
              oldSurveys.filter(
                (survey) => survey.id !== id
              )
            );
          },
        },
      ]
    );
  };

  // Search and Filter
  const filteredSurveys = surveys.filter((survey) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      survey.siteName
        .toLowerCase()
        .includes(searchText) ||
      survey.clientName
        .toLowerCase()
        .includes(searchText) ||
      survey.id
        .toLowerCase()
        .includes(searchText);

    const matchesFilter =
      filter === "All" ||
      survey.priority === filter;

    return matchesSearch && matchesFilter;
  });

  // Priority Style
  const getPriorityStyle = (priority: string) => {
    if (priority === "High") {
      return styles.highPriority;
    }

    if (priority === "Medium") {
      return styles.mediumPriority;
    }

    return styles.lowPriority;
  };

  const getPriorityTextStyle = (
    priority: string
  ) => {
    if (priority === "High") {
      return styles.highPriorityText;
    }

    if (priority === "Medium") {
      return styles.mediumPriorityText;
    }

    return styles.lowPriorityText;
  };

  // Display Survey
  const renderSurvey = ({
    item,
  }: {
    item: Survey;
  }) => {
    return (
      <View style={styles.card}>

        {/* Card Top */}
        <View style={styles.cardTop}>
          <View style={styles.surveyIcon}>
            <Ionicons
              name="document-text-outline"
              size={23}
              color={colors.primaryLight}
            />
          </View>

          <View style={styles.cardTitleContent}>
            <Text style={styles.siteName}>
              {item.siteName}
            </Text>

            <Text style={styles.surveyId}>
              {item.id}
            </Text>
          </View>

          <View
            style={[
              styles.priorityBadge,
              getPriorityStyle(item.priority),
            ]}
          >
            <Text
              style={[
                styles.priorityBadgeText,
                getPriorityTextStyle(
                  item.priority
                ),
              ]}
            >
              {item.priority}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Client */}
        <View style={styles.infoRow}>
          <Ionicons
            name="business-outline"
            size={18}
            color={colors.textSecondary}
          />

          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>
              Client
            </Text>

            <Text style={styles.infoValue}>
              {item.clientName}
            </Text>
          </View>
        </View>

        {/* Date */}
        <View style={styles.infoRow}>
          <Ionicons
            name="calendar-outline"
            size={18}
            color={colors.textSecondary}
          />

          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>
              Survey Date
            </Text>

            <Text style={styles.infoValue}>
              {item.date}
            </Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.actionButtons}>
          <AnimatedPressable
            style={styles.viewButton}
            onPress={() =>
              viewDetails(item)
            }
          >
            <Ionicons
              name="eye-outline"
              size={18}
              color={colors.primary}
            />

            <Text style={styles.viewButtonText}>
              View Details
            </Text>
          </AnimatedPressable>

          <AnimatedPressable
            style={styles.deleteButton}
            onPress={() =>
              deleteSurvey(item.id)
            }
          >
            <Ionicons
              name="trash-outline"
              size={18}
              color="#DC2626"
            />

            <Text style={styles.deleteButtonText}>
              Delete
            </Text>
          </AnimatedPressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSmall}>
              SMART FIELD SURVEY
            </Text>

            <Text style={styles.headerTitle}>
              Survey History
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="time-outline"
              size={27}
              color={colors.primary}
            />
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>

          {/* Title */}
          <Text style={styles.title}>
            Your Surveys
          </Text>

          <Text style={styles.subtitle}>
            Search and manage your previous field surveys.
          </Text>

          {/* Search */}
          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={20}
              color={colors.textMuted}
            />

            <TextInput
              style={styles.input}
              placeholder="Search surveys..."
              placeholderTextColor={colors.textMuted}
              value={search}
              onChangeText={setSearch}
            />

            {search.length > 0 && (
              <AnimatedPressable
                onPress={() => setSearch("")}
              >
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={colors.textMuted}
                />
              </AnimatedPressable>
            )}
          </View>

          {/* Filter Title */}
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>
              Filter by Priority
            </Text>

            <Text style={styles.resultText}>
              {filteredSurveys.length} results
            </Text>
          </View>

          {/* Priority Filter */}
          <View style={styles.filters}>
            {[
              "All",
              "Low",
              "Medium",
              "High",
            ].map((item) => (
              <AnimatedPressable
                key={item}
                style={[
                  styles.filterButton,
                  filter === item &&
                    styles.selectedFilter,
                ]}
                onPress={() =>
                  setFilter(item)
                }
              >
                <Text
                  style={[
                    styles.filterText,
                    filter === item &&
                      styles.selectedText,
                  ]}
                >
                  {item}
                </Text>
              </AnimatedPressable>
            ))}
          </View>

          {/* Survey Counter */}
          <View style={styles.countCard}>
            <View style={styles.countIcon}>
              <Ionicons
                name="documents-outline"
                size={21}
                color={colors.primaryLight}
              />
            </View>

            <View>
              <Text style={styles.countNumber}>
                {filteredSurveys.length}
              </Text>

              <Text style={styles.countLabel}>
                Surveys Found
              </Text>
            </View>
          </View>

          {/* Survey List */}
          <FlatList
            data={filteredSurveys}
            keyExtractor={(item) =>
              item.id
            }
            renderItem={renderSurvey}
            showsVerticalScrollIndicator={
              false
            }
            contentContainerStyle={
              styles.listContent
            }
            ListEmptyComponent={
              <View style={styles.empty}>
                <View
                  style={styles.emptyIcon}
                >
                  <Ionicons
                    name="search-outline"
                    size={30}
                    color={colors.primaryLight}
                  />
                </View>

                <Text
                  style={styles.emptyTitle}
                >
                  No Surveys Found
                </Text>

                <Text
                  style={
                    styles.emptyDescription
                  }
                >
                  Try changing your search or priority filter.
                </Text>
              </View>
            }
          />

        </View>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: Colors, isDark: boolean) => StyleSheet.create({
  // Main
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  header: {
    backgroundColor: colors.primary,

    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  headerSmall: {
    color: "#A7F3D0",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
  },

  headerTitle: {
    color: colors.card,
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 3,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,

    backgroundColor: colors.card,

    justifyContent: "center",
    alignItems: "center",
  },

  // Content
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 22,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
  },

  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 5,
    marginBottom: 18,
  },

  // Search
  searchContainer: {
    height: 50,

    backgroundColor: colors.card,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: 12,

    paddingHorizontal: 13,

    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,

    fontSize: 14,
    color: colors.text,

    marginLeft: 9,
  },

  // Filter Header
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginTop: 18,
    marginBottom: 10,
  },

  filterTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },

  resultText: {
    fontSize: 11,
    color: colors.textMuted,
  },

  // Filters
  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  filterButton: {
    width: "23%",

    backgroundColor: colors.card,

    borderWidth: 1,
    borderColor: colors.border,

    paddingVertical: 9,

    borderRadius: 9,

    alignItems: "center",
  },

  selectedFilter: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primaryLight,
  },

  filterText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },

  selectedText: {
    color: colors.card,
  },

  // Counter
  countCard: {
    backgroundColor: colors.primaryHighlight,

    borderWidth: 1,
    borderColor: "#D1FAE5",

    borderRadius: 13,

    padding: 12,

    marginTop: 16,
    marginBottom: 15,

    flexDirection: "row",
    alignItems: "center",
  },

  countIcon: {
    width: 40,
    height: 40,

    borderRadius: 10,

    backgroundColor: "#D1FAE5",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 11,
  },

  countNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },

  countLabel: {
    fontSize: 11,
    color: colors.primaryLight,
    marginTop: 1,
  },

  // List
  listContent: {
    paddingBottom: 40,
  },

  // Survey Card
  card: {
    backgroundColor: colors.card,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: 16,

    padding: 16,
    marginBottom: 14,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  surveyIcon: {
    width: 44,
    height: 44,

    borderRadius: 12,

    backgroundColor: colors.primaryHighlight,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 11,
  },

  cardTitleContent: {
    flex: 1,
  },

  siteName: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text,
  },

  surveyId: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 3,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 14,
  },

  // Priority
  priorityBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
  },

  priorityBadgeText: {
    fontSize: 10,
    fontWeight: "bold",
  },

  highPriority: {
    backgroundColor: "#FEF2F2",
  },

  highPriorityText: {
    color: "#DC2626",
  },

  mediumPriority: {
    backgroundColor: "#FFFBEB",
  },

  mediumPriorityText: {
    color: "#D97706",
  },

  lowPriority: {
    backgroundColor: colors.primaryHighlight,
  },

  lowPriorityText: {
    color: colors.primaryLight,
  },

  // Info
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 11,
  },

  infoContent: {
    marginLeft: 10,
  },

  infoLabel: {
    fontSize: 10,
    color: colors.textMuted,
  },

  infoValue: {
    fontSize: 13,
    color: "#334155",
    fontWeight: "500",
    marginTop: 2,
  },

  // Actions
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },

  viewButton: {
    width: "64%",

    backgroundColor: colors.primaryHighlight,

    borderWidth: 1,
    borderColor: "#D1FAE5",

    borderRadius: 10,

    paddingVertical: 10,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  viewButtonText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 6,
  },

  deleteButton: {
    width: "33%",

    backgroundColor: "#FEF2F2",

    borderWidth: 1,
    borderColor: "#FECACA",

    borderRadius: 10,

    paddingVertical: 10,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  deleteButtonText: {
    color: "#DC2626",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
  },

  // Empty
  empty: {
    backgroundColor: colors.card,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: 16,

    padding: 30,

    alignItems: "center",

    marginTop: 10,
  },

  emptyIcon: {
    width: 60,
    height: 60,

    borderRadius: 30,

    backgroundColor: colors.primaryHighlight,

    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 13,
  },

  emptyDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 5,
  },
});