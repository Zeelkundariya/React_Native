import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function DrawerLayout() {
  const { colors, isDark } = useTheme();

  return (
    <Drawer
      screenOptions={{
        headerShown: true,

        headerStyle: {
          backgroundColor: colors.primary,
        },

        headerTintColor: colors.white,

        headerTitleStyle: {
          fontWeight: "bold",
        },

        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,

        drawerActiveBackgroundColor: isDark ? colors.primaryHighlight : colors.primaryHighlight,

        drawerStyle: {
          backgroundColor: colors.background,
          width: 280,
        },

        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: "600",
        },
      }}
    >
      {/* Dashboard */}
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Dashboard",
          drawerLabel: "Dashboard",

          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Survey */}
      <Drawer.Screen
        name="drawer-survey"
        options={{
          title: "Survey",
          drawerLabel: "Survey",

          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="document-text-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Camera */}
      <Drawer.Screen
        name="camera"
        options={{
          title: "Camera",
          drawerLabel: "Camera",

          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="camera-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Contacts */}
      <Drawer.Screen
        name="contacts"
        options={{
          title: "Contacts",
          drawerLabel: "Contacts",

          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="people-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Location */}
      <Drawer.Screen
        name="location"
        options={{
          title: "Location",
          drawerLabel: "Location",

          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="location-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Clipboard */}
      <Drawer.Screen
        name="clipboard"
        options={{
          title: "Clipboard",
          drawerLabel: "Clipboard",

          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="clipboard-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Settings */}
      <Drawer.Screen
        name="setting"
        options={{
          title: "Settings",
          drawerLabel: "Settings",

          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="settings-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer>
  );
}