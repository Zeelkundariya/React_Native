import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../context/ThemeContext";

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,

        tabBarStyle: {
          height: 65,
          paddingTop: 5,
          paddingBottom: 8,
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      {/* Dashboard */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* New Survey */}
      <Tabs.Screen
        name="survey"
        options={{
          title: "New Survey",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* History */}
      <Tabs.Screen
        name="history"
        options={{
          title: "History",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="time-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}