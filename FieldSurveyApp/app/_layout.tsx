import "react-native-gesture-handler";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(drawer)" />

      <Stack.Screen
        name="preview"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}