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
    </Stack>
  );
}