import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, Colors } from "../context/ThemeContext";
import { AnimatedPressable } from "../../components/AnimatedPressable";

import * as Contacts from "expo-contacts";
import * as Clipboard from "expo-clipboard";

export default function ContactsScreen() {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // ----------------------------------
  // Get Contacts
  // ----------------------------------
  const getContacts = async () => {
    try {
      const { status } =
        await Contacts.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Contacts permission is required to access your contacts."
        );

        setLoading(false);
        setRefreshing(false);
        return;
      }

      const { data } =
        await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.PhoneNumbers,
          ],
        });

      setContacts(data);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "Could not load contacts."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ----------------------------------
  // Load Contacts
  // ----------------------------------
  useEffect(() => {
    getContacts();
  }, []);

  // ----------------------------------
  // Pull to Refresh
  // ----------------------------------
  const onRefresh = () => {
    setRefreshing(true);
    getContacts();
  };

  // ----------------------------------
  // Search Contacts
  // ----------------------------------
  const filteredContacts = contacts.filter(
    (contact) =>
      (contact.name || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // ----------------------------------
  // Copy Phone Number
  // ----------------------------------
  const copyNumber = async (
    number: string
  ) => {
    try {
      await Clipboard.setStringAsync(number);

      Alert.alert(
        "Copied",
        "Contact number copied to clipboard."
      );
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "Could not copy contact number."
      );
    }
  };

  // ----------------------------------
  // Render Contact
  // ----------------------------------
  const renderContact = ({
    item,
  }: {
    item: Contacts.Contact;
  }) => {
    const name =
      item.name || "Unknown Contact";

    const phoneNumber =
      item.phoneNumbers &&
      item.phoneNumbers.length > 0
        ? item.phoneNumbers[0].number
        : null;

    return (
      <View style={styles.contactCard}>

        {/* Avatar */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {name.charAt(0).toUpperCase()}
          </Text>
        </View>

        {/* Contact Information */}
        <View style={styles.contactInfo}>
          <Text
            style={styles.contactName}
            numberOfLines={1}
          >
            {name}
          </Text>

          <View style={styles.phoneRow}>
            <Ionicons
              name="call-outline"
              size={14}
              color={colors.textSecondary}
            />

            <Text style={styles.phoneNumber}>
              {phoneNumber || "No phone number"}
            </Text>
          </View>
        </View>

        {/* Copy Button */}
        {phoneNumber && (
          <AnimatedPressable
            style={styles.copyButton}
            onPress={() =>
              copyNumber(phoneNumber)
            }
          >
            <Ionicons
              name="copy-outline"
              size={18}
              color={colors.primaryLight}
            />
          </AnimatedPressable>
        )}
      </View>
    );
  };

  // ----------------------------------
  // Loading Screen
  // ----------------------------------
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color={colors.primaryLight}
          />

          <Text style={styles.loadingText}>
            Loading Contacts...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ----------------------------------
  // Main Contacts Screen
  // ----------------------------------
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
              Contacts
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="people-outline"
              size={26}
              color={colors.primary}
            />
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>

          {/* Introduction */}
          <Text style={styles.title}>
            Contact Directory
          </Text>

          <Text style={styles.subtitle}>
            Search and select contacts for your field survey.
          </Text>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={20}
              color={colors.textMuted}
            />

            <TextInput
              style={styles.searchInput}
              placeholder="Search contacts..."
              
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

          {/* Contact Summary */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <Ionicons
                name="people"
                size={21}
                color={colors.primaryLight}
              />
            </View>

            <View style={styles.summaryInfo}>
              <Text style={styles.summaryLabel}>
                Total Contacts
              </Text>

              <Text style={styles.summaryCount}>
                {filteredContacts.length}
              </Text>
            </View>

            <AnimatedPressable
              style={styles.refreshButton}
              onPress={onRefresh}
            >
              <Ionicons
                name="refresh"
                size={20}
                color={colors.primaryLight}
              />
            </AnimatedPressable>
          </View>

          {/* Section Header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Contacts
            </Text>

            {search.length > 0 && (
              <Text style={styles.resultText}>
                Search results
              </Text>
            )}
          </View>

          {/* Contact List */}
          <FlatList
            data={filteredContacts}
            keyExtractor={(_, index) =>
              index.toString()
            }
            renderItem={renderContact}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              styles.listContent
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[colors.primaryLight]}
                
              />
            }
            ListEmptyComponent={
              <View style={styles.empty}>
                <View style={styles.emptyIcon}>
                  <Ionicons
                    name="people-outline"
                    size={35}
                    color={colors.primaryLight}
                  />
                </View>

                <Text style={styles.emptyTitle}>
                  No Contacts Found
                </Text>

                <Text style={styles.emptyText}>
                  {search
                    ? "Try searching with a different contact name."
                    : "No contacts are available on your device."}
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
  // ----------------------------------
  // Main
  // ----------------------------------
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 22,
  },

  // ----------------------------------
  // Header
  // ----------------------------------
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

  // ----------------------------------
  // Introduction
  // ----------------------------------
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

  // ----------------------------------
  // Search
  // ----------------------------------
  searchContainer: {
    height: 50,

    backgroundColor: colors.card,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: 12,

    paddingHorizontal: 14,

    flexDirection: "row",
    alignItems: "center",
  },

  searchInput: {
    flex: 1,
    height: "100%",

    fontSize: 14,
    color: colors.text,

    marginLeft: 9,
  },

  // ----------------------------------
  // Summary
  // ----------------------------------
  summaryCard: {
    backgroundColor: colors.primaryHighlight,

    borderWidth: 1,
    borderColor: "#D1FAE5",

    borderRadius: 14,

    padding: 14,
    marginTop: 15,

    flexDirection: "row",
    alignItems: "center",
  },

  summaryIcon: {
    width: 44,
    height: 44,

    borderRadius: 12,

    backgroundColor: "#D1FAE5",

    justifyContent: "center",
    alignItems: "center",
  },

  summaryInfo: {
    flex: 1,
    marginLeft: 12,
  },

  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  summaryCount: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 2,
  },

  refreshButton: {
    width: 40,
    height: 40,

    borderRadius: 10,

    backgroundColor: colors.card,

    justifyContent: "center",
    alignItems: "center",
  },

  // ----------------------------------
  // Section
  // ----------------------------------
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginTop: 22,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },

  resultText: {
    fontSize: 12,
    color: colors.primaryLight,
    fontWeight: "600",
  },

  // ----------------------------------
  // Contact List
  // ----------------------------------
  listContent: {
    paddingBottom: 30,
  },

  contactCard: {
    backgroundColor: colors.card,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: 14,

    padding: 12,
    marginBottom: 10,

    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: colors.primaryLight,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  avatarText: {
    color: colors.card,
    fontSize: 18,
    fontWeight: "bold",
  },

  contactInfo: {
    flex: 1,
  },

  contactName: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text,
  },

  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  phoneNumber: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 5,
  },

  // ----------------------------------
  // Copy Button
  // ----------------------------------
  copyButton: {
    width: 40,
    height: 40,

    borderRadius: 10,

    backgroundColor: colors.primaryHighlight,

    justifyContent: "center",
    alignItems: "center",

    marginLeft: 8,
  },

  // ----------------------------------
  // Empty
  // ----------------------------------
  empty: {
    alignItems: "center",
    justifyContent: "center",

    paddingVertical: 50,
  },

  emptyIcon: {
    width: 65,
    height: 65,

    borderRadius: 33,

    backgroundColor: colors.primaryHighlight,

    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 14,
  },

  emptyText: {
    fontSize: 13,
    color: colors.textSecondary,

    textAlign: "center",

    marginTop: 6,
    paddingHorizontal: 30,

    lineHeight: 19,
  },

  // ----------------------------------
  // Loading
  // ----------------------------------
  center: {
    flex: 1,

    backgroundColor: colors.background,

    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 12,
  },
});