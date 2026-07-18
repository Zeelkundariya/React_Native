import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="camera"
        options={{
          title: "Camera",
        }}
      />

      <Stack.Screen
        name="location"
        options={{
          title: "Location",
        }}
      />

      <Stack.Screen
        name="contacts"
        options={{
          title: "Contacts",
        }}
      />

      <Stack.Screen
        name="clipboard"
        options={{
          title: "Clipboard",
        }}
      />
    </Stack>
  );
}